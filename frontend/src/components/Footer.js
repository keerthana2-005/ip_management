import React from 'react';
import { Shield, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', borderTop: '1px solid rgba(75, 0, 130, 0.3)', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#6a4dff' }}>
              <Shield style={{ width: '2rem', height: '2rem' }} />
              <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>BlockIP</span>
            </div>
            <p style={{ color: '#ccc', fontSize: '0.875rem' }}>
              Secure, immutable blockchain protection for your intellectual property. Empowering creators and innovators worldwide since 2025.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#" style={{ color: '#bbb', transition: 'color 0.3s ease' }}>
                <Twitter style={{ width: '1.25rem', height: '1.25rem' }} />
              </a>
              <a href="#" style={{ color: '#bbb', transition: 'color 0.3s ease' }}>
                <Github style={{ width: '1.25rem', height: '1.25rem' }} />
              </a>
              <a href="#" style={{ color: '#bbb', transition: 'color 0.3s ease' }}>
                <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
              </a>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '1rem' }}>Solutions</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Digital Art</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Software</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Music & Audio</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Research Papers</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Patents</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '1rem' }}>Resources</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Documentation</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>API Reference</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Tutorials</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Blog</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '1rem' }}>Company</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>About</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Team</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Careers</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Press</a></li>
              <li><a href="#" style={{ color: '#ccc', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Contact</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', marginTop: '3rem', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: '#bbb', fontSize: '0.875rem' }}>
            &copy; 2025 BlockIP. All rights reserved.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#bbb', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#bbb', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Terms of Service</a>
            <a href="#" style={{ color: '#bbb', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s ease' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
