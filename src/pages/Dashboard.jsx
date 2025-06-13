import * as d3 from "d3"; // Import D3.js for charting
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
// Mock Data for different periods
// NOTE: For a real application, you would fetch actual daily, weekly, monthly, and yearly data.
// This data is simulated to demonstrate the period switching functionality.

// Monthly Data (as provided previously)
const monthlySalesData = [
  { month: "Jan", value: 30000 }, { month: "Feb", value: 32000 }, { month: "Mar", value: 28000 },
  { month: "Apr", value: 35000 }, { month: "May", value: 40000 }, { month: "Jun", value: 38000 },
  { month: "Jul", value: 45000 }, { month: "Aug", value: 50000 }, { month: "Sep", value: 48000 },
  { month: "Oct", value: 55000 }, { month: "Nov", value: 52000 }, { month: "Dec", value: 58000 },
];
const monthlyAmbassadorData = [
  { month: "Jan", value: 10000 }, { month: "Feb", value: 12000 }, { month: "Mar", value: 11000 },
  { month: "Apr", value: 15000 }, { month: "May", value: 13000 }, { month: "Jun", value: 16000 },
  { month: "Jul", value: 18000 }, { month: "Aug", value: 17000 }, { month: "Sep", value: 20000 },
  { month: "Oct", value: 19000 }, { month: "Nov", value: 22000 }, { month: "Dec", value: 21000 },
];

// Daily Data (mock for one week)
const dailySalesData = [
  { day: "Mon", value: 1000 }, { day: "Tue", value: 1200 }, { day: "Wed", value: 1100 },
  { day: "Thu", value: 1500 }, { day: "Fri", value: 1300 }, { day: "Sat", value: 1600 },
  { day: "Sun", value: 1400 },
];
const dailyAmbassadorData = [
  { day: "Mon", value: 300 }, { day: "Tue", value: 350 }, { day: "Wed", value: 320 },
  { day: "Thu", value: 400 }, { day: "Fri", value: 380 }, { day: "Sat", value: 420 },
  { day: "Sun", value: 390 },
];

// Weekly Data (mock for a few weeks)
const weeklySalesData = [
  { week: "Wk1", value: 7000 }, { week: "Wk2", value: 7500 }, { week: "Wk3", value: 6800 },
  { week: "Wk4", value: 8200 }, { week: "Wk5", value: 7900 }, { week: "Wk6", value: 8500 },
];
const weeklyAmbassadorData = [
  { week: "Wk1", value: 2000 }, { week: "Wk2", value: 2100 }, { week: "Wk3", value: 1900 },
  { week: "Wk4", value: 2300 }, { week: "Wk5", value: 2200 }, { week: "Wk6", value: 2400 },
];

// Yearly Data (mock for a few years)
const yearlySalesData = [
  { year: "2022", value: 400000 }, { year: "2023", value: 450000 }, { year: "2024", value: 500000 },
];
const yearlyAmbassadorData = [
  { year: "2022", value: 100000 }, { year: "2023", value: 110000 }, { year: "2024", value: 120000 },
];


