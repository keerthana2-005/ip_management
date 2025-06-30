import React from "react";
import { BrowserRouter as Router, Routes, Route } 
from "react-router-dom";
import SignupForm from "./components/SignupForm";
import VerificationPage from "./pages/VerificationPage"; // Import VerificationPage
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import HomePage from "./pages/HomePage";// Import ProfilePage component
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage component
import GuidePage from "./pages/GuidePage"; // Import GuidePage component
import AboutPage from "./pages/AboutPage"; // Import AboutPage component

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignupForm />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/login" element={<LoginPage />} />  {/* Add LoginPage Route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
         <Route path="/guide" element={<GuidePage />} />
         <Route path="/about" element={<AboutPage />} />

      </Routes>
    </Router>
  );
};

export default App;