// src/components/BusinessInfo.jsx
import { useEffect, useState } from 'react';

// Accept updateBusinessStatus prop
function BusinessInfo({ businessId, onBack, updateBusinessStatus }) {
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

  // Comprehensive list of businesses from Business.jsx for detailed info generation
  const businessesList = [
    { id: 1, name: 'TechCorp Solutions', category: 'Fashion', location: 'New York City, NY', status: 'Pending' },
    { id: 2, name: 'Green Energy Co.', category: 'Beauty', location: 'New York City, NY', status: 'Verified' },
    { id: 3, name: 'Digital Marketing Pro', category: 'Health', location: 'New York City, NY', status: 'Pending' },
    { id: 4, name: 'Fashion Forward LLC', category: 'Sports', location: 'New York City, NY', status: 'Denied' },
    { id: 5, name: 'HealthTech Innovations', category: 'Fashion', location: 'New York City, NY', status: 'Pending' },
    { id: 6, name: 'Eco Solutions Inc.', category: 'Environment', location: 'San Francisco, CA', status: 'Pending' },
    { id: 7, name: 'Smart Tech Ltd.', category: 'Technology', location: 'Seattle, WA', status: 'Pending' },
    { id: 8, name: 'Beauty Brands Co.', category: 'Beauty', location: 'Los Angeles, CA', status: 'Verified' },
    { id: 9, name: 'Global Connect', category: 'Networking', location: 'Chicago, IL', status: 'Pending' },
    { id: 10, name: 'Creative Designs', category: 'Art & Design', location: 'Miami, FL', status: 'Verified' },
    { id: 11, name: 'Foodie Express', category: 'Food & Beverage', location: 'Houston, TX', status: 'Pending' },
    { id: 12, name: 'Fitness First', category: 'Sports', location: 'Denver, CO', status: 'Denied' },
    { id: 13, name: 'Edu Solutions', category: 'Education', location: 'Boston, MA', status: 'Pending' },
    { id: 14, name: 'Home Comforts', category: 'Home Goods', location: 'Portland, OR', status: 'Verified' },
    { id: 15, name: 'Travel Adventures', category: 'Travel', location: 'Orlando, FL', status: 'Pending' },
    { id: 16, name: 'Auto Innovations', category: 'Automotive', location: 'Detroit, MI', status: 'Verified' },
    { id: 17, name: 'Pet Paradise', category: 'Pet Supplies', location: 'Austin, TX', status: 'Pending' },
    { id: 18, name: 'Music Makers', category: 'Entertainment', location: 'Nashville, TN', status: 'Denied' },
    { id: 19, name: 'Construction Pros', category: 'Construction', location: 'Phoenix, AZ', status: 'Pending' },
    { id: 20, name: 'Data Insights', category: 'Technology', location: 'San Jose, CA', status: 'Verified' },
    { id: 21, name: 'Garden Guru', category: 'Home & Garden', location: 'Raleigh, NC', status: 'Pending' },
    { id: 22, name: 'Finance Hub', category: 'Finance', location: 'Charlotte, NC', status: 'Verified' },
    { id: 23, name: 'Legal Assist', category: 'Legal', location: 'Washington, D.C.', status: 'Pending' },
    { id: 24, name: 'Event Planners', category: 'Events', location: 'Las Vegas, NV', status: 'Denied' },
    { id: 25, name: 'Security Solutions', category: 'Security', location: 'San Antonio, TX', status: 'Pending' },
    { id: 26, name: 'Future Innovations', category: 'Technology', location: 'New York City, NY', status: 'Pending' },
    { id: 27, name: 'Urban Greens', category: 'Agriculture', location: 'San Francisco, CA', status: 'Pending' },
    { id: 28, name: 'Artisan Crafts Co.', category: 'Arts & Crafts', location: 'Portland, OR', status: 'Pending' },
    { id: 29, name: 'Mindful Living', category: 'Wellness', location: 'Boulder, CO', status: 'Pending' },
    { id: 30, name: 'Code Academy', category: 'Education', location: 'Seattle, WA', status: 'Pending' },
    { id: 31, name: 'Local Eats Hub', category: 'Food & Dining', location: 'Chicago, IL', status: 'Pending' },
    { id: 32, name: 'Green Thumb Gardens', category: 'Landscaping', location: 'Austin, TX', status: 'Pending' },
    { id: 33, name: 'Digital Creators', category: 'Marketing', location: 'Los Angeles, CA', status: 'Pending' },
    { id: 34, name: 'Eco-Friendly Cleaners', category: 'Cleaning Services', location: 'Miami, FL', status: 'Pending' },
    { id: 35, name: 'Adventure Gear Co.', category: 'Outdoor Sports', location: 'Denver, CO', status: 'Pending' },
    { id: 36, name: 'Pioneer Ventures', category: 'Investment', location: 'San Diego, CA', status: 'Pending' },
    { id: 37, name: 'Quantum Analytics', category: 'Technology', location: 'Boston, MA', status: 'Pending' },
    { id: 38, name: 'Zenith Innovations', category: 'Technology', location: 'Dublin, Ireland', status: 'Pending' },
    { id: 39, name: 'Oceanic Foods', category: 'Food & Beverage', location: 'Vancouver, Canada', status: 'Pending' },
    { id: 40, name: 'Summit Sports', category: 'Sports', location: 'Salt Lake City, UT', status: 'Pending' },
    { id: 41, name: 'Bright Future Education', category: 'Education', location: 'London, UK', status: 'Pending' },
    { id: 42, name: 'Urban Craft Brewery', category: 'Food & Beverage', location: 'Berlin, Germany', status: 'Pending' },
    { id: 43, name: 'Global Logistics Solutions', category: 'Logistics', location: 'Singapore', status: 'Pending' },
    { id: 44, name: 'Infinite Creations', category: 'Art & Design', location: 'Paris, France', status: 'Pending' },
    { id: 45, name: 'NextGen Robotics', category: 'Robotics', location: 'Tokyo, Japan', status: 'Pending' },
    { id: 46, name: 'MediCare Pro', category: 'Health', location: 'Sydney, Australia', status: 'Pending' },
    { id: 47, name: 'Clean Living Products', category: 'Home Goods', location: 'Amsterdam, Netherlands', status: 'Pending' },
    { id: 48, name: 'Vintage Collectibles', category: 'Retail', location: 'Rome, Italy', status: 'Pending' },
    { id: 49, name: 'Digital Nomad Services', category: 'Travel', location: 'Bangkok, Thailand', status: 'Pending' },
    { id: 50, name: 'Precision Agriculture', category: 'Agriculture', location: 'Brasília, Brazil', status: 'Pending' },
    { id: 51, name: 'CyberSecure Solutions', category: 'IT Security', location: 'Tel Aviv, Israel', status: 'Pending' },
    { id: 52, name: 'Sustainable Fashion Co.', category: 'Fashion', location: 'Copenhagen, Denmark', status: 'Pending' },
    { id: 53, name: 'Smart City Innovations', category: 'Urban Planning', location: 'Seoul, South Korea', status: 'Pending' },
    { id: 54, name: 'Green Building Materials', category: 'Construction', location: 'Dubai, UAE', status: 'Pending' },
    { id: 55, name: 'Holistic Wellness Center', category: 'Wellness', location: 'Bali, Indonesia', status: 'Pending' },
    { id: 56, name: 'Verified Solutions Ltd', category: 'Consulting', location: 'New York City, NY', status: 'Verified' },
    { id: 57, name: 'Secure Data Systems', category: 'IT Security', location: 'San Jose, CA', status: 'Verified' },
    { id: 58, name: 'Elite Design Agency', category: 'Design', location: 'London, UK', status: 'Verified' },
    { id: 59, name: 'Premium Auto Care', category: 'Automotive', location: 'Chicago, IL', status: 'Verified' },
    { id: 60, name: 'Reliable Accounting', category: 'Finance', location: 'Houston, TX', status: 'Verified' },
    { id: 61, name: 'Global Trade Hub', category: 'Import/Export', location: 'Los Angeles, CA', status: 'Verified' },
    { id: 62, name: 'Fresh Produce Market', category: 'Food & Beverage', location: 'Miami, FL', status: 'Verified' },
    { id: 63, name: 'Craft Brewing Co.', category: 'Brewery', location: 'Denver, CO', status: 'Verified' },
    { id: 64, name: 'Urban Development Group', category: 'Real Estate', location: 'Seattle, WA', status: 'Verified' },
    { id: 65, name: 'Precision Engineering', category: 'Manufacturing', location: 'Detroit, MI', status: 'Verified' },
    { id: 66, name: 'Shady Deals Inc.', category: 'Retail', location: 'Gotham City, NY', status: 'Denied' },
    { id: 67, name: 'Bad Ideas Co.', category: 'Innovation', location: 'Springfield, IL', status: 'Denied' },
    { id: 68, name: 'Questionable Services', category: 'Consulting', location: 'Metropolis, CA', status: 'Denied' },
    { id: 69, name: 'Fake News Network', category: 'Media', location: 'Washington, D.C.', status: 'Denied' },
    { id: 70, name: 'Broken Gadgets Repair', category: 'Electronics', location: 'Seattle, WA', status: 'Denied' },
    { id: 71, name: 'Risky Investments', category: 'Finance', location: 'New York City, NY', status: 'Denied' },
    { id: 72, name: 'Toxic Waste Disposal', category: 'Environment', location: 'Houston, TX', status: 'Denied' },
    { id: 73, name: 'Unlicensed Practice', category: 'Health', location: 'Los Angeles, CA', status: 'Denied' },
    { id: 74, name: 'Dubious Designs', category: 'Art & Design', location: 'Miami, FL', status: 'Denied' },
    { id: 75, name: 'Expired Goods Store', category: 'Food & Beverage', location: 'Chicago, IL', status: 'Denied' },
    { id: 76, name: 'No-Show Movers', category: 'Logistics', location: 'Dallas, TX', status: 'Denied' },
    { id: 77, name: 'Faulty Construction LLC', category: 'Construction', location: 'Phoenix, AZ', status: 'Denied' },
    { id: 78, name: 'Unethical Marketing', category: 'Marketing', location: 'Boston, MA', status: 'Denied' },
    { id: 79, name: 'Pirate Software Inc.', category: 'Software', location: 'San Francisco, CA', status: 'Denied' },
    { id: 80, name: 'Ghost Tours Co.', category: 'Tourism', location: 'New Orleans, LA', status: 'Denied' },
    { id: 81, name: 'Slippery Slope Sports', category: 'Sports', location: 'Denver, CO', status: 'Denied' },
    { id: 82, name: 'Obsolete Tech Revival', category: 'Technology', location: 'Raleigh, NC', status: 'Denied' },
    { id: 83, name: 'Unsafe Driving School', category: 'Education', location: 'Atlanta, GA', status: 'Denied' },
    { id: 84, name: 'Broken Promises Legal', category: 'Legal', location: 'Portland, OR', status: 'Denied' },
    { id: 85, name: 'Expired Licenses Agency', category: 'Licensing', location: 'Las Vegas, NV', status: 'Denied' },
  ];

  const mockDetailedBusinesses = {};

  // Populate mockDetailedBusinesses using the provided businessesList
  businessesList.forEach(business => {
    const { id, name, status, category, location } = business;

    // Generate dummy data for other fields
    const personalData = {
      fullName: `Applicant Name for ${name}`,
      username: `${name.replace(/\s/g, '').toLowerCase()}_user`,
      email: `${name.replace(/\s/g, '').toLowerCase()}@example.com`,
      dateOfBirth: `01/01/${1980 + (id % 20)}`,
      gender: id % 2 === 0 ? 'Male' : 'Female',
      ssn: `XXX-XX-${1000 + id}`,
      governmentId: 'Keya_Shah.pdf',
      residentialAddress: generateAddress(id),
    };

    const businessDetails = {
      categories: category,
      registeredBusinessName: `${name} Inc.`,
      dbaInfo: id % 2 === 0 ? `DBA ${name}` : 'N/A',
      tradeName: `Trade${name}`,
      dbaTradeDocuments: 'Keya_Shah.pdf',
      businessContact: {
        email: `contact@${name.replace(/\s/g, '').toLowerCase()}.com`,
        phone: `(555) 123-${1000 + id}`,
      },
      businessAddress: {
        isSameAsResidential: id % 3 === 0,
        addressLine1: `${id * 100} Commerce Dr`,
        addressLine2: id % 4 === 0 ? `Suite ${id}` : '',
        city: location.split(',')[0].trim(),
        state: location.split(',')[1]?.trim() || 'NY',
        country: 'United States',
        zipPostalCode: `9021${id % 10}`,
      },
      businessWebsite: `www.${name.replace(/\s/g, '').toLowerCase()}.com`,
      isRegisteredBusiness: 'Yes',
      employerIdNumber: `${10 + id}-${2000000 + id}`,
      manufacturerCountry: id % 2 === 0 ? 'United States' : 'Canada',
      brandLaunchYear: `${2000 + (id % 20)}`,
      socialMedia: `link_to_${name.replace(/\s/g, '_').toLowerCase()}_socials`,
    };

    const productDetails = {
      ingredientTransparencyDocument: 'Keya_Shah.pdf',
      packagingSustainabilityDocument: 'Keya_Shah.pdf',
      allowedEverywhere: 'Yes',
      restrictedCountries: id % 5 === 0 ? 'China, Russia' : 'N/A',
      brandPromotionalPlan: `Promotional plan for ${name}'s products.`,
      productDescription: `Detailed description of products offered by ${name}.`,
      productUniqueSellingPoint: `Unique selling point for ${name}: innovation and quality.`,
      productVideoPhoto: [
        'Keya_Shah.pdf',
        'Keya_Shah.pdf',
      ],
      complianceQAUpload: 'Keya_Shah.pdf',
    };

    mockDetailedBusinesses[id] = {
      id,
      name,
      status,
      personal: personalData,
      business: businessDetails,
      product: productDetails,
    };
  });


  useEffect(() => {
    // In a real application, you'd fetch this data from an API
    // For this example, we're using mock data
    const data = mockDetailedBusinesses[businessId];
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

  const handleVerify = () => {
    if (businessData) {
      updateBusinessStatus(businessData.id, 'Verified');
    }
  };

  const handleDeny = () => {
    if (businessData) {
      updateBusinessStatus(businessData.id, 'Denied');
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
            onClick={handleVerify}
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
            onClick={handleDeny}
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
                flexShrink: 0,
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