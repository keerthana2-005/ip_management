import React from 'react';

const UserGuide = () => {
  return (
   <div style={{
      backgroundColor: '#1a1a1a', // Dark background
      color: '#ffffff',           // White text
      fontFamily: 'Arial, sans-serif',
      padding: '40px',             // Keep existing horizontal padding
      paddingTop: '280px', // Add padding to account for Navbar height + desired top padding
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5em', color: '#00ccff' }}>
        Welcome to Our Decentralized Platform!
      </h1>
       
       <h1 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5em', color: '#00ccff' }}>
        Welcome to Our Decentralized Platform!
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.1em', marginBottom: '40px', lineHeight: '1.6' }}>
        Unlock the power of secure, transparent, and decentralized content sharing.
        Follow these simple steps to get started and showcase your work.
      </p>

      {/* --- Account Setup --- */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <span style={{ color: '#00ccff' }}>1.</span> Account Setup
        </h2>

        <div style={{ marginBottom: '30px', paddingLeft: '20px' }}>
          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#f0f0f0' }}>
            <span style={{ color: '#ffea00' }}>a.</span> Sign Up
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            To begin, you'll need to <strong style={{ color: '#00ccff' }}>create an account</strong>.
            Provide your **email**, a unique **username**, and a strong **password**.
            We'll send a verification code to your email to ensure your account's security.
          </p>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#f0f0f0' }}>
            <span style={{ color: '#ffea00' }}>b.</span> Verify Your Email
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            Check your inbox for a verification email from us. Enter the
            <strong style={{ color: '#00ccff' }}> 6-digit code</strong> provided in the email
            into the verification field on our platform. This step is crucial for activating your account.
          </p>
        </div>
      </div>

      {/* --- Connecting Metamask --- */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <span style={{ color: '#00ccff' }}>2.</span> Connect Your Wallet (Metamask)
        </h2>
        <p style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
          Our platform leverages blockchain technology. To fully interact and upload your work,
          you'll need to <strong style={{ color: '#00ccff' }}>connect your Metamask wallet</strong>.
          Make sure you have Metamask installed in your browser. After logging in,
          navigate to your profile or a dedicated "Connect Wallet" section and follow the prompts
          to link your Metamask address to your account. This connects your digital identity to your creations.
        </p>
      </div>

      {/* --- Uploading Your Work --- */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <span style={{ color: '#00ccff' }}>3.</span> Upload Your Decentralized Work
        </h2>
        <p style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
          Ready to share your creations? Go to the "Upload" section.
          You'll be able to upload your digital asset (e.g., image, document, audio, video)
          along with some important metadata:
        </p>
        <ul style={{ listStyleType: 'disc', marginLeft: '40px', marginTop: '15px', lineHeight: '1.8' }}>
          <li>
            <strong style={{ color: '#ffea00' }}>Title:</strong> A clear and descriptive name for your work.
          </li>
          <li>
            <strong style={{ color: '#ffea00' }}>Work Type:</strong> Categorize your content (e.g., Art, Document, Music, Video).
          </li>
          <li>
            <strong style={{ color: '#ffea00' }}>Description:</strong> Provide details about your work, its purpose, or any relevant information.
          </li>
        </ul>
        <p style={{ lineHeight: '1.6', paddingLeft: '20px', marginTop: '15px' }}>
          Once uploaded, your content and its metadata will be securely stored on <strong style={{ color: '#00ccff' }}>IPFS (InterPlanetary File System)</strong>,
          and a reference to its metadata will be recorded on the <strong style={{ color: '#00ccff' }}>blockchain</strong>,
          ensuring immutability and transparency.
        </p>
      </div>

      {/* --- Exploring Content --- */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          <span style={{ color: '#00ccff' }}>4.</span> Explore and Discover
        </h2>
        <p style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
          Browse through a gallery of works uploaded by other users.
          Thanks to the blockchain, you can verify the origin and integrity of each piece.
          Discover new artists, engaging documents, and unique digital assets.
        </p>
      </div>

      <p style={{ textAlign: 'center', fontSize: '1.1em', marginTop: '50px', color: '#00ccff' }}>
        We're excited to have you as part of our decentralized community!
      </p>
    </div>
  );
};

export default UserGuide;