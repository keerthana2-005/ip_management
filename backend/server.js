require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
// for handling the upload funtion from uploadsection
const app = express();
const PORT = 5000;




//handling the upload request from the uploadsection
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });


app.use(cors());
app.use(bodyParser.json());
// PostgreSQL connection setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("✅ Connected to PostgreSQL Database");
    }
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("❌ Nodemailer Error:", error);
    } else {
        console.log("✅ Nodemailer is ready to send emails");
    }
});

// Generate a random 6-digit verification code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup route with email/username check
app.post("/send-verification", async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email or username already exists in the database
        const emailExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const usernameExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (emailExists.rowCount > 0) {
            return res.status(400).json({ message: "Email already exists. Please use another email." });
        }

        if (usernameExists.rowCount > 0) {
            return res.status(400).json({ message: "Username already exists. Please choose another username." });
        }

        // Generate verification code
        const code = generateCode();

        // Insert user into the database (unverified)
        await pool.query(
            "INSERT INTO users (email, username, password, verification_token, is_verified) VALUES ($1, $2, $3, $4, FALSE)",
            [email, username, password, code]
        );

        // Send verification code email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Account",
            text: `Your verification code is: ${code}`, // Fixed string interpolation
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: "Verification code sent successfully!" });
    } catch (error) {
        console.error("❌ Error during signup:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Route to verify the code
app.post("/verify-code", async (req, res) => {
    const { email, code } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND verification_token = $2",
            [email, code]
        );

        if (result.rowCount > 0) {
            await pool.query(
                "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE email = $1",
                [email]
            );
            res.json({ message: "Code verified successfully!" });
        } else {
            res.status(400).json({ message: "Invalid code" });
        }
    } catch (error) {
        console.error("❌ Error verifying code:", error);
        res.status(500).json({ message: "Error verifying code" });
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        //  Get user data and metaadress in one query
        const userResult = await pool.query(
            `SELECT u.email, u.username, p.metaadress
             FROM users u
             LEFT JOIN profile p ON u.username = p.username
             WHERE (u.email = $1 OR u.username = $2) AND u.password = $3 AND u.is_verified = TRUE`,
            [emailOrUsername, emailOrUsername, password]
        );

        if (userResult.rowCount > 0) {
            const user = userResult.rows[0];
            res.json({
                message: "Login successful!",
                user: {
                    email: user.email,
                    username: user.username,
                    metaadress: user.metaadress, // Include metaadress
                },
            });
        } else {
            res.status(401).json({ message: "Invalid credentials or unverified account" });
        }
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to handle Metamask connection and store data
app.post("/api/store-profile", async (req, res) => {
  const { username, metaadress } = req.body;

  if (!username || !metaadress) {
      return res.status(400).json({ error: "Username and Metamask address are required." });
  }

  const client = await pool.connect();

  try {
      // 1. Check if the username exists in the users table.
      const userExistsResult = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      if (userExistsResult.rowCount === 0) {
          return res.status(400).json({ error: "Username not found in users table." });
      }

      // 2. Check if the username already exists in the profile table.
      const profileExistsResult = await client.query('SELECT * FROM profile WHERE username = $1', [username]);

      if (profileExistsResult.rowCount > 0) {
          // 3. Update the existing profile.
          const updateResult = await client.query('UPDATE profile SET metaadress = $1 WHERE username = $2', [metaadress, username]);
           if (updateResult.rowCount === 0) {
              return res.status(400).json({ error: "Failed to update profile. Username not found." });
           }
          return res.status(200).json({ message: "Metamask address updated successfully." });
      } else {
          // 4. Insert a new profile.
          try{
              await client.query('INSERT INTO profile (username, metaadress) VALUES ($1, $2)', [username, metaadress]);
          }catch(insertError){
               console.error("❌ Error inserting profile data:", insertError);
               return res.status(500).json({ error: "Failed to insert profile data.", details: insertError.message });
          }

          return res.status(200).json({ message: "Metamask address stored successfully." });
      }
  } catch (error) {
      console.error("❌ Error storing profile data:", error);
      res.status(500).json({ error: "Failed to store profile data.", details: error.message });
  } finally {
      client.release();
  }
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const readableStreamForFile = fs.createReadStream(req.file.path);

//         // Set a default name for the uploaded file
//         const defaultFileName = "my-default-ipfs-file"; // <--- Here's your default name

//         const options = {
//             pinataMetadata: {
//                 name: defaultFileName, // <--- Using the default name
//             },
//         };

//         const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

//         fs.unlinkSync(req.file.path);

//         res.json({
//             message: 'File uploaded to IPFS successfully',
//             ipfsHash: result.IpfsHash,
//             pinSize: result.PinSize,
//             timestamp: result.Timestamp,
//         });
//     } catch (error) {
//         console.error('❌ Error uploading file to Pinata:', error);
//         res.status(500).json({ error: 'Failed to upload file' });
//     }
// });

//uploading files to pinata 
// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const readableStreamForFile = fs.createReadStream(req.file.path);

//         const options = {
//             pinataMetadata: {
//                 name: req.file.originalname, // Or a default name like "my-default-ipfs-file"
//             },
//         };

//         const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

//         // --- CONSOLE.LOG THE HASH HERE ---
//         console.log('✅ File uploaded to IPFS. Hash:', result.IpfsHash);
//         // ----------------------------------

//         fs.unlinkSync(req.file.path); // Delete the temporary file

//         // --- ONLY SEND A GENERIC SUCCESS MESSAGE TO THE FRONTEND ---
//         res.json({
//             message: 'File upload process initiated successfully on the server.',
//             // No IPFS hash or other Pinata-specific details sent here
//         });

//     } catch (error) {
//         console.error('❌ Error uploading file to Pinata:', error);
//         res.status(500).json({ error: `Failed to initiate file upload: ${error.message}` });
//     }
// });
  

app.post('/upload-to-ipfs', upload.single('actualData'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Extract metadata from req.body (Multer makes these available from the FormData)
        const { title, workType, description } = req.body;

        // Basic validation for metadata fields
        if (!title || !workType || !description) {
            // Clean up the temporary file if metadata is missing
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            // Changed the error message as per your request
            return res.status(400).json({ error: 'Fields cannot be empty.' });
        }

        console.log("Received upload request:");
        console.log("File:", req.file.originalname);
        console.log("Metadata:", { title, workType, description });

        let artworkCID;
        let metadataCID;

        // 1. Upload Actual Data File to IPFS
        try {
            const readableStreamForFile = fs.createReadStream(req.file.path);
            const options = {
                pinataMetadata: {
                    name: req.file.originalname, // Use original filename for Pinata dashboard
                },
            };
            console.log("Pinning actual data to IPFS...");
            const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
            artworkCID = result.IpfsHash;
            console.log("Artwork pinned! CID:", artworkCID);
        } catch (ipfsError) {
            console.error("Error pinning actual data to IPFS:", ipfsError);
            return res.status(500).json({ error: 'Failed to pin actual data to IPFS.' });
        } finally {
            // Always clean up the temporary file created by multer after processing
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        // 2. Create Metadata JSON
        const metadata = {
            name: title,
            work_type: workType,
            description: description,
            // Point the 'image' field to the IPFS CID of the actual data
            // This is the standard for NFTs and general content linking
            image: `ipfs://${artworkCID}`,
            // You can add more attributes here if needed for richer metadata
            // attributes: [
            //     { trait_type: "Work Type", value: workType }
            // ]
        };

        // 3. Upload Metadata JSON to IPFS
        try {
            console.log("Pinning metadata JSON to IPFS...");
            const result = await pinata.pinJSONToIPFS(metadata, {
                pinataMetadata: {
                    name: `Metadata for ${title}`, // Descriptive name for Pinata dashboard
                },
            });
            metadataCID = result.IpfsHash;
            console.log("Metadata pinned! CID:", metadataCID);
        } catch (ipfsError) {
            console.error("Error pinning metadata JSON to IPFS:", ipfsError);
            return res.status(500).json({ error: 'Failed to pin metadata JSON to IPFS.' });
        }

        // 4. Respond to frontend with the CIDs and original metadata, plus gateway URL
        // The frontend (UploadSection.js) expects these fields to display the content.
        res.status(200).json({
            message: 'Data and metadata uploaded to IPFS successfully!',
            artworkCID: artworkCID,
            metadataCID: metadataCID,
            title: title,       // Send back original metadata for immediate display
            workType: workType,
            description: description,
            pinataGateway: process.env.PINATA_DEDICATED_GATEWAY // Send gateway URL from .env
        });

    } catch (error) {
        console.error("Server error during upload process:", error);
        res.status(500).json({ error: 'An unexpected error occurred on the server.' });
    }
});




app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
