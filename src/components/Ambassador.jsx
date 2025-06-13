// src/components/Ambassador.jsx
import { useState } from 'react';

function Ambassador() {
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: 'Fashion Forward',
      niche: 'Fashion',
      location: 'New York City, NY',
      status: true, // true = active/green, false = inactive/red
    },
    {
      id: 2,
      name: 'HealthTech Solutions',
      niche: 'Health',
      location: 'Dallas, TX',
      status: true,
    },
    {
      id: 3,
      name: 'SportsPro Inc.',
      niche: 'Sports',
      location: 'LA',
      status: false,
    },
    {
        id: 4,
        name: 'EcoLiving Brands',
        niche: 'Environment',
        location: 'San Francisco, CA',
        status: true,
    },
    {
        id: 5,
        name: 'Gourmet Delights',
        niche: 'Food',
        location: 'Chicago, IL',
        status: false,
    },
    {
        id: 6,
        name: 'Artisan Crafts Co.',
        niche: 'Arts & Crafts',
        location: 'Denver, CO',
        status: true,
    },
    { id: 7, name: 'Global Logistics', niche: 'Logistics', location: 'Houston, TX', status: true },
    { id: 8, name: 'Creative Design Studio', niche: 'Design', location: 'Portland, OR', status: false },
    { id: 9, name: 'Fintech Innovators', niche: 'Finance', location: 'Boston, MA', status: true },
    { id: 10, name: 'EduTech Solutions', niche: 'Education', location: 'Miami, FL', status: true },
    { id: 11, name: 'Auto Repair Shop', niche: 'Automotive', location: 'Detroit, MI', status: false },
    { id: 12, name: 'Real Estate Pros', niche: 'Real Estate', location: 'Phoenix, AZ', status: true },
    { id: 13, name: 'Travel Ventures', niche: 'Travel', location: 'Orlando, FL', status: true },
    { id: 14, name: 'Fitness Hub', niche: 'Fitness', location: 'Seattle, WA', status: false },
    { id: 15, name: 'Pet Care Paradise', niche: 'Pets', location: 'Austin, TX', status: true },
    { id: 16, name: 'Home Renovation Experts', niche: 'Home Improvement', location: 'Atlanta, GA', status: true },
    { id: 17, name: 'Software Developers', niche: 'IT', location: 'San Jose, CA', status: false },
    { id: 18, name: 'Music School', niche: 'Music', location: 'Nashville, TN', status: true },
    { id: 19, name: 'Legal Services', niche: 'Legal', location: 'Washington, D.C.', status: true },
    { id: 20, name: 'Event Planners', niche: 'Events', location: 'Las Vegas, NV', status: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  const handleToggle = (id) => {
    setBusinesses(businesses.map(business =>
      business.id === id
        ? { ...business, status: !business.status }
        : business
    ));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter ambassadors based on search term
  const filteredAmbassadors = businesses.filter(ambassador =>
    ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambassador.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambassador.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAmbassadors = filteredAmbassadors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAmbassadors.length / itemsPerPage);

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

  const ToggleSwitch = ({ isOn, onToggle }) => {
    return (
      <div
        onClick={onToggle}
        style={{
          width: '48px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: isOn ? '#22c55e' : '#dc2626',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            transform: isOn ? 'translateX(24px)' : 'translateX(0px)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
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
            Ambassadors
        </h1>

        {/* Action Bar with only Search Input */}
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "30px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0",
        }}>
             <input
                type="text"
                placeholder="Search ambassadors..."
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
                Niche
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
            {currentAmbassadors.length > 0 ? (
              currentAmbassadors.map((business) => (
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
                    {business.niche}
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
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>📍</span>
                      {business.location}
                    </div>
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
                    <ToggleSwitch
                      isOn={business.status}
                      onToggle={() => handleToggle(business.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '16px' }}>
                  No ambassadors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", // Aligns pagination to the right
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

export default Ambassador;