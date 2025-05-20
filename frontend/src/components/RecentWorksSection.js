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
    height: '100%',
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
    paddingTop: '48px',
    paddingBottom: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    backgroundColor: '#000',
    color: '#fff',
    width: '100%',
    // minHeight: '100vh', // Remove this to make height adjust to content
    // display: 'flex', // Consider removing if not needed for overall layout
    justifyContent: 'center', // Keep horizontal centering
    // alignItems: 'center', // Remove vertical centering of the whole section
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    width: '100%',
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
    width: '100%',
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