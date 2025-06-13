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

  // Mock data for businesses (total of 85 entries now) - MOVED HERE
  const [businesses, setBusinesses] = useState([
    { id: 1, name: 'TechCorp Solutions', category: 'Fashion', location: 'New York City, NY', status: 'Pending' },
    { id: 2, name: 'Green Energy Co.', category: 'Beauty', location: 'New York City, NY', status: 'Verified' },
    { id: 3, name: 'Digital Marketing Pro', category: 'Health', location: 'New York City, NY', status: 'Pending' },
    { id: 4, name: 'Fashion Forward LLC', category: 'Sports', location: 'New York City, NY', status: 'Denied' },
    { id: 5, name: 'HealthTech Innovations', category: 'Fashion', location: 'New York City, NY', status: 'Pending' },
    { id: 6, name: 'Eco Solutions Inc.', category: 'Environment', location: 'San Francisco, CA', status: 'Pending' },
    { id: 7, name: 'Smart Tech Ltd.', category: 'Technology', location: 'Seattle, WA', status: 'Pending' },
    { id: 8, name: 'Beauty Brands Co.', category: 'Beauty', location: 'Los Angeles, CA', status: 'Verified' },
    { id: 9, name: 'Global Connect', category: 'Networking', location: 'Chicago, IL', status: 'Pending' },
    { id: 10, name: 'Creative Designs', category: 'Art & Design', location: 'Miami, FL', status: 'Verified' },
    { id: 11, name: 'Foodie Express', category: 'Food & Beverage', location: 'Houston, TX', status: 'Pending' },
    { id: 12, name: 'Fitness First', category: 'Sports', location: 'Denver, CO', status: 'Denied' },
    { id: 13, name: 'Edu Solutions', category: 'Education', location: 'Boston, MA', status: 'Pending' },
    { id: 14, name: 'Home Comforts', category: 'Home Goods', location: 'Portland, OR', status: 'Verified' },
    { id: 15, name: 'Travel Adventures', category: 'Travel', location: 'Orlando, FL', status: 'Pending' },
    { id: 16, name: 'Auto Innovations', category: 'Automotive', location: 'Detroit, MI', status: 'Verified' },
    { id: 17, name: 'Pet Paradise', category: 'Pet Supplies', location: 'Austin, TX', status: 'Pending' },
    { id: 18, name: 'Music Makers', category: 'Entertainment', location: 'Nashville, TN', status: 'Denied' },
    { id: 19, name: 'Construction Pros', category: 'Construction', location: 'Phoenix, AZ', status: 'Pending' },
    { id: 20, name: 'Data Insights', category: 'Technology', location: 'San Jose, CA', status: 'Verified' },
    { id: 21, name: 'Garden Guru', category: 'Home & Garden', location: 'Raleigh, NC', status: 'Pending' },
    { id: 22, name: 'Finance Hub', category: 'Finance', location: 'Charlotte, NC', status: 'Verified' },
    { id: 23, name: 'Legal Assist', category: 'Legal', location: 'Washington, D.C.', status: 'Pending' },
    { id: 24, name: 'Event Planners', category: 'Events', location: 'Las Vegas, NV', status: 'Denied' },
    { id: 25, name: 'Security Solutions', category: 'Security', location: 'San Antonio, TX', status: 'Pending' },
    { id: 26, name: 'Future Innovations', category: 'Technology', location: 'New York City, NY', status: 'Pending' },
    { id: 27, name: 'Urban Greens', category: 'Agriculture', location: 'San Francisco, CA', status: 'Pending' },
    { id: 28, name: 'Artisan Crafts Co.', category: 'Arts & Crafts', location: 'Portland, OR', status: 'Pending' },
    { id: 29, name: 'Mindful Living', category: 'Wellness', location: 'Boulder, CO', status: 'Pending' },
    { id: 30, name: 'Code Academy', category: 'Education', location: 'Seattle, WA', status: 'Pending' },
    { id: 31, name: 'Local Eats Hub', category: 'Food & Dining', location: 'Chicago, IL', status: 'Pending' },
    { id: 32, name: 'Green Thumb Gardens', category: 'Landscaping', location: 'Austin, TX', status: 'Pending' },
    { id: 33, name: 'Digital Creators', category: 'Marketing', location: 'Los Angeles, CA', status: 'Pending' },
    { id: 34, name: 'Eco-Friendly Cleaners', category: 'Cleaning Services', location: 'Miami, FL', status: 'Pending' },
    { id: 35, name: 'Adventure Gear Co.', category: 'Outdoor Sports', location: 'Denver, CO', status: 'Pending' },
    // --- 10 NEW Verified Businesses ---
    { id: 56, name: 'Verified Solutions Ltd', category: 'Consulting', location: 'New York City, NY', status: 'Verified' },
    { id: 57, name: 'Secure Data Systems', category: 'IT Security', location: 'San Jose, CA', status: 'Verified' },
    { id: 58, name: 'Elite Design Agency', category: 'Design', location: 'London, UK', status: 'Verified' },
    { id: 59, name: 'Premium Auto Care', category: 'Automotive', location: 'Chicago, IL', status: 'Verified' },
    { id: 60, name: 'Reliable Accounting', category: 'Finance', location: 'Houston, TX', status: 'Verified' },
    { id: 61, name: 'Global Trade Hub', category: 'Import/Export', location: 'Los Angeles, CA', status: 'Verified' },
    { id: 62, name: 'Fresh Produce Market', category: 'Food & Beverage', location: 'Miami, FL', status: 'Verified' },
    { id: 63, name: 'Craft Brewing Co.', category: 'Brewery', location: 'Denver, CO', status: 'Verified' },
    { id: 64, name: 'Urban Development Group', category: 'Real Estate', location: 'Seattle, WA', status: 'Verified' },
    { id: 65, name: 'Precision Engineering', category: 'Manufacturing', location: 'Detroit, MI', status: 'Verified' },

    // --- 20 NEW Denied Businesses ---
    { id: 66, name: 'Shady Deals Inc.', category: 'Retail', location: 'Gotham City, NY', status: 'Denied' },
    { id: 67, name: 'Bad Ideas Co.', category: 'Innovation', location: 'Springfield, IL', status: 'Denied' },
    { id: 68, name: 'Questionable Services', category: 'Consulting', location: 'Metropolis, CA', status: 'Denied' },
    { id: 69, name: 'Fake News Network', category: 'Media', location: 'Washington, D.C.', status: 'Denied' },
    { id: 70, name: 'Broken Gadgets Repair', category: 'Electronics', location: 'Seattle, WA', status: 'Denied' },
    { id: 71, name: 'Risky Investments', category: 'Finance', location: 'New York City, NY', status: 'Denied' },
    { id: 72, name: 'Toxic Waste Disposal', category: 'Environment', location: 'Houston, TX', status: 'Denied' },
    { id: 73, name: 'Unlicensed Practice', category: 'Health', location: 'Los Angeles, CA', status: 'Denied' },
    { id: 74, name: 'Dubious Designs', category: 'Art & Design', location: 'Miami, FL', status: 'Denied' },
    { id: 75, name: 'Expired Goods Store', category: 'Food & Beverage', location: 'Chicago, IL', status: 'Denied' },
    { id: 76, name: 'No-Show Movers', category: 'Logistics', location: 'Dallas, TX', status: 'Denied' },
    { id: 77, name: 'Faulty Construction LLC', category: 'Construction', location: 'Phoenix, AZ', status: 'Denied' },
    { id: 78, name: 'Unethical Marketing', category: 'Marketing', location: 'Boston, MA', status: 'Denied' },
    { id: 79, name: 'Pirate Software Inc.', category: 'Software', location: 'San Francisco, CA', status: 'Denied' },
    { id: 80, name: 'Ghost Tours Co.', category: 'Tourism', location: 'New Orleans, LA', status: 'Denied' },
    { id: 81, name: 'Slippery Slope Sports', category: 'Sports', location: 'Denver, CO', status: 'Denied' },
    { id: 82, name: 'Obsolete Tech Revival', category: 'Technology', location: 'Raleigh, NC', status: 'Denied' },
    { id: 83, name: 'Unsafe Driving School', category: 'Education', location: 'Atlanta, GA', status: 'Denied' },
    { id: 84, name: 'Broken Promises Legal', category: 'Legal', location: 'Portland, OR', status: 'Denied' },
    { id: 85, name: 'Expired Licenses Agency', category: 'Licensing', location: 'Las Vegas, NV', status: 'Denied' },
  ]);

  // Function to update the status of a business
  const updateBusinessStatus = (id, newStatus) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(business =>
        business.id === id ? { ...business, status: newStatus } : business
      )
    );
    // After updating, you might want to navigate back to the business list
    setSelectedBusinessId(null);
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
              updateBusinessStatus={updateBusinessStatus} // Pass the update function
            />
          );
        } else {
          return (
            <Business
              businesses={businesses} // Pass the businesses state
              onViewDetails={setSelectedBusinessId}
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
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />

      {/* Main Content Area - now dynamically rendered */}
      {renderContent()}
    </div>
  );
}

export default Dashboard;