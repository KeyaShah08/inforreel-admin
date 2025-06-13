// src/pages/Dashboard.jsx
import { useState } from "react";
import Ambassador from "../components/Ambassador";
import Business from "../components/Business";
import BusinessInfo from "../components/BusinessInfo"; // Import the new BusinessInfo component
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Home"); // Default to Home
  const [selectedBusinessId, setSelectedBusinessId] = useState(null); // New state for selected business ID

  // A function to render the appropriate component based on activeMenuItem and selectedBusinessId
  const renderContent = () => {
    switch (activeMenuItem) {
      case "Home":
        return <Home />;
      case "Business":
        // If a business is selected, show BusinessInfo, otherwise show the Business list
        if (selectedBusinessId) {
          return <BusinessInfo businessId={selectedBusinessId} onBack={() => setSelectedBusinessId(null)} />;
        } else {
          return <Business onViewDetails={setSelectedBusinessId} />; // Pass the setSelectedBusinessId function
        }
      case "Ambassadors":
        return <Ambassador />;
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