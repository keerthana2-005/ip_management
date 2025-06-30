import React from 'react';
import Navbar from '../components/Navbar';    // Path to your Navbar component
import UserGuide from '../components/UserGuide'; // Path to your UserGuide component

const GuidePage = () => {
  return (
    // React Fragment allows returning multiple elements without adding an extra DOM node
    <>
      <Navbar />      {/* Renders your navigation bar */}
      <UserGuide />   {/* Renders your user guide content */}
    </>
  );
};

export default GuidePage;