import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header"; // Corrected to lowercase 'header'

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation regex:
  // At least 8 characters long
  // Contains at least one lowercase letter
  // Contains at least one uppercase letter
  // Contains at least one digit
  // Contains at least one special character (!@#$%&*~).{8,}$/;
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the specific error when the user starts typing in that field
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);

    // If there are no errors, proceed with sign-in and redirect
    if (Object.keys(newErrors).length === 0) {
      // Simulate successful sign-in
      console.log("Signing in with:", formData);
      navigate("/dashboard"); // Redirect to the dashboard page
    }
  };

  return (
    <>
      <Header />
      {/* This main div now handles the full content area below the header */}
      <div
        style={{
          backgroundColor: "#f5f5f5", // Light gray background
          height: "calc(100vh - 70px)", // Fill remaining viewport height, accounting for fixed header
          width: "100%", // Explicitly take full width
          marginTop: "70px", // Push down to appear below the fixed header
          display: "flex", // Flexbox for centering the child (the white login card)
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          fontFamily: "'Inter', sans-serif", // Keep font family here or move to index.css
        }}
      >
        {/* The white login card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "48px", // Increased padding from Figma (48px top/bottom, 40px left/right)
            borderRadius: "8px",
            maxWidth: "450px", // Limits the card's maximum width as per Figma
            width: "100%", // Allow card to shrink on smaller screens
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centers content like "InforReel" and "Sign In" text within the card
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
            minHeight: "400px", // Ensures the card has a minimum visual height
            boxSizing: "border-box", // Include padding in width/height calculation
          }}
        >
      
          <h1
            style={{
              fontSize: "28px", // Sign In text size
              textAlign: "center",
              color: "#333", // Darker text color
              fontWeight: "600", // Semi-bold
              margin: "0 0 40px 0", // Increased bottom margin as per Figma
            }}
          >
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%", // Form takes full width within the card
              display: "flex",
              flexDirection: "column",
              gap: "16px", // Space between form elements (inputs, button, links)
            }}
          >
            <input
              type="text"
              name="email"
              placeholder="Username"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%", // Input fields take full width of the form
                padding: "16px", // Larger padding for input fields
                borderRadius: "6px",
                border: errors.email ? "1px solid #dc3545" : "1px solid #ddd", // Red border if error
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "16px", // Standard font size
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.email && (
              <span
                style={{
                  color: "#dc3545", // Red color for error messages
                  fontSize: "0.85rem",
                  marginTop: "-12px", // Adjust to bring closer to input
                  marginBottom: "4px", // Space after error message
                  alignSelf: "flex-start", // Align text to start
                }}
              >
                {errors.email}
              </span>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%", // Input fields take full width of the form
                padding: "16px", // Larger padding for input fields
                borderRadius: "6px",
                border: errors.password ? "1px solid #dc3545" : "1px solid #ddd", // Red border if error
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "16px", // Standard font size
                outline: "none",
                boxSizing: "border-box",
                // Removed marginBottom here, let the error span handle spacing
              }}
            />
            {errors.password && (
              <span
                style={{
                  color: "#dc3545", // Red color for error messages
                  fontSize: "0.85rem",
                  marginTop: "-12px", // Adjust to bring closer to input
                  marginBottom: "12px", // Space after error message, before the button
                  alignSelf: "flex-start", // Align text to start
                }}
              >
                {errors.password}
              </span>
            )}

            <button
              type="submit"
              style={{
                backgroundColor: "#96105E", // InforReel Brand color
                color: "#fff",
                padding: "16px 20px", // Larger padding for button
                border: "none",
                borderRadius: "6px",
                fontWeight: "600", // Semi-bold
                fontSize: "16px", // Standard font size
                cursor: "pointer",
                width: "100%", // Button takes full width of the form
                marginBottom: "16px", // Margin after button
                transition: "background-color 0.3s ease", // Smooth transition for hover
              }}
            >
              Sign In
            </button>

            <div
              style={{
                textAlign: "right", // Aligned to right as per Figma
                width: "100%", // Ensure this div takes full width for alignment
                marginBottom: "32px", // Increased margin as per Figma
              }}
            >
              <a
                href="#"
                style={{
                  color: "#96105E", // InforReel Brand color
                  textDecoration: "none",
                  fontSize: "15px", // Slightly smaller font size
                  fontWeight: "500", // Medium weight
                }}
              >
                Forgot Password?
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // Space between checkbox and label
                justifyContent: "flex-start", // Aligns to the left
                width: "100%", // Ensure this div takes full width for alignment
              }}
            >
              <input
                type="checkbox"
                id="remember"
                style={{
                  accentColor: "#96105E", // Checkbox color
                  transform: "scale(1.1)", // Slightly larger checkbox
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="remember"
                style={{
                  fontSize: "15px", // Slightly smaller font size
                  color: "#666", // Darker gray for text
                  cursor: "pointer",
                }}
              >
                Remember me
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
