import React from 'react';
import { ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const sectionStyle = {
    textAlign: 'center',
    paddingTop: '4rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: 'white'
  };

  const headingStyle = {
    fontWeight: '800',
    fontSize: '2.25rem', // base size, similar to Tailwind text-4xl
    lineHeight: '1.2',
    letterSpacing: '-0.02em'
  };

  const subHeadingStyle = {
    color: '#818cf8', // Tailwind's indigo-400
    display: 'block'
  };

  const paragraphContainerStyle = {
    marginTop: '1rem',
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const paragraphStyle = {
    fontSize: '1rem',
    color: '#d1d5db' // Tailwind's gray-300
  };

  const buttonWrapperStyle = {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.25rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    backgroundColor: '#4f46e5', // Tailwind's indigo-600
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const buttonHover = (e) => {
    e.target.style.backgroundColor = '#4338ca'; // Tailwind's indigo-700
  };

  const buttonLeave = (e) => {
    e.target.style.backgroundColor = '#4f46e5'; // Restore original
  };

  return (
    <div style={sectionStyle}>
      <h1 style={headingStyle}>
        <span style={{ display: 'block' }}>Secure Your</span>
        <span style={subHeadingStyle}>Intellectual Property</span>
        <span style={{ display: 'block' }}>with Blockchain</span>
      </h1>

      <div style={paragraphContainerStyle}>
        <p style={paragraphStyle}>
          Immutable, transparent, and decentralized protection for your creative works and innovations.
        </p>
      </div>

      <div style={buttonWrapperStyle}>
        <a
          href="#"
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
        >
          <ShieldCheck style={{ marginRight: '0.5rem' }} size={20} />
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
