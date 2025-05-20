require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

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

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
