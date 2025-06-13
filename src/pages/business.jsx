import React, { useState } from 'react';

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
      default: return '#6B7280';
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* Status Bar */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "30px",
          alignItems: "center",
          padding: "16px 24px",
        //   backgroundColor: "#fff",
        //   borderRadius: "12px",
        //   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        //   border: "1px solid #e5e7eb",
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
              backgroundColor: activeStatusFilter === status.label ? "#f3f4f6" : "transparent",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (activeStatusFilter !== status.label) {
                e.currentTarget.style.backgroundColor = "#f9fafb";
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
                color: activeStatusFilter === status.label ? "#1f2937" : "#374151",
                fontWeight: activeStatusFilter === status.label ? "600" : "500",
              }}
            >
              {status.label}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
        //   backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <thead style={{backgroundColor: "#F9F9F9"}}>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                  Business Name
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                  Categories
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                  Location
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
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
                border: currentPage === pageNumber ? "1px solid #3b82f6" : "1px solid #d1d5db",
                backgroundColor: currentPage === pageNumber ? "#3b82f6" : "#fff",
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