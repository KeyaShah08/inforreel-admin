// src/components/Business.jsx
import { useState } from 'react';

function Business() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Pending'); // Default to Pending
  const [activeStatusFilter, setActiveStatusFilter] = useState('Pending'); // Default to Pending
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Show 3 items per page

  // Mock data for businesses
  const businesses = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      category: 'Fashion',
      location: 'New York City, NY',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Green Energy Co.',
      category: 'Beauty',
      location: 'New York City, NY',
      status: 'Verified',
    },
    {
      id: 3,
      name: 'Digital Marketing Pro',
      category: 'Health',
      location: 'New York City, NY',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Fashion Forward LLC',
      category: 'Sports',
      location: 'New York City, NY',
      status: 'Denied',
    },
    {
      id: 5,
      name: 'HealthTech Innovations',
      category: 'Fashion',
      location: 'New York City, NY',
      status: 'Pending',
    },
    {
      id: 6,
      name: 'Eco Solutions Inc.',
      category: 'Environment',
      location: 'San Francisco, CA',
      status: 'Pending',
    },
    {
      id: 7,
      name: 'Smart Tech Ltd.',
      category: 'Technology',
      location: 'Seattle, WA',
      status: 'Pending',
    },
    {
      id: 8,
      name: 'Beauty Brands Co.',
      category: 'Beauty',
      location: 'Los Angeles, CA',
      status: 'Verified',
    }
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
      case 'Verified': return '#22C55E'; // Added for 'Verified' status
      case 'Denied': return '#EF4444';   // Added for 'Denied' status
      default: return '#6B7280';
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa", // Changed to match overall background
        flexGrow: 1, // Added to fill available space
        height: "100%", // Added for proper height
        overflowY: "auto", // Added for scrolling if content overflows
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
          backgroundColor: "#fff", // Moved background to here
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)", // Enhanced shadow
          border: "1px solid #f0f0f0", // Subtle border
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
              backgroundColor: activeStatusFilter === status.label ? "#e8f0fe" : "transparent", // Highlight color
              transition: "background-color 0.2s",
              border: activeStatusFilter === status.label ? `1px solid ${status.color}40` : "1px solid transparent", // Add border for active
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
                color: activeStatusFilter === status.label ? status.color : "#374151", // Text color for active status
                fontWeight: activeStatusFilter === status.label ? "700" : "500", // Bold for active
              }}
            >
              {status.label} ({status.count}) {/* Show count */}
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
             <button
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#96105E",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 10px rgba(150,16,94,0.2)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7a0c4e"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#96105E"}
            >
              Add Business
            </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "#fff", // Table container background
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)", // Matching shadow
          border: "1px solid #f0f0f0", // Matching border
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <thead style={{backgroundColor: "#F9F9F9", borderRadius: "8px"}}> {/* Added background and border-radius to thead */}
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
              {currentBusinesses.map((business, index) => (
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

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: currentPage === pageNumber ? "1px solid #96105E" : "1px solid #d1d5db", // Changed highlight border color
                backgroundColor: currentPage === pageNumber ? "#96105E" : "#fff", // Changed highlight background color
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