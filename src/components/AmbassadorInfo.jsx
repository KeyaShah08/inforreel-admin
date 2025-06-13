// src/components/AmbassadorInfo.jsx

/**
 * AmbassadorInfo component displays detailed information for a single ambassador.
 * It receives the ambassador data and a function to go back to the list.
 * @param {Object} props - The component props.
 * @param {Object} props.ambassador - The ambassador object to display.
 * @param {Function} props.onBack - Function to call when the "Back" button is clicked.
 */
function AmbassadorInfo({ ambassador, onBack }) {
  if (!ambassador) {
    return (
      <div
        style={{
          padding: "30px",
          backgroundColor: "#f8f9fa",
          flexGrow: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#6b7280",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        No ambassador data available.
      </div>
    );
  }

  // Removed DetailRow helper function as we are inlining the structure for more control


  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa",
        flexGrow: 1,
        height: "100%",
        overflowY: "auto",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Ensures all direct children are left-aligned
        justifyContent: "flex-start",
      }}
    >
      {/* Back button, styled exactly like BusinessInfo's back button */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "25px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          backgroundColor: "#fff",
          fontSize: "14px",
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Ambassadors
      </button>

      {/* Main title for the page */}
      <h1
style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "20px",        }}
      >
        Ambassador Details: {ambassador.name}
      </h1>


      {/* Personal Information Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px", // Matches BusinessInfo's tab content padding
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
          width: "100%",
          marginBottom: "20px", // Add margin to separate sections
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}> {/* Adjusted gap */}
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Full Name:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.name || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Username:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.username || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Email:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.email || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Country:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.country || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>State:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.state || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Gender:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.gender || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Date of Birth:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.dob || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Business & Niche Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
          width: "100%",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Business & Niche</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}> {/* Adjusted gap */}
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Niche:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.niche || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>About:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.about || 'N/A'}</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Brand Statement:</p>
            <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{ambassador.brandStatement || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Social Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}> {/* Adjusted gap */}
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Instagram:</p>
            <a href={ambassador.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: '500', color: '#96105E', textDecoration: 'none' }}>
              {ambassador.socialLinks?.instagram || 'N/A'}
            </a>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>YouTube:</p>
            <a href={ambassador.socialLinks?.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: '500', color: '#96105E', textDecoration: 'none' }}>
              {ambassador.socialLinks?.youtube || 'N/A'}
            </a>
          </div>
          {/* Add more social links as needed */}
        </div>
      </div>
    </div>
  );
}

export default AmbassadorInfo;
