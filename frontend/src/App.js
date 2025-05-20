import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import VerificationPage from "./pages/VerificationPage"; // Import VerificationPage
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import HomePage from "./pages/HomePage";// Import ProfilePage component
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage component


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignupForm />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/login" element={<LoginPage />} />  {/* Add LoginPage Route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default App;