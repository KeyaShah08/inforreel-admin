// src/components/Sidebar.jsx

function Sidebar({ activeMenuItem, setActiveMenuItem }) {
  const menuItems = [
    { name: "Home", icon: "/src/assets/icons/HomeIcon.svg" }, // Corrected path
    { name: "Business", icon: "/src/assets/icons/BusinessIcon.svg" }, // Corrected path
    { name: "Ambassadors", icon: "/src/assets/icons/AmbassadorIcon.svg" }, // Corrected path
  ];

  // Helper function to dynamically change SVG color/filter for active state
  const getIconStyle = (itemName) => {
    if (activeMenuItem === itemName) {
      // This filter attempts to tint the icon to a purple-like color
      // You might need to adjust this filter for your specific SVG colors
      return {
        filter: 'invert(15%) sepia(80%) saturate(2000%) hue-rotate(280deg) brightness(80%)',
      };
    }
    return {}; // No filter for inactive items
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#fff",
        boxShadow: "2px 0 20px rgba(0,0,0,0.05)",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#333",
            padding: "0 20px 20px 20px",
            borderBottom: "1px solid #eee",
            marginBottom: "20px",
          }}
        >
          InforReel
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item.name}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                backgroundColor: activeMenuItem === item.name ? "#f0f0f0" : "transparent",
                color: activeMenuItem === item.name ? "#96105E" : "#555",
                fontWeight: activeMenuItem === item.name ? "600" : "500",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.2s ease",
                borderRadius: "8px",
                margin: "2px 10px",
              }}
              onClick={() => setActiveMenuItem(item.name)}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{ width: '16px', height: '16px', ...getIconStyle(item.name) }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #eee",
          marginTop: "20px",
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#555",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          <img
            src="/src/assets/icons/logoutIcon.svg"
            alt="Log Out"
            style={{ width: '20px', height: '20px' }}
          />
          Log Out
        </a>
      </div>
    </div>
  );
}

export default Sidebar;