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
  ]);

  const handleToggle = (id) => {
    setBusinesses(businesses.map(business =>
      business.id === id
        ? { ...business, status: !business.status }
        : business
    ));
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
        backgroundColor: "#f8f9fa", // Changed to match dashboard background
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
            Ambassadors
        </h1>

        {/* Action Bar (Placeholder for Search/Filter/Add) */}
        <div style={{
            display: "flex",
            justifyContent: "flex-end", // Align right for add button
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
                // value={searchTerm} // If you add search, uncomment this
                // onChange={handleSearchChange} // If you add search, uncomment this
                style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    width: "250px",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    marginRight: "10px"
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
              Add Ambassador
            </button>
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
            {businesses.map((business, index) => ( // Renamed 'business' to 'ambassador' for clarity if you wish, but 'business' still works with your provided structure
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
                  fontWeight: "600", // Changed to 600 for names
                  color: "#1f2937",
                  border: "1px solid #e5e7eb", // Changed border color for consistency
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
                  border: "1px solid #e5e7eb", // Changed border color for consistency
                  borderRight: "none",
                  borderLeft: "none"
                }}>
                  {business.niche}
                </td>
                <td style={{
                  padding: "12px",
                  fontSize: "14px",
                  color: "#1f2937",
                  border: "1px solid #e5e7eb", // Changed border color for consistency
                  borderRight: "none", // Ensure consistent borders
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
                  border: "1px solid #e5e7eb", // Changed border color for consistency
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
            ))}
          </tbody>
        </table>
        {businesses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '16px' }}>
              No ambassadors found.
            </div>
          )}
      </div>
    </div>
  );
}

export default Ambassador;