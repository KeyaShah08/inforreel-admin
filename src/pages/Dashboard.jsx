// src/pages/Dashboard.jsx
import { useState } from "react";
import Ambassador from "../components/Ambassador"; // Import the new Ambassador component
import Business from "../components/Business";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Home"); // Default to Home

  // A function to render the appropriate component based on activeMenuItem
  const renderContent = () => {
    switch (activeMenuItem) {
      case "Home":
        return <Home />;
      case "Business":
        return <Business />;
      case "Ambassadors":
        return <Ambassador />; // Render Ambassador component when 'Ambassadors' is clicked
      default:
        return <Home />; // Fallback to Home
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />

      {/* Main Content Area - now dynamically rendered */}
      {renderContent()}
    </div>
  );
}

export default Dashboard;