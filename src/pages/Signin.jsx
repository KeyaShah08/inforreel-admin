import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Define the single allowed admin credentials (still for client-side quick feedback)
  const ALLOWED_ADMIN_EMAIL = "admin@example.com";
  const ALLOWED_ADMIN_PASSWORD = "admin123";

  // Email validation regex (kept as it validates format)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // REMOVED: Complex password validation regex
  // NOW: Only checks if password field is empty
  const validatePassword = (password) => {
    return password.length > 0; // Simple check: password must not be empty
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const newErrors = {};

    // Validate Email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate Password (simplified)
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) { // This check will only hit if password is empty string now
        newErrors.password = "Password cannot be empty."; // Updated message
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Client-side check for specific admin credentials (as requested, but still not secure)
    if (formData.email !== ALLOWED_ADMIN_EMAIL || formData.password !== ALLOWED_ADMIN_PASSWORD) {
      setApiError("Invalid email or password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://54.197.71.66:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Sign-in API Response:", data);

      if (response.ok && data.code === 200) {
        console.log("Sign in successful. User data:", data.data);
        navigate("/dashboard");
      } else {
        setApiError(data.message || "Sign in failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during sign-in API call:", error);
      setApiError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "#f5f5f5",
          height: "calc(100vh - 70px)",
          width: "100%",
          marginTop: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "48px",
            borderRadius: "8px",
            maxWidth: "450px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            minHeight: "400px",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              textAlign: "center",
              color: "#333",
              fontWeight: "600",
              margin: "0 0 40px 0",
            }}
          >
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <input
              type="text"
              name="email"
              placeholder="Username"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "6px",
                border: errors.email ? "1px solid #dc3545" : "1px solid #ddd",
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.email && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.85rem",
                  marginTop: "-12px",
                  marginBottom: "4px",
                  alignSelf: "flex-start",
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
                width: "100%",
                padding: "16px",
                borderRadius: "6px",
                border: errors.password ? "1px solid #dc3545" : "1px solid #ddd",
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.password && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.85rem",
                  marginTop: "-12px",
                  marginBottom: "12px",
                  alignSelf: "flex-start",
                }}
              >
                {errors.password}
              </span>
            )}

            {apiError && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.9rem",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                {apiError}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#96105E",
                color: "#fff",
                padding: "16px 20px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                width: "100%",
                marginBottom: "16px",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;