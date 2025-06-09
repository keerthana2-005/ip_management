import React, { useState } from 'react';
import { Menu, X, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const styles = {
    nav: {
      backgroundColor: 'black',
      color: 'white',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    menu: {
      display: 'flex',
      gap: '1rem',
      marginLeft: '2rem',
    },
    link: {
      color: '#D1D5DB',
      padding: '0.5rem 0.75rem',
      fontSize: '0.9rem',
      textDecoration: 'none',
      borderRadius: '6px',
      transition: 'background 0.3s',
    },
    linkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    connectBtn: {
      backgroundColor: '#4F46E5',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    iconBtn: {
      background: 'none',
      border: 'none',
      color: '#D1D5DB',
      cursor: 'pointer',
    },
    mobileMenu: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(8px)',
      padding: '1rem',
    },
    mobileLink: {
      display: 'block',
      color: '#D1D5DB',
      padding: '0.5rem 0',
      textDecoration: 'none',
    },
    hidden: {
      display: 'none',
    },
    block: {
      display: 'block',
    },
    mobileToggle: {
      display: 'none',
    },
    '@media (max-width: 768px)': {
      menu: { display: 'none' },
      mobileToggle: { display: 'block' },
    },
  };

  // Updated navLinks to include paths:
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <Shield size={24} />
          <span style={{ marginLeft: '8px' }}>BlockIP</span>
        </div>

        {/* Desktop Menu */}
        <div className="menu" style={{ display: window.innerWidth > 768 ? 'flex' : 'none', ...styles.menu }}>
          {navLinks.map(({ name, path }) => (
            <Link key={name} to={path} style={styles.link}>
              {name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="buttons" style={{ display: window.innerWidth > 768 ? 'flex' : 'none', ...styles.buttons }}>
          <button style={styles.connectBtn}>Connect Wallet</button>
          <Link to="/profile" style={styles.iconBtn}>
            <User size={24} />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.iconBtn}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && window.innerWidth <= 768 && (
        <div style={styles.mobileMenu}>
          {navLinks.map(({ name, path }) => (
            <Link key={name} to={path} style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
              {name}
            </Link>
          ))}
          <div style={{ marginTop: '1rem' }}>
            <button style={styles.connectBtn}>Connect Wallet</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
