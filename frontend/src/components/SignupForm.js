import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, User, Lock, ArrowRight } from "lucide-react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message); // Display error if username/email already exists
      }

      navigate("/verify", { state: { email: formData.email } });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Sign up to get started</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <User className="input-icon" />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Sending Code..." : "Sign Up"} <ArrowRight className="arrow-icon" />
          </button>

          <p className="already-have-account">
            Already have an account? <Link to="/login" className="login-link">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;