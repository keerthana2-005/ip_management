import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerificationPage.css";

const VerificationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "example@email.com";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    try {
      const code = otp.join("");
      const response = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Verification successful!"); // You can handle navigation here
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResend = () => {
    // Logic to resend OTP (you can update this with backend API call)
    alert("OTP Resent!");
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h2>Verification Code</h2>
        <p>Please enter the verification code sent to your device</p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-input"
            />
          ))}
        </div>
        <button onClick={handleVerify} className="verify-button">
          Verify Code
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Didn’t receive the code? <span onClick={handleResend} className="resend-link">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;