// Reusable Line Chart Component
const LineChart = ({ data, chartId, title, tooltipText, highlightXValue, highlightValue, color, xKey }) => {
  const svgRef = useRef();
  const containerRef = useRef(); // Ref for the parent div to get responsive width

  useEffect(() => {
    const drawChart = () => {
      // Clear previous chart
      d3.select(svgRef.current).selectAll("*").remove();

      const containerWidth = containerRef.current.offsetWidth;
      const margin = { top: 20, right: 30, bottom: 40, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X scale
      const x = d3.scalePoint()
        .domain(data.map(d => d[xKey])) // Use dynamic xKey
        .range([0, width])
        .padding(0.5);

      // Y scale
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) + 10000]) // Add some padding to the max value
        .range([height, 0]);

      // Draw X axis
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Draw Y axis
      svg.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s"))); // Format Y-axis ticks

      // Draw the line
      const line = d3.line()
        .x(d => x(d[xKey])) // Use dynamic xKey
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX); // Smooth line

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add dots for each data point
      svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d[xKey])) // Use dynamic xKey
        .attr("cy", d => y(d.value))
        .attr("r", 4)
        .attr("fill", color)
        .on("mouseover", function(event, d) {
          d3.select(this).attr("r", 6); // Enlarge dot on hover
          tooltip.style("opacity", 1)
                 .html(`${d[xKey]}: ${d3.format(",.0f")(d.value)}`) // Use dynamic xKey
                 .style("left", (event.pageX + 10) + "px")
                 .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 4); // Revert dot size
          tooltip.style("opacity", 0);
        });

      // Tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "#fff")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none");

      // Highlight specific x-value and value if provided
      if (highlightXValue && highlightValue) {
        const highlightDotData = data.find(d => d[xKey] === highlightXValue); // Use dynamic xKey
        if (highlightDotData) {
          svg.append("circle")
            .attr("cx", x(highlightDotData[xKey])) // Use dynamic xKey
            .attr("cy", y(highlightDotData.value))
            .attr("r", 6)
            .attr("fill", "#96105E"); // Highlight color

          // Add a rectangle and text for the highlighted value
          const textValue = d3.format(",.0f")(highlightValue);
          const textX = x(highlightDotData[xKey]); // Use dynamic xKey
          const textY = y(highlightDotData.value) - 15; // Position above the dot

          // Measure text width for background rectangle
          const tempText = svg.append("text")
            .attr("x", textX)
            .attr("y", textY)
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .text(textValue)
            .node(); // Get the DOM node for measurement
          
          const textWidth = tempText.getBBox().width;
          const textHeight = tempText.getBBox().height;

          // Remove temp text
          d3.select(tempText).remove();

          // Add a background rectangle for the text
          svg.append("rect")
            .attr("x", textX - textWidth / 2 - 5) // Center the rectangle
            .attr("y", textY - textHeight + 2) // Position above text
            .attr("width", textWidth + 10)
            .attr("height", textHeight + 4)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "#96105E"); // Background color for highlight text

          // Add the actual text
          svg.append("text")
            .attr("x", textX)
            .attr("y", textY)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .text(textValue);
        }
      }
    };

    drawChart();
    window.addEventListener('resize', drawChart); // Redraw on resize

    // Cleanup function
    return () => {
      window.removeEventListener('resize', drawChart);
      d3.select("body").selectAll(".tooltip").remove(); // Remove tooltips on unmount
    };
  }, [data, highlightXValue, highlightValue, color, xKey]); // Redraw when data or highlight changes

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        marginTop: "24px",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "16px",
        }}
      >
        {title} <span style={{ color: "#96105E", fontWeight: "bold" }}>{tooltipText}</span>
      </h3>
      <svg ref={svgRef}></svg>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly"); // State for active period (Daily, Weekly, Monthly, Yearly)

  const menuItems = [
    { name: "Home", icon: "🏠", path: "/" },
    { name: "Business", icon: "🏢", path: "/business" },
    { name: "Ambassadors", icon: "👥", path: "/ambassadors" },
  ];
  
  // Update this function to properly sync with current route
  useEffect(() => {
    const currentMenuItem = () => {
      switch(location.pathname) {
        case '/': return 'Home';
        case '/business': return 'Business';
        case '/ambassadors': return 'Ambassadors';
        default: return 'Home';
      }
    };
    setActiveMenuItem(currentMenuItem());
  }, [location.pathname]);
  
  const handleMenuClick = (item) => {
    setActiveMenuItem(item.name);
    navigate(item.path);
  };
  // Function to get data based on selected period
  const getDataForPeriod = (type) => {
    switch (selectedPeriod) {
      case "Daily":
        return type === "sales" ? dailySalesData : dailyAmbassadorData;
      case "Weekly":
        return type === "sales" ? weeklySalesData : weeklyAmbassadorData;
      case "Monthly":
        return type === "sales" ? monthlySalesData : monthlyAmbassadorData;
      case "Yearly":
        return type === "sales" ? yearlySalesData : yearlyAmbassadorData;
      default:
        return type === "sales" ? monthlySalesData : monthlyAmbassadorData;
    }
  };

  // Function to get the key for the X-axis based on the selected period
  const getXKeyForPeriod = () => {
    switch (selectedPeriod) {
      case "Daily": return "day";
      case "Weekly": return "week";
      case "Monthly": return "month";
      case "Yearly": return "year";
      default: return "month";
    }
  };

  // Determine dynamic tooltip text and highlight values based on selected period and data
  const getDynamicTooltipAndHighlight = (dataType) => {
    let tooltipVal = "$0";
    let highlightX = "";
    let highlightVal = 0;
    
    const currentData = getDataForPeriod(dataType);
    if (currentData && currentData.length > 0) {
      // For demonstration, let's pick the last data point for tooltip and highlight
      const lastDataPoint = currentData[currentData.length - 1];
      tooltipVal = `$${d3.format(",.0f")(lastDataPoint.value)}`;
      highlightX = lastDataPoint[getXKeyForPeriod()];
      highlightVal = lastDataPoint.value;
    }
    return { tooltipVal, highlightX, highlightVal };
  };

  const salesInfo = getDynamicTooltipAndHighlight("sales");
  const ambassadorInfo = getDynamicTooltipAndHighlight("ambassador");


  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // Set fixed height to fill viewport
        width: "100%",
        backgroundColor: "#f8f8f8",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden", // Hide overall overflow, letting internal components manage scrolling
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px", // Fixed width for the sidebar
          backgroundColor: "#fff",
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Pushes logout to bottom
          flexShrink: 0, // Prevent sidebar from shrinking
          height: "100%", // Sidebar takes full height of its flex parent
          overflowY: "auto", // Allow sidebar to scroll independently if content overflows
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
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
                  backgroundColor:
                    activeMenuItem === item.name ? "#f0f0f0" : "transparent",
                  color: activeMenuItem === item.name ? "#96105E" : "#555",
                  fontWeight: activeMenuItem === item.name ? "600" : "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
                onClick={() => handleMenuClick(item)}
              >
                <span style={{ fontSize: "1.2em" }}>{item.icon}</span>{" "}
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
            <span style={{ fontSize: "1.2em" }}>🚪</span> Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1, // Takes up remaining horizontal space
          padding: "30px", // Padding around the content
          display: "flex", // Enable flexbox for vertical stacking of content
          flexDirection: "column", // Stack items vertically
          height: "100%", // Critical: Make this div fill the height of its flex parent
          overflowY: "auto", // Enable vertical scrolling for content within this div
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Home
        </h1>

        {/* Daily/Weekly/Monthly/Yearly buttons */}
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
              onClick={() => setSelectedPeriod(period)} // Update selected period
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                backgroundColor: selectedPeriod === period ? "#96105E" : "#fff", // Highlight active button
                color: selectedPeriod === period ? "#fff" : "#555",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background-color 0.2s, color 0.2s",
              }}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive grid
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            { label: "Total User", value: "100" },
            { label: "Total Brands", value: "150" },
            { label: "Total Ambassadors", value: "60" },
            { label: "Total Sales", value: "$150,000" },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "15px", color: "#666" }}>
                {card.label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "#333" }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div>
          <LineChart
            data={getDataForPeriod("sales")}
            chartId="salesChart"
            title="Sales Metric - Brands"
            tooltipText={salesInfo.tooltipVal} // Dynamic tooltip
            highlightXValue={salesInfo.highlightX} // Dynamic highlight x-value
            highlightValue={salesInfo.highlightVal} // Dynamic highlight value
            color="#3B82F6" // Blue color for sales graph
            xKey={getXKeyForPeriod()} // Pass dynamic xKey
          />
          <LineChart
            data={getDataForPeriod("ambassador")}
            chartId="ambassadorChart"
            title="Sales Metric - Ambassador"
            tooltipText={ambassadorInfo.tooltipVal} // Dynamic tooltip
            highlightXValue={ambassadorInfo.highlightX} // Dynamic highlight x-value
            highlightValue={ambassadorInfo.highlightVal} // Dynamic highlight value
            color="#22C55E" // Green color for ambassador graph
            xKey={getXKeyForPeriod()} // Pass dynamic xKey
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
