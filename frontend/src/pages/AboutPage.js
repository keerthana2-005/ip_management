import React from 'react';
import Navbar from '../components/Navbar';       // Assuming Navbar is in src/components
import AboutContent from '../components/AboutContent'; // New component for the About page content

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <AboutContent />
    </>
  );
};

export default AboutPage; // <--- THIS IS CRUCIAL!