import React from 'react';

const AboutContent = () => {
  // Define styles for the About page content
  const contentStyle = {
    backgroundColor: '#1a1a1a', // Dark background
    color: '#ffffff',           // White text
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    paddingTop: '300px', // Adjusted for Navbar height (64px) + comfortable spacing
    minHeight: '100vh',
    boxSizing: 'border-box',
    maxWidth: '800px', // Limit content width for better readability
    margin: '0 auto',  // Center the content block
    lineHeight: '1.6',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '50px',
    fontSize: '2.8em',
    color: '#00ccff',
    borderBottom: '2px solid #333',
    paddingBottom: '15px',
  };

  const subHeadingStyle = {
    fontSize: '1.8em',
    marginBottom: '20px',
    color: '#f0f0f0',
    borderBottom: '1px solid #333',
    paddingBottom: '10px',
    marginTop: '40px',
  };

  const paragraphStyle = {
    marginBottom: '20px',
  };

  const highlightStyle = {
    color: '#ffea00',
    fontWeight: 'bold',
  };

  return (
    <div style={contentStyle}>
      <h1 style={headingStyle}>About BlockIP</h1>

      <p style={paragraphStyle}>
        Welcome to <strong style={{ color: '#00ccff' }}>BlockIP</strong>, your decentralized platform
        for secure and transparent intellectual property management and content sharing.
        In an era where digital ownership is constantly challenged, BlockIP stands as a
        beacon of innovation, leveraging the power of blockchain and decentralized
        technologies to empower creators and users alike.
      </p>

      <h2 style={subHeadingStyle}>Our Vision</h2>
      <p style={paragraphStyle}>
        Our vision is to revolutionize the way digital content is created, shared,
        and owned. We believe in a future where creators have immutable proof of their
        work, and users can consume content with confidence in its authenticity and origin.
        BlockIP aims to eliminate intermediaries, reduce censorship risks, and foster a
        truly open and fair digital ecosystem.
      </p>

      <h2 style={subHeadingStyle}>What We Offer</h2>
      <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '30px' }}>
        <li style={paragraphStyle}>
          <strong style={highlightStyle}>Decentralized Content Storage:</strong> Your valuable digital assets
          are stored on <span style={{ color: '#00ccff' }}>IPFS (InterPlanetary File System)</span>, ensuring
          they are censorship-resistant and always accessible.
        </li>
        <li style={paragraphStyle}>
          <strong style={highlightStyle}>Blockchain-Based Ownership:</strong> Every piece of content uploaded
          receives a unique hash recorded on a blockchain, providing an immutable and verifiable
          proof of creation and ownership timestamp.
        </li>
        <li style={paragraphStyle}>
          <strong style={highlightStyle}>Transparent & Secure:</strong> All transactions and ownership records
          are transparently viewable on the blockchain, secured by cryptographic principles.
        </li>
        <li style={paragraphStyle}>
          <strong style={highlightStyle}>Empowering Creators:</strong> We provide creators with the tools to
          protect their intellectual property in a digital world, giving them peace of mind
          and control over their work.
        </li>
        <li style={paragraphStyle}>
          <strong style={highlightStyle}>Trustworthy Consumption:</strong> Users can verify the authenticity
          and origin of content, building a more trustworthy digital content landscape.
        </li>
      </ul>

      <h2 style={subHeadingStyle}>Our Technology Stack</h2>
      <p style={paragraphStyle}>
        BlockIP is built on a robust and modern technology stack designed for performance,
        security, and scalability:
      </p>
      <ul style={{ listStyleType: 'circle', marginLeft: '40px', marginBottom: '30px' }}>
        <li><strong style={highlightStyle}>Frontend:</strong> React.js for a dynamic and responsive user interface.</li>
        <li><strong style={highlightStyle}>Smart Contracts:</strong> Developed using Solidity for blockchain interactions.</li>
        <li><strong style={highlightStyle}>Blockchain Network:</strong> Running on a compatible EVM-blockchain (e.g., Ethereum, Polygon).</li>
        <li><strong style={highlightStyle}>Decentralized Storage:</strong> IPFS for content decentralization.</li>
        <li><strong style={highlightStyle}>Wallet Integration:</strong> Seamless integration with Web3 wallets like Metamask.</li>
      </ul>

      <p style={{ textAlign: 'center', fontSize: '1.1em', marginTop: '50px', color: '#00ccff' }}>
        Join us in building a new era of digital ownership and content integrity!
      </p>
    </div>
  );
};

export default AboutContent; // <--- THIS IS CRUCIAL!