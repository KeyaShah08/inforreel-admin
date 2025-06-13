// src/components/BusinessInfo.jsx
import { useEffect, useState } from 'react';

function BusinessInfo({ businessId, onBack }) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'business', 'product'
  const [businessData, setBusinessData] = useState(null);

  // Mock detailed business data (this would typically come from an API call)
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
          phone: '(123) 456-7890',
        },
        businessAddress: {
          isSameAsResidential: true,
          addressLine1: '123 Tech Avenue',
          addressLine2: 'Suite 100',
          city: 'New York City',
          state: 'NY',
          country: 'United States',
          zipPostalCode: '10001',
        },
        businessWebsite: 'www.techcorp.com',
        isRegisteredBusiness: 'Yes',
        employerIdNumber: '12-3456789',
        manufacturerCountry: 'United States',
        brandLaunchYear: '2015',
        socialMedia: 'link_to_social_media_profiles',
      },
      product: {
        ingredientTransparencyDocument: 'Keya_Shah.pdf',
        packagingSustainabilityDocument: 'Keya_Shah.pdf',
        allowedEverywhere: 'Yes',
        restrictedCountries: 'N/A',
        brandPromotionalPlan: 'Type plan here...',
        productDescription: 'Description here...',
        productUniqueSellingPoint: 'Text about unique selling point...',
        productVideoPhoto: [
          'Keya_Shah.pdf',
          'Keya_Shah.pdf', // Added second Keya_Shah.pdf
        ],
        complianceQAUpload: 'Keya_Shah.pdf',
      },
    },
    2: {
        id: 2,
        name: 'Green Energy Co.',
        status: 'Verified',
        personal: {
            fullName: 'Jane Doe',
            username: 'janedoe_energy',
            email: 'jane.doe@greenenergy.com',
            dateOfBirth: '05/15/1990',
            gender: 'Female',
            ssn: 'XXX-XX-1234',
            governmentId: 'Keya_Shah.pdf',
            residentialAddress: {
                addressLine1: '456 Eco Blvd',
                addressLine2: '',
                city: 'New York City',
                state: 'NY',
                country: 'United States',
                zipPostalCode: '10002',
            },
        },
        business: {
            categories: 'Renewable Energy, Sustainability',
            registeredBusinessName: 'Green Energy Company LLC',
            dbaInfo: 'GreenPower',
            tradeName: 'EcoSolutions',
            dbaTradeDocuments: 'Keya_Shah.pdf',
            businessContact: {
                email: 'contact@greenenergy.com',
                phone: '(987) 654-3210',
            },
            businessAddress: {
                isSameAsResidential: false,
                addressLine1: '789 Solar Way',
                addressLine2: 'Unit B',
                city: 'San Francisco',
                state: 'CA',
                country: 'United States',
                zipPostalCode: '94103',
            },
            businessWebsite: 'www.greenenergyco.com',
            isRegisteredBusiness: 'Yes',
            employerIdNumber: '98-7654321',
            manufacturerCountry: 'United States',
            brandLaunchYear: '2010',
            socialMedia: 'link_to_green_energy_socials',
        },
        product: {
            ingredientTransparencyDocument: 'Keya_Shah.pdf',
            packagingSustainabilityDocument: 'Keya_Shah.pdf',
            allowedEverywhere: 'Yes',
            restrictedCountries: 'N/A',
            brandPromotionalPlan: 'Promotional plan for eco-friendly products...',
            productDescription: 'Sustainable energy solutions for homes and businesses.',
            productUniqueSellingPoint: '100% clean energy, zero carbon footprint.',
            productVideoPhoto: [
                'Keya_Shah.pdf',
                'Keya_Shah.pdf', // Added second Keya_Shah.pdf
            ],
            complianceQAUpload: 'Keya_Shah.pdf',
        },
    },
     3: {
      id: 3,
      name: 'Digital Marketing Pro',
      status: 'Pending',
      personal: {
        fullName: 'Alice Smith',
        username: 'alice_digital',
        email: 'alice.smith@digitalpro.com',
        dateOfBirth: '01/01/1995',
        gender: 'Female',
        ssn: 'XXX-XX-9876',
        governmentId: 'Keya_Shah.pdf',
        residentialAddress: {
          addressLine1: '321 Marketing Rd',
          addressLine2: 'Apt 5A',
          city: 'New York City',
          state: 'NY',
          country: 'United States',
          zipPostalCode: '10003',
        },
      },
      business: {
        categories: 'Marketing, Digital Marketing, SEO',
        registeredBusinessName: 'Digital Marketing Pro LLC',
        dbaInfo: 'DigitalPro',
        tradeName: 'DigitalPro Marketing',
        dbaTradeDocuments: 'Keya_Shah.pdf',
        businessContact: {
          email: 'contact@digitalmarketingpro.com',
          phone: '(555) 123-4567',
        },
        businessAddress: {
          isSameAsResidential: true,
          addressLine1: '321 Marketing Rd',
          addressLine2: 'Apt 5A',
          city: 'New York City',
          state: 'NY',
          country: 'United States',
          zipPostalCode: '10003',
        },
        businessWebsite: 'www.digitalmarketingpro.com',
        isRegisteredBusiness: 'Yes',
        employerIdNumber: '11-2233445',
        manufacturerCountry: 'N/A',
        brandLaunchYear: '2018',
        socialMedia: 'link_to_digitalpro_socials',
      },
      product: {
        ingredientTransparencyDocument: 'Keya_Shah.pdf',
        packagingSustainabilityDocument: 'Keya_Shah.pdf',
        allowedEverywhere: 'Yes',
        restrictedCountries: 'N/A',
        brandPromotionalPlan: 'Detailed digital marketing strategies for clients.',
        productDescription: 'Offers comprehensive digital marketing services including SEO, SEM, social media, and content marketing.',
        productUniqueSellingPoint: 'Data-driven strategies with proven ROI for clients.',
        productVideoPhoto: [
            'Keya_Shah.pdf',
            'Keya_Shah.pdf', // Added second Keya_Shah.pdf
        ],
        complianceQAUpload: 'Keya_Shah.pdf',
      },
    },
  };


  useEffect(() => {
    const data = mockDetailedBusinesses[businessId] || mockDetailedBusinesses[1];
    setBusinessData(data);
  }, [businessId]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#22C55E';
      case 'Pending': return '#F59E0B';
      case 'Inactive': return '#EF4444';
      case 'Verified': return '#22C55E';
      case 'Denied': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderContent = () => {
    if (!businessData) return <div style={{ textAlign: 'center', padding: '20px' }}>No data found.</div>;

    const { personal, business, product } = businessData;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px', color: '#4b5563' }}>
        {/* Personal Information Section */}
        {activeTab === 'personal' && (
          <>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Personal Information</h3>
            <p><strong>Full Name:</strong> {personal.fullName}</p>
            <p><strong>Username:</strong> {personal.username}</p>
            <p><strong>Email:</strong> {personal.email}</p>
            <p><strong>Date of Birth:</strong> {personal.dateOfBirth}</p>
            <p><strong>Gender:</strong> {personal.gender}</p>
            <p><strong>SSN:</strong> {personal.ssn}</p>
            {/* Government Issued ID Link */}
            <p><strong>Government Issued ID:</strong> <a href={`/${personal.governmentId}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{personal.governmentId}</a></p>

            {/* Residential Address Section */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Residential Address</h3>
              <p><strong>Address Line 1:</strong> {personal.residentialAddress.addressLine1}</p>
              <p><strong>Address Line 2:</strong> {personal.residentialAddress.addressLine2 || 'N/A'}</p>
              <p><strong>City:</strong> {personal.residentialAddress.city}</p>
              <p><strong>State:</strong> {personal.residentialAddress.state}</p>
              <p><strong>Country:</strong> {personal.residentialAddress.country}</p>
              <p><strong>Zip / Postal Code:</strong> {personal.residentialAddress.zipPostalCode}</p>
            </div>
          </>
        )}

        {/* Business Information Section */}
        {activeTab === 'business' && (
          <>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Business Information</h3>
            <p><strong>Business Categories:</strong> {business.categories}</p>
            <p><strong>Registered Business Name:</strong> {business.registeredBusinessName}</p>
            <p><strong>DBA (Doing Business As) or official name change:</strong> {business.dbaInfo}</p>
            <p><strong>Trade Name:</strong> {business.tradeName}</p>
            {/* DBA and/or trade name documents Link */}
            <p><strong>DBA and/or trade name documents:</strong> <a href={`/${business.dbaTradeDocuments}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{business.dbaTradeDocuments}</a></p>
            <p><strong>Business Contact Email:</strong> {business.businessContact.email}</p>
            <p><strong>Business Contact Phone:</strong> {business.businessContact.phone}</p>
            <p><strong>Business Website:</strong> <a href={business.businessWebsite.startsWith('http') ? business.businessWebsite : `http://${business.businessWebsite}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{business.businessWebsite}</a></p>
            <p><strong>Is it a registered Business:</strong> {business.isRegisteredBusiness}</p>
            <p><strong>Employer ID Number (EIN):</strong> {business.employerIdNumber}</p>
            <p><strong>Which country is this brand manufactured:</strong> {business.manufacturerCountry}</p>
            <p><strong>What year did you launch this brand:</strong> {business.brandLaunchYear}</p>
            <p><strong>Social Media:</strong> <a href="#" style={{ color: '#96105E', textDecoration: 'none' }}>{business.socialMedia}</a></p>

            {/* Business Address Section */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Business Address</h3>
              <p><strong>My company address is same as my residential address:</strong> {business.businessAddress.isSameAsResidential ? 'Yes' : 'No'}</p>
              {!business.businessAddress.isSameAsResidential && (
                <>
                  <p><strong>Address Line 1:</strong> {business.businessAddress.addressLine1}</p>
                  <p><strong>Address Line 2:</strong> {business.businessAddress.addressLine2 || 'N/A'}</p>
                  <p><strong>City:</strong> {business.businessAddress.city}</p>
                  <p><strong>State:</strong> {business.businessAddress.state}</p>
                  <p><strong>Country:</strong> {business.businessAddress.country}</p>
                  <p><strong>Zip / Postal Code:</strong> {business.businessAddress.zipPostalCode}</p>
                </>
              )}
            </div>
          </>
        )}

        {/* Product Information Section */}
        {activeTab === 'product' && (
          <>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Product Information</h3>
            {/* Ingredient transparency document Link */}
            <p><strong>Ingredient transparency document (Optional):</strong> <a href={`/${product.ingredientTransparencyDocument}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{product.ingredientTransparencyDocument || 'N/A'}</a></p>
            {/* Packaging sustainability document Link */}
            <p><strong>Packaging sustainability document (Optional):</strong> <a href={`/${product.packagingSustainabilityDocument}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{product.packagingSustainabilityDocument || 'N/A'}</a></p>
            <p><strong>Is this product allowed to use everywhere:</strong> {product.allowedEverywhere}</p>
            <p><strong>Country where Product Use is restricted:</strong> {product.restrictedCountries || 'N/A'}</p>
            <p><strong>What is your brand promotional plan in Inforreel:</strong> {product.brandPromotionalPlan}</p>
            <p><strong>Product description:</strong> {product.productDescription}</p>
            <p><strong>What makes your product unique (USP):</strong> {product.productUniqueSellingPoint}</p>
            <p><strong>Product video and photo (max 3 uploads):</strong></p>
            <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
              {product.productVideoPhoto && product.productVideoPhoto.length > 0 ? (
                product.productVideoPhoto.map((file, idx) => (
                  // Product video/photo Link
                  <li key={idx}><a href={`/${file}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{file}</a></li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
            {/* Compliance and QA upload Link */}
            <p><strong>Compliance and QA upload (Optional):</strong> <a href={`/${product.complianceQAUpload}`} target="_blank" rel="noopener noreferrer" style={{ color: '#96105E', textDecoration: 'none' }}>{product.complianceQAUpload || 'N/A'}</a></p>
          </>
        )}
      </div>
    );
  };

  if (!businessData) {
    return null;
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#333",
          }}
        >
          {businessData?.name} Details
        </h1>
        <button
          onClick={onBack}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#fff",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          }}
        >
          &larr; Back to Businesses
        </button>
      </div>

      {/* Status and Action Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '16px 24px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0',
          marginBottom: '30px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Status:</span>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: `${getStatusColor(businessData?.status)}15`,
              color: getStatusColor(businessData?.status),
              minWidth: '90px',
              textAlign: 'center'
            }}
          >
            {businessData?.status}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: '#589E67',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 10px rgba(34,197,94,0.2)',
            }}
          >
            Verify
          </button>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: '#AF4B4B',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 10px rgba(239,68,68,0.2)',
            }}
          >
            Deny
          </button>
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
              {tab} Information
            </button>
          ))}
        </div>
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;