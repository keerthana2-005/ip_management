import React from 'react';
import { ShieldCheck, Clock, Globe, Key } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  const cardStyle = {
    backgroundColor: '#000',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #fff',
    transition: 'all 0.3s ease',
    color: '#fff',
    width: '100%',  // Ensure the card takes full width in its container
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#fff',
  };

  const descriptionStyle = {
    color: '#fff',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={iconContainerStyle}>{icon}</div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const sectionStyle = {
    padding: '48px 16px',
    backgroundColor: '#000',
    color: '#fff',
    width: '100vw',  // Ensures the section takes the full width of the viewport
    marginLeft: '-16px', // Offsets the padding to ensure no extra space on the left side
    marginRight: '-16px', // Offsets the padding to ensure no extra space on the right side
  };

  const containerStyle = {
    maxWidth: '1200px', // You can change this if you want the max width to be less or more
    margin: '0 auto',
    padding: '0 16px',  // Adds some padding to the sides of the content
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '48px',
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '12px',
  };

  const paragraphStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    color: '#fff',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    width: '100%', // Ensures the grid takes full width within the container
  };

  const features = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Immutable Protection",
      description:
        "Once registered on the blockchain, your IP cannot be altered, providing tamper-proof evidence of your creation.",
    },
    {
      icon: <Clock size={24} />,
      title: "Timestamped Proof",
      description:
        "Get verifiable proof of existence with exact date and time of registration to establish priority.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Recognition",
      description:
        "Your intellectual property is recognized worldwide on a decentralized network, not limited by jurisdiction.",
    },
    {
      icon: <Key size={24} />,
      title: "Secure Ownership",
      description:
        "Cryptographic keys ensure only you can claim and transfer ownership of your registered works.",
    },
  ];

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={headingStyle}>Why Use Blockchain for IP Protection?</h2>
          <p style={paragraphStyle}>
            Traditional IP protection systems are centralized, expensive, and slow. Our blockchain solution offers key advantages:
          </p>
        </div>
        <div style={gridStyle}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
