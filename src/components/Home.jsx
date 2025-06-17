// src/components/Home.jsx
import * as d3 from "d3"; // d3 is still needed for formatting in Home.jsx for summary cards
import { useState } from "react";
import ChartsSection from "./ChartsSection"; // Import the new ChartsSection component

// Helper function to generate mock data for a given date range (this remains here for summary cards)
const generateMockData = (startDate, endDate, type, period) => {
  const data = [];
  let currentDate = new Date(startDate);
  let id = 0;

  while (currentDate <= endDate) {
    let value;
    let label;
    let dateLabel; // For daily periods, to display full date

    if (period === "Daily") {
      value = type === "sales" ? Math.floor(Math.random() * 800) + 700 : Math.floor(Math.random() * 150) + 250;
      label = d3.timeFormat("%a")(currentDate); // Day of the week (Mon, Tue, etc.)
      dateLabel = d3.timeFormat("%B %d, %Y")(currentDate); // Full date (June 5, 2025)
      data.push({ id: id++, day: label, value, date: dateLabel, fullDate: new Date(currentDate) });
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (period === "Weekly") {
      value = type === "sales" ? Math.floor(Math.random() * 2000) + 6000 : Math.floor(Math.random() * 500) + 1800;
      label = `Wk${data.length + 1}`;
      data.push({ id: id++, week: label, value, fullDate: new Date(currentDate) });
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (period === "Monthly") {
      value = type === "sales" ? Math.floor(Math.random() * 10000) + 30000 : Math.floor(Math.random() * 3000) + 10000;
      label = d3.timeFormat("%b")(currentDate); // Abbreviated month (Jan, Feb, etc.)
      data.push({ id: id++, month: label, value, fullDate: new Date(currentDate) });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (period === "Yearly") {
      value = type === "sales" ? Math.floor(Math.random() * 100000) + 400000 : Math.floor(Math.random() * 20000) + 100000;
      label = currentDate.getFullYear().toString();
      data.push({ id: id++, year: label, value, fullDate: new Date(currentDate) });
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
  }
  return data;
};

function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [currentDate, setCurrentDate] = useState(new Date("June 11, 2025")); // Start with a specific date for consistent mock data

  // Function to get the data for the selected period relative to currentDate
  const getDataForPeriod = (type) => {
    let startDate;
    let endDate = new Date(currentDate);

    switch (selectedPeriod) {
      case "Daily":
        startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6); // Last 7 days including currentDate
        return generateMockData(startDate, endDate, type, "Daily");
      case "Weekly":
        startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - (6 * 7)); // Last 6 weeks including current week
        return generateMockData(startDate, endDate, type, "Weekly");
      case "Monthly":
        startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 11); // Last 12 months including current month
        return generateMockData(startDate, endDate, type, "Monthly");
      case "Yearly":
        startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 2); // Last 3 years including current year
        return generateMockData(startDate, endDate, type, "Yearly");
      default:
        startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 11);
        return generateMockData(startDate, endDate, type, "Monthly");
    }
  };

  // Function to calculate dynamic summary card values based on selected period and data
  const getSummaryCardData = () => {
    const salesData = getDataForPeriod("sales");
    const ambassadorData = getDataForPeriod("ambassador");

    const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);
    // const totalAmbassadorSales = ambassadorData.reduce((sum, item) => sum + item.value, 0); // Not directly used in cards

    let totalUsers, totalBrands, totalAmbassadors;

    switch (selectedPeriod) {
      case "Daily":
        totalUsers = Math.floor(totalSales / 150) + Math.floor(Math.random() * 50);
        totalBrands = Math.floor(salesData.length * 8) + Math.floor(Math.random() * 5);
        totalAmbassadors = Math.floor(ambassadorData.length * 4) + Math.floor(Math.random() * 2);
        break;
      case "Weekly":
        totalUsers = Math.floor(totalSales / 120) + Math.floor(Math.random() * 200);
        totalBrands = Math.floor(salesData.length * 12) + Math.floor(Math.random() * 10);
        totalAmbassadors = Math.floor(ambassadorData.length * 6) + Math.floor(Math.random() * 5);
        break;
      case "Monthly":
        totalUsers = Math.floor(totalSales / 100) + Math.floor(Math.random() * 1000);
        totalBrands = Math.floor(salesData.length * 15) + Math.floor(Math.random() * 20);
        totalAmbassadors = Math.floor(ambassadorData.length * 8) + Math.floor(Math.random() * 10);
        break;
      case "Yearly":
        totalUsers = Math.floor(totalSales / 80) + Math.floor(Math.random() * 5000);
        totalBrands = Math.floor(salesData.length * 25) + Math.floor(Math.random() * 50);
        totalAmbassadors = Math.floor(ambassadorData.length * 12) + Math.floor(Math.random() * 20);
        break;
      default:
        totalUsers = Math.floor(totalSales / 100);
        totalBrands = Math.floor(salesData.length * 15);
        totalAmbassadors = Math.floor(ambassadorData.length * 8);
    }

    return [
      { label: "Total Users", value: totalUsers.toLocaleString() },
      { label: "Total Brands", value: totalBrands.toLocaleString() },
      { label: "Total Ambassadors", value: totalAmbassadors.toLocaleString() },
      { label: "Total Sales", value: `$${totalSales.toLocaleString()}` },
    ];
  };

  const summaryCards = getSummaryCardData();

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "30px",
        display: "flex",
        flexDirection: "column",
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
        Home
      </h1>

      {/* Period Selection Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
          <button
            key={period}
            onClick={() => {
              setSelectedPeriod(period);
              setCurrentDate(new Date()); // Reset to current date when changing period
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "1px solid #ddd",
              backgroundColor: selectedPeriod === period ? "#96105E" : "#fff",
              color: selectedPeriod === period ? "#fff" : "#555",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s ease",
              boxShadow: selectedPeriod === period ? "0 2px 8px rgba(150,16,94,0.2)" : "none",
            }}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Dynamic Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {summaryCards.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              border: "1px solid #f0f0f0",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666", fontWeight: "500" }}>
              {card.label}
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <ChartsSection
        selectedPeriod={selectedPeriod}
        currentDate={currentDate}
        setSelectedPeriod={setSelectedPeriod}
        setCurrentDate={setCurrentDate}
      />
    </div>
  );
}

export default Home;