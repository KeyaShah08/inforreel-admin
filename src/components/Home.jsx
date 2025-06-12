// src/components/Home.jsx
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

// Enhanced Area Chart Component to match Figma design (moved here as it's directly used by Home)
const AreaChart = ({ data, chartId, title, tooltipText, highlightXValue, highlightValue, color, xKey, selectedPeriod, onPrevious, onNext, currentDate }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  // Function to get time duration text
  const getTimeDuration = () => {
    if (!currentDate || !data || data.length === 0) return ""; // Ensure data is available

    const formatMonth = d3.timeFormat("%b");
    const formatDay = d3.timeFormat("%b %d, %Y");
    const formatYear = d3.timeFormat("%Y");

    switch (selectedPeriod) {
      case "Daily":
        const firstDayData = data[0];
        const lastDayData = data[data.length - 1];
        if (firstDayData && lastDayData) {
          return `${formatDay(firstDayData.fullDate)} - ${formatDay(lastDayData.fullDate)}`;
        }
        return "";
      case "Weekly":
        const firstWeekData = data[0];
        const lastWeekData = data[data.length - 1];
        if (firstWeekData && lastWeekData) {
          return `${formatMonth(firstWeekData.fullDate)} ${firstWeekData.fullDate.getFullYear()} - ${formatMonth(lastWeekData.fullDate)} ${lastWeekData.fullDate.getFullYear()}`;
        }
        return "";
      case "Monthly":
        const firstMonthData = data[0];
        const lastMonthData = data[data.length - 1];
        if (firstMonthData && lastMonthData) {
          return `${formatMonth(firstMonthData.fullDate)} - ${formatMonth(lastMonthData.fullDate)} ${formatYear(lastMonthData.fullDate)}`;
        }
        return "";
      case "Yearly":
        const firstYearData = data[0];
        const lastYearData = data[data.length - 1];
        if (firstYearData && lastYearData) {
          return `${formatYear(firstYearData.fullDate)} - ${formatYear(lastYearData.fullDate)}`;
        }
        return "";
      default:
        return "";
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

          let tooltipContent = "";

          if (selectedPeriod === "Daily" && d.date) {
            tooltipContent = `
              <div style="font-weight: 600; margin-bottom: 4px;">${d.date}</div>
              <div style="color: ${color}; font-weight: 500;">${d3.format(",.0f")(d.value)}</div>
            `;
          } else {
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
          g.append("circle")
            .attr("cx", x(highlightData[xKey]))
            .attr("cy", y(highlightData.value))
            .attr("r", 8)
            .attr("fill", color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

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

          const bbox = tooltipText.node().getBBox();
          const tooltipX = x(highlightData[xKey]);
          const tooltipY = y(highlightData.value) - 25;

          tooltipBg
            .attr("x", tooltipX - bbox.width / 2 - 8)
            .attr("y", tooltipY - bbox.height / 2 - 6)
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
  }, [data, highlightXValue, highlightValue, color, xKey, chartId, selectedPeriod, currentDate]);

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

  // Navigation handlers for the charts
  const handlePreviousPeriod = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case "Daily":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() - (7 * 6));
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() - 12);
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() - 3);
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
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() + (7 * 6));
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() + 12);
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() + 3);
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
  );
}

export default Home;