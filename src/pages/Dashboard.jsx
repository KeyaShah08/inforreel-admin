import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

// Helper function to generate mock data for a given date range
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

// Enhanced Area Chart Component to match Figma design
const AreaChart = ({ data, chartId, title, tooltipText, highlightXValue, highlightValue, color, xKey, selectedPeriod, onPrevious, onNext, currentDate }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  // Function to get time duration text
  const getTimeDuration = () => {
    if (!currentDate) return "";

    const formatMonth = d3.timeFormat("%b");
    const formatDay = d3.timeFormat("%b %d, %Y");
    const formatYear = d3.timeFormat("%Y");

    switch (selectedPeriod) {
      case "Daily":
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - 6); // Go back 6 days to get the start of the week for display
        return `${formatDay(startOfWeek)} - ${formatDay(currentDate)}`;
      case "Weekly":
        const startOfWeeklyPeriod = new Date(currentDate);
        startOfWeeklyPeriod.setDate(currentDate.getDate() - (data.length * 7) + 7); // Approx. start of current week range
        return `${formatMonth(startOfWeeklyPeriod)} ${startOfWeeklyPeriod.getFullYear()} - ${formatMonth(currentDate)} ${currentDate.getFullYear()}`;
      case "Monthly":
        const startOfMonthPeriod = new Date(currentDate);
        startOfMonthPeriod.setMonth(currentDate.getMonth() - (data.length - 1)); // Go back to the first month in the data
        return `${formatMonth(startOfMonthPeriod)} - ${formatMonth(currentDate)} ${formatYear(currentDate)}`;
      case "Yearly":
        const startOfYearPeriod = new Date(currentDate);
        startOfYearPeriod.setFullYear(currentDate.getFullYear() - (data.length - 1));
        return `${formatYear(startOfYearPeriod)} - ${formatYear(currentDate)}`;
      default:
        return "Jan - Dec 2024";
    }
  };


  useEffect(() => {
    const drawChart = () => {
      // Clear previous chart
      d3.select(svgRef.current).selectAll("*").remove();

      const containerWidth = containerRef.current.offsetWidth;
      const margin = { top: 40, right: 30, bottom: 60, left: 80 };
      const width = containerWidth - margin.left - margin.right;
      const height = 320 - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create gradient definitions
      const defs = svg.append("defs");
      
      const gradient = defs.append("linearGradient")
        .attr("id", `gradient-${chartId}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", height);

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.3);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.05);

      // X scale
      const x = d3.scalePoint()
        .domain(data.map(d => d[xKey]))
        .range([0, width])
        .padding(0.1);

      // Y scale
      const yMax = d3.max(data, d => d.value);
      const y = d3.scaleLinear()
        .domain([0, yMax * 1.1])
        .range([height, 0]);

      // Create grid lines
      const yAxisGrid = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat("")
        .ticks(6);

      g.append("g")
        .attr("class", "grid")
        .call(yAxisGrid)
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.3)
        .style("stroke", "#e0e0e0");

      // Draw X axis
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style("font-size", "12px")
        .style("color", "#666");

      // Draw Y axis
      g.append("g")
        .call(d3.axisLeft(y)
          .ticks(6)
          .tickFormat(d => {
            if (d >= 1000000) return `${d / 1000000}M`;
            if (d >= 1000) return `${d / 1000}K`;
            return d;
          }))
        .style("font-size", "12px")
        .style("color", "#666");

      // Define the area
      const area = d3.area()
        .x(d => x(d[xKey]))
        .y0(height)
        .y1(d => y(d.value))
        .curve(d3.curveCardinal.tension(0.3)); // Smoother curve

      // Define the line
      const line = d3.line()
        .x(d => x(d[xKey]))
        .y(d => y(d.value))
        .curve(d3.curveCardinal.tension(0.3));

      // Draw the area
      g.append("path")
        .datum(data)
        .attr("fill", `url(#gradient-${chartId})`)
        .attr("d", area);

      // Draw the line
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2.5)
        .attr("d", line);

      // Add dots for each data point
      g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d[xKey]))
        .attr("cy", d => y(d.value))
        .attr("r", 4)
        .attr("fill", color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("opacity", 0.8)
        .on("mouseover", function(event, d) {
          d3.select(this)
            .attr("r", 6)
            .style("opacity", 1);
          
          // Simplified tooltip content - only show date for daily, only value for others
          let tooltipContent = "";
          
          if (selectedPeriod === "Daily" && d.date) {
            tooltipContent = `
              <div style="font-weight: 600; margin-bottom: 4px;">${d.date}</div>
              <div style="color: ${color}; font-weight: 500;">${d3.format(",.0f")(d.value)}</div>
            `;
          } else {
            // For Weekly, Monthly, and Yearly - only show the value
            tooltipContent = `
              <div style="color: ${color}; font-weight: 500;">${d3.format(",.0f")(d.value)}</div>
            `;
          }
          
          tooltip.style("opacity", 1)
            .html(tooltipContent)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 40) + "px");
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("r", 4)
            .style("opacity", 0.8);
          tooltip.style("opacity", 0);
        });

      // Enhanced tooltip styling
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "rgba(0, 0, 0, 0.85)")
        .style("color", "#fff")
        .style("padding", "12px 16px")
        .style("border-radius", "8px")
        .style("font-size", "13px")
        .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
        .style("pointer-events", "none")
        .style("backdrop-filter", "blur(10px)");

      // Highlight specific point with enhanced styling
      if (highlightXValue && highlightValue) {
        const highlightData = data.find(d => d[xKey] === highlightXValue);
        if (highlightData) {
          // Add highlight circle
          g.append("circle")
            .attr("cx", x(highlightData[xKey]))
            .attr("cy", y(highlightData.value))
            .attr("r", 8)
            .attr("fill", color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

          // Add highlight tooltip
          const highlightTooltip = g.append("g")
            .attr("class", "highlight-tooltip");

          const tooltipBg = highlightTooltip.append("rect")
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("fill", "rgba(0, 0, 0, 0.85)")
            .style("filter", "drop-shadow(0 2px 8px rgba(0,0,0,0.2))");

          const tooltipText = highlightTooltip.append("text")
            .attr("fill", "white")
            .attr("font-size", "12px")
            .attr("font-weight", "600")
            .attr("text-anchor", "middle")
            .text(`$${d3.format(",.0f")(highlightValue)}`);

          // Position tooltip
          const bbox = tooltipText.node().getBBox();
          const tooltipX = x(highlightData[xKey]);
          const tooltipY = y(highlightData.value) - 25;

          tooltipBg
            .attr("x", tooltipX - bbox.width/2 - 8)
            .attr("y", tooltipY - bbox.height/2 - 6)
            .attr("width", bbox.width + 16)
            .attr("height", bbox.height + 12);

          tooltipText
            .attr("x", tooltipX)
            .attr("y", tooltipY + 3);
        }
      }
    };

    drawChart();
    window.addEventListener('resize', drawChart);

    return () => {
      window.removeEventListener('resize', drawChart);
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [data, highlightXValue, highlightValue, color, xKey, chartId, selectedPeriod, currentDate]); // Added currentDate to dependencies

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        marginTop: "24px",
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", margin: 0, marginBottom: "4px" }}>
            {title}
          </h3>
          <div style={{ fontSize: "18px", fontWeight: "700", color: color }}>
            {tooltipText}
          </div>
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          gap: "8px",
          fontSize: "12px", 
          color: "#666", 
          fontWeight: "500",
          backgroundColor: "#f8f9fa",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #e9ecef"
        }}>
          <button 
            onClick={onPrevious} 
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontSize: "16px", 
              color: "#96105E",
              padding: "0 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &#9664; {/* Left arrow */}
          </button>
          {getTimeDuration()}
          <button 
            onClick={onNext} 
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontSize: "16px", 
              color: "#96105E",
              padding: "0 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            &#9654; {/* Right arrow */}
          </button>
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [currentDate, setCurrentDate] = useState(new Date("June 11, 2025")); // Start with a specific date

  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Business", icon: "🏢" },
    { name: "Ambassadors", icon: "👥" },
  ];

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
        // Default to monthly if no period selected (shouldn't happen with initial state)
        startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 11);
        return generateMockData(startDate, endDate, type, "Monthly");
    }
  };

  const getXKeyForPeriod = () => {
    switch (selectedPeriod) {
      case "Daily": return "day";
      case "Weekly": return "week";
      case "Monthly": return "month";
      case "Yearly": return "year";
      default: return "month";
    }
  };

  const getDynamicTooltipAndHighlight = (dataType) => {
    let tooltipVal = "$0";
    let highlightX = "";
    let highlightVal = 0;
    
    const currentData = getDataForPeriod(dataType);
    if (currentData && currentData.length > 0) {
      const lastDataPoint = currentData[currentData.length - 1];
      tooltipVal = `$${d3.format(",.0f")(lastDataPoint.value)}`;
      highlightX = lastDataPoint[getXKeyForPeriod()];
      highlightVal = lastDataPoint.value;
    }
    return { tooltipVal, highlightX, highlightVal };
  };

  // Function to calculate dynamic summary card values based on selected period and data
  const getSummaryCardData = () => {
    const salesData = getDataForPeriod("sales");
    const ambassadorData = getDataForPeriod("ambassador");
    
    // Calculate total sales
    const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);
    const totalAmbassadorSales = ambassadorData.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate dynamic values based on period and data
    let totalUsers, totalBrands, totalAmbassadors;
    
    switch (selectedPeriod) {
      case "Daily":
        totalUsers = Math.floor(totalSales / 150); // Approximate users based on sales
        totalBrands = Math.floor(salesData.length * 8); // 8 brands per day period
        totalAmbassadors = Math.floor(ambassadorData.length * 4); // 4 ambassadors per day
        break;
      case "Weekly":
        totalUsers = Math.floor(totalSales / 120);
        totalBrands = Math.floor(salesData.length * 12);
        totalAmbassadors = Math.floor(ambassadorData.length * 6);
        break;
      case "Monthly":
        totalUsers = Math.floor(totalSales / 100);
        totalBrands = Math.floor(salesData.length * 15);
        totalAmbassadors = Math.floor(ambassadorData.length * 8);
        break;
      case "Yearly":
        totalUsers = Math.floor(totalSales / 80);
        totalBrands = Math.floor(salesData.length * 25);
        totalAmbassadors = Math.floor(ambassadorData.length * 12);
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

  // Navigation handlers
  const handlePreviousPeriod = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case "Daily":
        newDate.setDate(newDate.getDate() - 7); // Go back 7 days
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() - (6 * 7)); // Go back 6 weeks
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() - 12); // Go back 12 months
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() - 3); // Go back 3 years
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case "Daily":
        newDate.setDate(newDate.getDate() + 7); // Go forward 7 days
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() + (6 * 7)); // Go forward 6 weeks
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() + 12); // Go forward 12 months
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() + 3); // Go forward 3 years
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  const salesInfo = getDynamicTooltipAndHighlight("sales");
  const ambassadorInfo = getDynamicTooltipAndHighlight("ambassador");
  const summaryCards = getSummaryCardData();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
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
                <span style={{ fontSize: "1.2em" }}>{item.icon}</span>
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
                // Reset to current date when changing period to avoid out-of-bounds data issues
                setCurrentDate(new Date()); 
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
        <div>
          <AreaChart
            data={getDataForPeriod("sales")}
            chartId="salesChart"
            title="Sales Metric - Brands"
            tooltipText={salesInfo.tooltipVal}
            highlightXValue={salesInfo.highlightX}
            highlightValue={salesInfo.highlightVal}
            color="#3B82F6"
            xKey={getXKeyForPeriod()}
            selectedPeriod={selectedPeriod}
            onPrevious={handlePreviousPeriod}
            onNext={handleNextPeriod}
            currentDate={currentDate}
          />
          <AreaChart
            data={getDataForPeriod("ambassador")}
            chartId="ambassadorChart"
            title="Sales Metric - Ambassador"
            tooltipText={ambassadorInfo.tooltipVal}
            highlightXValue={ambassadorInfo.highlightX}
            highlightValue={ambassadorInfo.highlightVal}
            color="#22C55E"
            xKey={getXKeyForPeriod()}
            selectedPeriod={selectedPeriod}
            onPrevious={handlePreviousPeriod}
            onNext={handleNextPeriod}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;