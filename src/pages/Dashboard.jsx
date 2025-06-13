// src/pages/Dashboard.jsx
import { useState } from "react";
import Ambassador from "../components/Ambassador";
import Business from "../components/Business";
import BusinessInfo from "../components/BusinessInfo";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [activeMenuItem, setActiveMenuItemState] = useState("Home");
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  // Custom handler for setting active menu item
  // This will ensure selectedBusinessId is reset when navigating to Business list
  const handleMenuItemClick = (itemName) => {
    setActiveMenuItemState(itemName);
    if (itemName === "Business") {
      setSelectedBusinessId(null); // Reset selected business when going to the list view
    }
  };

  // A function to render the appropriate component based on activeMenuItem and selectedBusinessId
  const renderContent = () => {
    switch (activeMenuItem) {
      case "Home":
        return <Home />;
      case "Business":
        // If a business is selected, show BusinessInfo, otherwise show the Business list
        if (selectedBusinessId) {
          return (
            <BusinessInfo
              businessId={selectedBusinessId}
              onBack={() => setSelectedBusinessId(null)}
              // Removed updateBusinessStatus prop as data is now managed in Business.jsx
            />
          );
        } else {
          return (
            <Business
              // Removed businesses prop as data is now managed in Business.jsx
              onViewDetails={setSelectedBusinessId} // Still pass this to allow drilling down
            />
          );
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
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={handleMenuItemClick} />

      {/* Main Content Area - now dynamically rendered */}
      {renderContent()}
    </div>
  );
}

export default Dashboard;