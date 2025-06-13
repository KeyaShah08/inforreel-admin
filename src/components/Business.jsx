// src/components/Business.jsx
import { useState } from 'react';

// Accept onViewDetails prop
function Business({ onViewDetails }) { // Removed 'businesses' from props
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Pending'); // Default to Pending
  const [activeStatusFilter, setActiveStatusFilter] = useState('Pending'); // Default to Pending
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  // Mock data for businesses (total of 85 entries now) - MOVED HERE from Dashboard.jsx
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

  // Function to update the status of a business (now local to Business.jsx)
  const updateBusinessStatus = (id, newStatus) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(business =>
        business.id === id ? { ...business, status: newStatus } : business
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterClick = (status) => {
    setFilterStatus(status);
    setActiveStatusFilter(status);
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Filter businesses based on search term and status
  const filteredBusinesses = businesses.filter(business =>
    (filterStatus === 'All' || business.status === filterStatus) &&
    (business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     business.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) { // Show all if 5 or less pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // Always show first page
      if (currentPage > 3) pageNumbers.push('...'); // Ellipsis

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) { // Adjust range if near start
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) { // Adjust range if near end
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push('...'); // Ellipsis
      pageNumbers.push(totalPages); // Always show last page
    }
    // Filter out duplicate ellipses and ensure unique numbers
    return pageNumbers.filter((value, index, self) =>
      self.indexOf(value) === index
    );
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

      {/* Action Bar */}
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
      }}>
        {/* Search Input */}
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

        {/* Status Filters */}
        <div style={{ display: "flex", gap: "10px" }}>
          {['All', 'Pending', 'Verified', 'Denied'].map(status => (
            <button
              key={status}
              onClick={() => handleFilterClick(status)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: activeStatusFilter === status ? "#96105E" : "#fff",
                color: activeStatusFilter === status ? "#fff" : "#374151",
                fontWeight: activeStatusFilter === status ? "600" : "500",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeStatusFilter === status ? "0 4px 12px rgba(150,16,94,0.2)" : "none",
              }}
              onMouseEnter={(e) => {
                if (activeStatusFilter !== status) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#a8a8a8";
                }
              }}
              onMouseLeave={(e) => {
                if (activeStatusFilter !== status) {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
            >
              {status}
            </button>
          ))}
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
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <thead style={{backgroundColor: "#F9F9F9"}}>
            <tr>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}>
                Name
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Category
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Location
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Status
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBusinesses.length > 0 ? (
              currentBusinesses.map((business) => (
                <tr
                  key={business.id}
                  style={{
                    backgroundColor: "#fff",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderRight: "none"
                  }}>
                    {business.name}
                  </td>
                  <td style={{
                    padding: "12px",
                    fontSize: "14px",
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
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {business.location}
                    </div>
                  </td>
                  <td style={{
                    padding: "12px",
                    fontSize: "14px",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    borderRight: "none",
                    borderLeft: "none"
                  }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "9999px",
                        fontWeight: "600",
                        fontSize: "12px",
                        backgroundColor:
                          business.status === "Verified"
                            ? "#dcfce7"
                            : business.status === "Pending"
                            ? "#fffbe0"
                            : "#fee2e2",
                        color:
                          business.status === "Verified"
                            ? "#15803d"
                            : business.status === "Pending"
                            ? "#b45309"
                            : "#dc2626",
                      }}
                    >
                      {business.status}
                    </span>
                  </td>
                  <td style={{
                    padding: "12px",
                    fontSize: "14px",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderLeft: "none"
                  }}>
                    <button
                      onClick={() => onViewDetails(business.id)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#fff",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#374151",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.borderColor = "#d1d5db";
                      }}
                    >
                      View Details
                    </button>
                    {/* Status action buttons */}
                    {business.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateBusinessStatus(business.id, 'Verified')}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "1px solid #22c55e",
                            backgroundColor: "#22c55e",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#fff",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            marginLeft: '10px',
                          }}
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateBusinessStatus(business.id, 'Denied')}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "1px solid #ef4444",
                            backgroundColor: "#ef4444",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#fff",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            marginLeft: '10px',
                          }}
                        >
                          Deny
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '16px' }}>
                  No businesses found for the current search/filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "20px",
            gap: "10px",
            padding: "10px 0",
          }}
        >
          <button
            onClick={handlePrevPage}
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

          {/* Page Numbers */}
          {getPageNumbers().map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={index} style={{ padding: "8px 0", fontSize: "14px", color: "#6b7280" }}>...</span>
            ) : (
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
            )
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