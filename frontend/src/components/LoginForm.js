import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react"; // Icons for input fields

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Show loading state

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Store user data in localStorage/sessionStorage (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/home"); // Navigate to profile on success
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Welcome Back!</h1>
        <p className="signup-subtitle">Login to your account</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="signup-form">
          <div className="input-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                placeholder="Enter your email or username"
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"} <ArrowRight className="arrow-icon" />
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
