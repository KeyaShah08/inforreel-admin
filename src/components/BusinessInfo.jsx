// src/components/BusinessInfo.jsx
import { useEffect, useState } from 'react';

// Accept businessId and onBack prop (removed updateBusinessStatus)
function BusinessInfo({ businessId, onBack }) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'business', 'product'
  const [businessData, setBusinessData] = useState(null);

  // Helper function to generate dummy address
  const generateAddress = (id) => ({
    addressLine1: `${id * 10} Main St`,
    addressLine2: id % 3 === 0 ? `Apt ${id}` : '',
    city: id % 2 === 0 ? 'Springfield' : 'Riverdale',
    state: 'IL',
    country: 'United States',
    zipPostalCode: `600${10 + id}`,
  });

  // Mock detailed business data (this would typically come from an API call)
  // This data will be "local" to BusinessInfo.jsx
  const mockDetailedBusinesses = {
    1: {
      id: 1,
      name: 'TechCorp Solutions',
      status: 'Pending',
      personal: {
        fullName: 'John Doe',
        username: 'johndoe_tech',
        email: 'john.doe@techcorp.com',
        dateOfBirth: '10/26/1988',
        gender: 'Male',
        ssn: 'XXX-XX-6789',
        governmentId: 'Keya_Shah.pdf',
        residentialAddress: {
          addressLine1: '123 Tech Avenue',
          addressLine2: 'Suite 100',
          city: 'New York City',
          state: 'NY',
          country: 'United States',
          zipPostalCode: '10001',
        },
      },
      business: {
        categories: 'Technology, Software',
        registeredBusinessName: 'TechCorp Solutions Inc.',
        dbaInfo: 'N/A', // DBA (Doing Business As) or an official name change
        tradeName: 'TechCorp',
        dbaTradeDocuments: 'Keya_Shah.pdf',
        businessContact: {
          email: 'info@techcorp.com',
          // ... other details
        },
      },
      product: {
        productType: 'Software Development',
        serviceDescription: 'Offers custom software solutions for enterprises.',
        pricingModel: 'Per-project or subscription-based',
        website: 'www.techcorp.com',
      },
    },
    // Add other detailed business data as needed, or generate dynamically
    2: {
      id: 2,
      name: 'Green Energy Co.',
      status: 'Verified',
      personal: {
        fullName: 'Jane Smith',
        username: 'janesmith_eco',
        email: 'jane.smith@greenenergy.com',
        dateOfBirth: '05/15/1990',
        gender: 'Female',
        ssn: 'XXX-XX-1234',
        governmentId: 'Jane_Smith_ID.pdf',
        residentialAddress: generateAddress(2),
      },
      business: {
        categories: 'Energy, Environment',
        registeredBusinessName: 'Green Energy Solutions Inc.',
        dbaInfo: 'Eco Power',
        tradeName: 'Green Energy',
        dbaTradeDocuments: 'Green_Energy_DBA.pdf',
        businessContact: { email: 'contact@greenenergy.com' },
      },
      product: {
        productType: 'Solar Panel Installation',
        serviceDescription: 'Provides installation and maintenance of residential solar panels.',
        pricingModel: 'Fixed-price projects',
        website: 'www.greenenergy.com',
      },
    },
    3: {
      id: 3,
      name: 'Digital Marketing Pro',
      status: 'Pending',
      personal: {
        fullName: 'Alice Johnson',
        username: 'alicej_dm',
        email: 'alice.johnson@dmpro.com',
        dateOfBirth: '03/01/1985',
        gender: 'Female',
        ssn: 'XXX-XX-5678',
        governmentId: 'Alice_Johnson_ID.pdf',
        residentialAddress: generateAddress(3),
      },
      business: {
        categories: 'Marketing, Digital Services',
        registeredBusinessName: 'Digital Marketing Pros LLC',
        dbaInfo: 'N/A',
        tradeName: 'DMPRO',
        dbaTradeDocuments: 'DMPRO_Docs.pdf',
        businessContact: { email: 'hello@dmpro.com' },
      },
      product: {
        productType: 'SEO Services',
        serviceDescription: 'Offers search engine optimization and content marketing services.',
        pricingModel: 'Monthly retainers',
        website: 'www.dmpro.com',
      },
    },
    4: {
      id: 4,
      name: 'Fashion Forward LLC',
      status: 'Denied',
      personal: {
        fullName: 'Bob Brown',
        username: 'bobb_fashion',
        email: 'bob.brown@fashionfwd.com',
        dateOfBirth: '09/20/1992',
        gender: 'Male',
        ssn: 'XXX-XX-9876',
        governmentId: 'Bob_Brown_ID.pdf',
        residentialAddress: generateAddress(4),
      },
      business: {
        categories: 'Fashion, Apparel',
        registeredBusinessName: 'Fashion Forward LLC',
        dbaInfo: 'Trendy Threads',
        tradeName: 'Fashion Forward',
        dbaTradeDocuments: 'FashionFwd_DBA.pdf',
        businessContact: { email: 'sales@fashionfwd.com' },
      },
      product: {
        productType: 'Online Clothing Retail',
        serviceDescription: 'E-commerce platform selling contemporary fashion.',
        pricingModel: 'Per-item sales',
        website: 'www.fashionfwd.com',
      },
    },
    // Add mock data for other business IDs (5-85)
    // You can use a loop or similar logic for dummy data for 5-85
    // For demonstration, I'll add a few more manually, but consider automation for large sets
    5: {
        id: 5,
        name: 'HealthTech Innovations',
        status: 'Pending',
        personal: {
            fullName: 'Carol White',
            username: 'carolw_ht',
            email: 'carol.white@hti.com',
            dateOfBirth: '07/11/1987',
            gender: 'Female',
            ssn: 'XXX-XX-1122',
            governmentId: 'Carol_White_ID.pdf',
            residentialAddress: generateAddress(5),
        },
        business: {
            categories: 'Health, Technology',
            registeredBusinessName: 'HealthTech Innovations Inc.',
            dbaInfo: 'HealthHub',
            tradeName: 'HTI',
            dbaTradeDocuments: 'HTI_Docs.pdf',
            businessContact: { email: 'info@hti.com' },
        },
        product: {
            productType: 'Telemedicine Platform',
            serviceDescription: 'Connects patients with healthcare providers online.',
            pricingModel: 'Subscription-based for providers',
            website: 'www.healthtechinnovations.com',
        },
    },
    // ... add more detailed mock data for other IDs if needed by your BusinessInfo component
    // Example for ID 56 (Verified Solutions Ltd)
    56: {
        id: 56,
        name: 'Verified Solutions Ltd',
        status: 'Verified',
        personal: {
            fullName: 'David Lee',
            username: 'davidl_vsl',
            email: 'david.lee@verifiedsolutions.com',
            dateOfBirth: '02/28/1975',
            gender: 'Male',
            ssn: 'XXX-XX-3344',
            governmentId: 'David_Lee_ID.pdf',
            residentialAddress: generateAddress(56),
        },
        business: {
            categories: 'Consulting',
            registeredBusinessName: 'Verified Solutions Ltd',
            dbaInfo: 'VSL Consulting',
            tradeName: 'VSL',
            dbaTradeDocuments: 'VSL_Docs.pdf',
            businessContact: { email: 'contact@verifiedsolutions.com' },
        },
        product: {
            productType: 'Business Consulting',
            serviceDescription: 'Offers strategic consulting services for small to large businesses.',
            pricingModel: 'Project-based fees',
            website: 'www.verifiedsolutions.com',
        },
    },
    // Example for ID 66 (Shady Deals Inc.)
    66: {
        id: 66,
        name: 'Shady Deals Inc.',
        status: 'Denied',
        personal: {
            fullName: 'Eve Green',
            username: 'eveg_shady',
            email: 'eve.green@shadydeals.com',
            dateOfBirth: '11/05/1980',
            gender: 'Female',
            ssn: 'XXX-XX-5566',
            governmentId: 'Eve_Green_ID.pdf',
            residentialAddress: generateAddress(66),
        },
        business: {
            categories: 'Retail',
            registeredBusinessName: 'Shady Deals Inc.',
            dbaInfo: 'N/A',
            tradeName: 'Shady Deals',
            dbaTradeDocuments: 'Shady_Deals_Docs.pdf',
            businessContact: { email: 'support@shadydeals.com' },
        },
        product: {
            productType: 'Discount Retail',
            serviceDescription: 'Offers highly discounted, off-season goods. (Mock reason for Denied status).',
            pricingModel: 'Per-item sales',
            website: 'www.shadydeals.com',
        },
    },
    // ... continue to add or dynamically generate data for the remaining IDs (7-85)
  };


  useEffect(() => {
    if (businessId) {
      // Simulate fetching data based on businessId
      const data = mockDetailedBusinesses[businessId];
      if (data) {
        setBusinessData(data);
      } else {
        setBusinessData(null); // Or handle "not found"
      }
    }
  }, [businessId]); // Re-run when businessId changes

  if (!businessData) {
    return (
      <div
        style={{
          padding: "30px",
          backgroundColor: "#f8f9fa",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#6b7280",
        }}
      >
        Loading business details... (or Business Not Found)
      </div>
    );
  }

  // Handle local status updates in BusinessInfo if needed, but it won't affect Business.jsx's list without more state management.
  const handleLocalStatusUpdate = (newStatus) => {
    setBusinessData(prevData => ({ ...prevData, status: newStatus }));
    // In a real app, you'd send this update to your backend API here
    // And then potentially refresh the list in Business.jsx when returning
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
      {/* Back button */}
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
        Back to Businesses
      </button>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Business Details: {businessData.name}
      </h1>

      {/* Status & Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#4b5563" }}>
            Current Status:
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              fontWeight: "700",
              fontSize: "14px",
              backgroundColor:
                businessData.status === "Verified"
                  ? "#dcfce7"
                  : businessData.status === "Pending"
                  ? "#fffbe0"
                  : "#fee2e2",
              color:
                businessData.status === "Verified"
                  ? "#15803d"
                  : businessData.status === "Pending"
                  ? "#b45309"
                  : "#dc2626",
            }}
          >
            {businessData.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {businessData.status === 'Pending' && (
            <>
              <button
                onClick={() => handleLocalStatusUpdate('Verified')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#22c55e',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(34,197,94,0.2)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(34,197,94,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 10px rgba(34,197,94,0.2)'}
              >
                Verify
              </button>
              <button
                onClick={() => handleLocalStatusUpdate('Denied')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 10px rgba(239,68,68,0.2)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(239,68,68,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 10px rgba(239,68,68,0.2)'}
              >
                Deny
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs for Information */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        }}
      >
        <div style={{ display: 'flex', marginBottom: '25px', borderBottom: '1px solid #e5e7eb' }}>
          {['personal', 'business', 'product'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                color: activeTab === tab ? '#96105E' : '#6b7280',
                borderBottom: activeTab === tab ? '2px solid #96105E' : '2px solid transparent',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
                outline: 'none',
                flexShrink: 0, // Prevent shrinking
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' && (
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Full Name:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.fullName}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Username:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.username}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Email:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.email}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Date of Birth:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.dateOfBirth}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Gender:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.gender}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>SSN:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.ssn}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Government ID:</p>
                <a href="#" style={{ fontSize: '15px', fontWeight: '500', color: '#96105E', textDecoration: 'none' }}>{businessData.personal.governmentId}</a>
              </div>
            </div>

            <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#333', marginTop: '25px' }}>Residential Address</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Address Line 1:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.addressLine1}</p>
              </div>
              {businessData.personal.residentialAddress.addressLine2 && (
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Address Line 2:</p>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.addressLine2}</p>
                </div>
              )}
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>City:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.city}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>State:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.state}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Country:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.country}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Zip/Postal Code:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.personal.residentialAddress.zipPostalCode}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Business Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Categories:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.business.categories}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Registered Business Name:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.business.registeredBusinessName}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>DBA/Info:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.business.dbaInfo}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Trade Name:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.business.tradeName}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>DBA/Trade Documents:</p>
                <a href="#" style={{ fontSize: '15px', fontWeight: '500', color: '#96105E', textDecoration: 'none' }}>{businessData.business.dbaTradeDocuments}</a>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Business Contact Email:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.business.businessContact.email}</p>
              </div>
              {/* Add other business contact details if available in your mock data */}
            </div>
          </div>
        )}

        {activeTab === 'product' && (
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Product/Service Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Product Type:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.product.productType}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Service Description:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.product.serviceDescription}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Pricing Model:</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{businessData.product.pricingModel}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}>Website:</p>
                <a href={businessData.product.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: '500', color: '#96105E', textDecoration: 'none' }}>{businessData.product.website}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessInfo;