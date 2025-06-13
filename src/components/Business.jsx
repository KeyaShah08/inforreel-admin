// src/components/Business.jsx
import { useState } from 'react';

// Accept onViewDetails prop
function Business({ onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Pending'); // Default to Pending
  const [activeStatusFilter, setActiveStatusFilter] = useState('Pending'); // Default to Pending
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  // Mock data for businesses (total of 85 entries now)
  const businesses = [
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
  ];

  // Calculate counts for each status
  const statusCounts = {
    Pending: businesses.filter(b => b.status === 'Pending').length,
    Verified: businesses.filter(b => b.status === 'Verified').length,
    Denied: businesses.filter(b => b.status === 'Denied').length,
  };

  // Filter businesses based on search and status
  const allFilteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = business.status === activeStatusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(allFilteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusinesses = allFilteredBusinesses.slice(startIndex, endIndex);

  const handleStatusClick = (status) => {
    setActiveStatusFilter(status);
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page when changing status
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#22C55E';
      case 'Pending': return '#F59E0B';
      case 'Inactive': return '#EF4444';
      case 'Verified': return '#22C55E';
      case 'Denied': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages === 0) {
      return [];
    } else if (totalPages === 1) {
      return [1];
    } else if (totalPages === 2) {
      return [1, 2];
    } else { // totalPages > 2
      if (currentPage === totalPages) {
        // If on the last page, show the last two pages
        pages.push(totalPages - 1, totalPages);
      } else {
        // For any other page (1 or middle pages), show the current page and the next page
        pages.push(currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa",
        flexGrow: 1,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Businesses
      </h1>

      {/* Status Bar */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "30px",
          alignItems: "center",
          padding: "16px 24px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        {[
          { label: "Pending", count: statusCounts.Pending, color: "#f59e0b" },
          { label: "Verified", count: statusCounts.Verified, color: "#22c55e" },
          { label: "Denied", count: statusCounts.Denied, color: "#ef4444" },
        ].map((status, index) => (
          <div
            key={index}
            onClick={() => handleStatusClick(status.label)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: activeStatusFilter === status.label ? "#e8f0fe" : "transparent",
              transition: "background-color 0.2s",
              border: activeStatusFilter === status.label ? `1px solid ${status.color}40` : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (activeStatusFilter !== status.label) {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
              }
            }}
            onMouseLeave={(e) => {
              if (activeStatusFilter !== status.label) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: status.color,
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: activeStatusFilter === status.label ? status.color : "#374151",
                fontWeight: activeStatusFilter === status.label ? "700" : "500",
              }}
            >
              {status.label} ({status.count})
            </span>
          </div>
        ))}

        {/* Search Input */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    width: "250px",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#96105E";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(150,16,94,0.1)";
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.05)";
                }}
            />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <thead style={{backgroundColor: "#F9F9F9", borderRadius: "8px"}}>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em",  borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}>
                  Business Name
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Categories
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Location
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBusinesses.map((business) => (
                <tr
                  key={business.id}
                  onClick={() => onViewDetails(business.id)} // Add onClick to view details
                  style={{
                    backgroundColor: "#fff",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    cursor: 'pointer', // Indicate it's clickable
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  }}
                >
                  <td style={{
                    padding: "12px",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    border: "1px solid #e5e7eb",
                    borderRight: "none"
                  }}>
                    <div>
                      <div style={{ fontWeight: "600", color: "#1f2937", fontSize: "14px" }}>
                        {business.name}
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    borderRight: "none",
                    borderLeft: "none"
                  }}>
                    {business.category}
                  </td>
                  <td style={{
                    padding: "12px",
                    fontSize: "14px",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    borderRight: "none",
                    borderLeft: "none"
                  }}>
                    {business.location}
                  </td>
                  <td style={{
                    padding: "12px",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    border: "1px solid #e5e7eb",
                    borderLeft: "none"
                  }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: `${getStatusColor(business.status)}15`,
                        color: getStatusColor(business.status),
                      }}
                    >
                      {business.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentBusinesses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '16px' }}>
              No businesses found for the selected filter and search term.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          padding: "0 4px",
        }}
      >
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Showing {startIndex + 1}-{Math.min(endIndex, allFilteredBusinesses.length)} of {allFilteredBusinesses.length} businesses
        </p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              backgroundColor: currentPage === 1 ? "#f9fafb" : "#fff",
              fontSize: "14px",
              color: currentPage === 1 ? "#9ca3af" : "#374151",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Previous
          </button>

          {/* Page Numbers - Dynamically shows 2 pages */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: currentPage === pageNumber ? "1px solid #96105E" : "1px solid #d1d5db",
                backgroundColor: currentPage === pageNumber ? "#96105E" : "#fff",
                fontSize: "14px",
                color: currentPage === pageNumber ? "#fff" : "#374151",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: "40px",
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              backgroundColor: currentPage === totalPages ? "#f9fafb" : "#fff",
              fontSize: "14px",
              color: currentPage === totalPages ? "#9ca3af" : "#374151",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Business;