import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
// import SearchSection from '../components/SearchSection';
import FeaturesSection from '../components/FeaturesSection';
import UploadSection from '../components/UploadSection';
import RecentWorksSection from '../components/RecentWorksSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-indigo-950">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* <SearchSection /> */}
        <FeaturesSection />
        <UploadSection />
        <RecentWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
