import React, { useState } from 'react';

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
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Table */}
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <thead style={{backgroundColor: "#F9F9F9"}}>
            <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #E4E4E4" }}>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                Name
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  Niche
                </div>
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  Location
                </div>
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: "transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business, index) => (
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
                  fontWeight: "400", 
                  color: "#1f2937",
                  border: "1px solid #E4E4E4",
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
                  border: "1px solid #E4E4E4",
                  borderRight: "none",
                  borderLeft: "none"
                }}>               
                  {business.niche}
                </td>
                <td style={{ 
                  padding: "12px", 
                  fontSize: "14px", 
                  color: "#1f2937",
                  border: "1px solid #E4E4E4",
                  borderRight: "none",
                  borderLeft: "none"
                }}>                  
                  <div>
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>📍</span>
                    {business.location}
                  </div>
                </td>
                <td style={{ 
                  padding: "12px", 
                  fontSize: "14px", 
                  color: "#1f2937",
                  border: "1px solid #E4E4E4",
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
      </div>
    </div>
  );
}

export default Ambassador;