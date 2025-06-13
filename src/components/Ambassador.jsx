// src/components/Ambassador.jsx
import { useEffect, useState } from 'react';
import AmbassadorInfo from './AmbassadorInfo'; // Import the new component

function Ambassador() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true); // Keep loading state for fetch logic
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedAmbassador, setSelectedAmbassador] = useState(null); // New state for selected ambassador
  const [showConfirmModal, setShowConfirmModal] = useState(false); // New state for modal visibility
  const [ambassadorToBan, setAmbassadorToBan] = useState(null); // New state to store ambassador for banning

  // Placeholder for extended ambassador data (YOU WILL REPLACE THIS WITH REAL API DATA)
  // Added fields like username, email, country, gender, dob, about, brandStatement, socialLinks
  // to match the Figma and AmbassadorInfo component's expectations.
  const initialAmbassadorData = [
    {
      id: 1,
      userId: "68279e3e9b314509aad97a18",
      name: 'Fashion Forward',
      username: 'fashion.forward',
      email: 'fashion.forward@example.com',
      niche: 'Fashion',
      location: 'New York City, NY',
      country: 'United States',
      gender: 'Female',
      dob: '05/15/1990',
      about: 'A leading fashion brand known for its innovative designs and sustainable practices.',
      brandStatement: 'Defining the future of fashion, one stitch at a time.',
      socialLinks: { instagram: 'instagram.com/fashionforward', youtube: 'youtube.com/fashionforward' },
      isBan: false,
    },
    {
      id: 2,
      userId: "anotherUserId2",
      name: 'HealthTech Solutions',
      username: 'healthtech_sol',
      email: 'info@healthtech.com',
      niche: 'Health',
      location: 'Dallas, TX',
      country: 'United States',
      gender: 'N/A', // Assuming a company, not an individual
      dob: '01/01/2000',
      about: 'Innovating health through technology, providing solutions for better living.',
      brandStatement: 'Your health, empowered by technology.',
      socialLinks: { instagram: 'instagram.com/healthtech', youtube: 'youtube.com/healthtech' },
      isBan: false,
    },
    {
      id: 3,
      userId: "anotherUserId3",
      name: 'SportsPro Inc.',
      username: 'sportspro_inc',
      email: 'contact@sportspro.com',
      niche: 'Sports',
      location: 'LA',
      country: 'United States',
      gender: 'N/A',
      dob: '03/20/1995',
      about: 'Dedicated to providing top-tier sports equipment and training programs.',
      brandStatement: 'Unleash your athletic potential.',
      socialLinks: { instagram: 'instagram.com/sportspro', youtube: 'youtube.com/sportspro' },
      isBan: true,
    },
    {
        id: 4,
        userId: "anotherUserId4",
        name: 'EcoLiving Brands',
        username: 'ecoliving',
        email: 'support@ecoliving.com',
        niche: 'Environment',
        location: 'San Francisco, CA',
        country: 'United States',
        gender: 'N/A',
        dob: '07/01/2010',
        about: 'Promoting sustainable living through eco-friendly products and initiatives.',
        brandStatement: 'Live green, live better.',
        socialLinks: { instagram: 'instagram.com/ecoliving', youtube: 'youtube.com/ecoliving' },
        isBan: false,
    },
    {
        id: 5,
        userId: "anotherUserId5",
        name: 'Gourmet Delights',
        username: 'gourmet_d',
        email: 'orders@gourmetdelights.com',
        niche: 'Food',
        location: 'Chicago, IL',
        country: 'United States',
        gender: 'N/A',
        dob: '11/11/2005',
        about: 'Crafting exquisite culinary experiences with the finest ingredients.',
        brandStatement: 'Taste the perfection.',
        socialLinks: { instagram: 'instagram.com/gourmetdelights', youtube: 'youtube.com/gourmetdelights' },
        isBan: true,
    },
    {
        id: 6,
        userId: "anotherUserId6",
        name: 'Artisan Crafts Co.',
        username: 'artisan_crafts',
        email: 'hello@artisancrafts.com',
        niche: 'Arts & Crafts',
        location: 'Denver, CO',
        country: 'United States',
        gender: 'N/A',
        dob: '02/28/2018',
        about: 'Handmade crafts reflecting creativity and passion.',
        brandStatement: 'Crafting beauty, one piece at a time.',
        socialLinks: { instagram: 'instagram.com/artisancrafts', youtube: 'youtube.com/artisancrafts' },
        isBan: false,
    },
    { id: 7, userId: "anotherUserId7", name: 'Global Logistics', username: 'global_logistics', email: 'contact@globallogistics.com', niche: 'Logistics', location: 'Houston, TX', country: 'United States', gender: 'N/A', dob: '09/01/1998', about: 'Streamlining global supply chains with innovative logistics solutions.', brandStatement: 'Connecting the world, seamlessly.', socialLinks: { instagram: 'instagram.com/globallogistics', youtube: 'youtube.com/globallogistics' }, isBan: false },
    { id: 8, userId: "anotherUserId8", name: 'Creative Design Studio', username: 'creative_ds', email: 'design@creativedesign.com', niche: 'Design', location: 'Portland, OR', country: 'United States', gender: 'N/A', dob: '04/10/2015', about: 'Bringing visions to life through innovative graphic and web design.', brandStatement: 'Design that inspires.', socialLinks: { instagram: 'instagram.com/creativedesign', youtube: 'youtube.com/creativedesign' }, isBan: true },
    { id: 9, userId: "anotherUserId9", name: 'Fintech Innovators', username: 'fintech_innovators', email: 'info@fintechinnovators.com', niche: 'Finance', location: 'Boston, MA', country: 'United States', gender: 'N/A', dob: '06/05/2012', about: 'Revolutionizing finance with cutting-edge technology and secure solutions.', brandStatement: 'The future of finance, now.', socialLinks: { instagram: 'instagram.com/fintechinnovators', youtube: 'youtube.com/fintechinnovators' }, isBan: false },
    { id: 10, userId: "anotherUserId10", name: 'EduTech Solutions', username: 'edutech_sol', email: 'hello@edutech.com', niche: 'Education', location: 'Miami, FL', country: 'United States', gender: 'N/A', dob: '08/12/2017', about: 'Empowering learning through interactive and accessible educational technology.', brandStatement: 'Learning made smart.', socialLinks: { instagram: 'instagram.com/edutech', youtube: 'youtube.com/edutech' }, isBan: false },
    { id: 11, userId: "anotherUserId11", name: 'Auto Repair Shop', username: 'autorepair_shop', email: 'service@autorepair.com', niche: 'Automotive', location: 'Detroit, MI', country: 'United States', gender: 'N/A', dob: '03/01/1980', about: 'Reliable and efficient auto repair services for all makes and models.', brandStatement: 'Driving your peace of mind.', socialLinks: { instagram: 'instagram.com/autorepair', youtube: 'youtube.com/autorepair' }, isBan: true },
    { id: 12, userId: "anotherUserId12", name: 'Real Estate Pros', username: 'realestate_pros', email: 'contact@realestate.com', niche: 'Real Estate', location: 'Phoenix, AZ', country: 'United States', gender: 'N/A', dob: '10/20/2003', about: 'Your trusted partner in buying and selling properties with expertise and integrity.', brandStatement: 'Your dream home, our mission.', socialLinks: { instagram: 'instagram.com/realestate', youtube: 'youtube.com/realestate' }, isBan: false },
    { id: 13, userId: "anotherUserId13", name: 'Travel Ventures', username: 'travel_ventures', email: 'explore@travelventures.com', niche: 'Travel', location: 'Orlando, FL', country: 'United States', gender: 'N/A', dob: '07/07/2009', about: 'Crafting unforgettable travel experiences around the globe.', brandStatement: 'Explore the world with us.', socialLinks: { instagram: 'instagram.com/travelventures', youtube: 'youtube.com/travelventures' }, isBan: false },
    { id: 14, userId: "anotherUserId14", name: 'Fitness Hub', username: 'fitness_hub', email: 'hello@fitnesshub.com', niche: 'Fitness', location: 'Seattle, WA', country: 'United States', gender: 'N/A', dob: '01/01/2016', about: 'A community-focused fitness center promoting health and wellness for all.', brandStatement: 'Strength in every step.', socialLinks: { instagram: 'instagram.com/fitnesshub', youtube: 'youtube.com/fitnesshub' }, isBan: true },
    { id: 15, userId: "anotherUserId15", name: 'Pet Care Paradise', username: 'petcare_paradise', email: 'care@petcare.com', niche: 'Pets', location: 'Austin, TX', country: 'United States', gender: 'N/A', dob: '04/04/2014', about: 'Providing loving and comprehensive care for your beloved pets.', brandStatement: 'Where pets are family.', socialLinks: { instagram: 'instagram.com/petcareparadise', youtube: 'youtube.com/petcareparadise' }, isBan: false },
    { id: 16, userId: "anotherUserId16", name: 'Home Renovation Experts', username: 'homereno_experts', email: 'reno@homereno.com', niche: 'Home Improvement', location: 'Atlanta, GA', country: 'United States', gender: 'N/A', dob: '02/14/2001', about: 'Transforming homes with expert renovation and remodeling services.', brandStatement: 'Building your dream home.', socialLinks: { instagram: 'instagram.com/homerenoexperts', youtube: 'youtube.com/homerenoexperts' }, isBan: false },
    { id: 17, userId: "anotherUserId17", name: 'Software Developers', username: 'software_devs', email: 'dev@softwaredev.com', niche: 'IT', location: 'San Jose, CA', country: 'United States', gender: 'N/A', dob: '11/30/2008', about: 'Crafting innovative and scalable software solutions for businesses worldwide.', brandStatement: 'Code that powers progress.', socialLinks: { instagram: 'instagram.com/softwaredevs', youtube: 'youtube.com/softwaredevs' }, isBan: true },
    { id: 18, userId: "anotherUserId18", name: 'Music School', username: 'music_school', email: 'learn@musicschool.com', niche: 'Music', location: 'Nashville, TN', country: 'United States', gender: 'N/A', dob: '05/01/1993', about: 'Nurturing musical talent through comprehensive lessons and performance opportunities.', brandStatement: 'Harmonize your potential.', socialLinks: { instagram: 'instagram.com/musicschool', youtube: 'youtube.com/musicschool' }, isBan: false },
    { id: 19, userId: "anotherUserId19", name: 'Legal Services', username: 'legal_services', email: 'legal@legalservices.com', niche: 'Legal', location: 'Washington, D.C.', country: 'United States', gender: 'N/A', dob: '03/08/1975', about: 'Providing expert legal counsel and representation for a diverse range of cases.', brandStatement: 'Justice, delivered.', socialLinks: { instagram: 'instagram.com/legalservices', youtube: 'youtube.com/legalservices' }, isBan: false },
    { id: 20, userId: "anotherUserId20", name: 'Event Planners', username: 'event_planners', email: 'plan@eventplanners.com', niche: 'Events', location: 'Las Vegas, NV', country: 'United States', gender: 'N/A', dob: '09/17/2011', about: 'Creating memorable and seamless events, from concept to execution.', brandStatement: 'Your vision, our expertise.', socialLinks: { instagram: 'instagram.com/eventplanners', youtube: 'youtube.com/eventplanners' }, isBan: true },
  ];
  

  // --- New useEffect for fetching initial data ---
  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        // No longer explicitly setting loading = true before the setTimeout
        setError(null);

        // Directly set data without a simulated delay for smoother rendering
        setBusinesses(initialAmbassadorData); 
      } catch (err) {
        console.error("Error fetching ambassadors:", err);
        setError("Failed to load ambassadors. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once data is "fetched"
      }
    };

    fetchAmbassadors();
  }, []);

  // Function to handle clicking on an ambassador row
  const handleRowClick = (ambassador) => {
    setSelectedAmbassador(ambassador);
  };

  // Function to go back to the ambassador list
  const handleBackToList = () => {
    setSelectedAmbassador(null);
  };

  const handleToggle = (id, userId, currentIsBanStatus) => {
    if (!currentIsBanStatus) { // If the user is NOT banned, show the confirmation modal
      setAmbassadorToBan({ id, userId, currentIsBanStatus });
      setShowConfirmModal(true);
    } else { // If the user IS banned, proceed with unbanning directly
      confirmToggle(id, userId, currentIsBanStatus);
    }
  };

  const confirmToggle = (id, userId, currentIsBanStatus) => {
    const newIsBanStatus = !currentIsBanStatus; 

    // Update the local state directly without API call
    setBusinesses(businesses.map(business =>
      business.id === id
        ? { ...business, isBan: newIsBanStatus }
        : business
    ));
    
    setShowConfirmModal(false); // Close modal after action
    setAmbassadorToBan(null); // Clear the ambassador to ban
  };

  const handleCancelBan = () => {
    setShowConfirmModal(false);
    setAmbassadorToBan(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredAmbassadors = businesses.filter(ambassador =>
    ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambassador.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ambassador.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers.filter((value, index, self) =>
      self.indexOf(value) === index
    );
  };

  const StatusToggle = ({ isBanned, onToggle }) => {
    const isOn = !isBanned; 
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

  // --- Conditional Rendering ---
  if (selectedAmbassador) {
    return <AmbassadorInfo ambassador={selectedAmbassador} onBack={handleBackToList} />;
  }

  // Render error state if no ambassador is selected and there's an error
  if (error) {
    return (
      <div style={{ padding: "30px", textAlign: "center", fontSize: "20px", color: "#dc2626" }}>
        Error: {error}
      </div>
    );
  }

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
            {/* If currentAmbassadors is empty, this tbody will be empty. */}
            {currentAmbassadors.length > 0 && currentAmbassadors.map((business) => (
                <tr
                  key={business.id}
                  onClick={() => handleRowClick(business)} // Make the row clickable
                  style={{
                    backgroundColor: "#fff",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    cursor: "pointer", // Indicate it's clickable
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
                    {/* Stop propagation for toggle switch so row click doesn't trigger it */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <StatusToggle
                        isBanned={business.isBan}
                        onToggle={() => handleToggle(business.id, business.userId, business.isBan)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
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

      {/* Confirmation Modal */}
      {showConfirmModal && ambassadorToBan && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
              width: '90%',
              maxWidth: '400px',
              position: 'relative',
            }}
          >
            <button
              onClick={handleCancelBan}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              ×
            </button>
            <h2 style={{ fontSize: '22px', color: '#333', marginBottom: '15px' }}>Confirm Ban</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
              Are you sure you want to ban this user?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button
                onClick={() => confirmToggle(ambassadorToBan.id, ambassadorToBan.userId, ambassadorToBan.currentIsBanStatus)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                Confirm
              </button>
              <button
                onClick={handleCancelBan}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#fff',
                  color: '#374151',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ambassador;