// src/components/ChartsSection.jsx
import * as d3 from "d3";
import { useEffect, useRef } from "react";

// Helper function to generate mock data based on specified granularity and type
const generateMockData = (startDate, endDate, type, granularity) => {
  const data = [];
  let current = new Date(startDate);
  let id = 0;

  while (current <= endDate) {
    let value;
    let label;
    let fullDate = new Date(current); // Store the actual date for full context

    // Adjust value generation based on 'type' (sales or ambassadors) and granularity
    if (granularity === "hourly4") { // For Daily section: 4-hourly data (6 points for 24 hours)
      value = type === "sales" ? Math.floor(Math.random() * 200) + 100 : Math.floor(Math.random() * 50) + 20;
      label = d3.timeFormat("%H:00")(current); // e.g., "00:00", "04:00"
      data.push({ id: id++, hour: label, value, fullDate });
      current.setHours(current.getHours() + 4); // Move to next 4-hour interval
    } else if (granularity === "daily") { // For Weekly section: Daily data (7 points for a week)
      value = type === "sales" ? Math.floor(Math.random() * 800) + 700 : Math.floor(Math.random() * 150) + 250;
      label = d3.timeFormat("%a")(current); // e.g., "Mon", "Tue"
      data.push({ id: id++, day: label, value, fullDate });
      current.setDate(current.getDate() + 1); // Move to next day
    } else if (granularity === "weekly") { // For Monthly section: Weekly data (4 points for 4 weeks)
      value = type === "sales" ? Math.floor(Math.random() * 2000) + 6000 : Math.floor(Math.random() * 500) + 1800;
      // Using week start date for label for better context
      label = `Week of ${d3.timeFormat("%b %d")(current)}`;
      data.push({ id: id++, week: label, value, fullDate });
      current.setDate(current.getDate() + 7); // Move to next week
    } else if (granularity === "monthly") { // For Yearly section: Monthly data (12 points for a year)
      value = type === "sales" ? Math.floor(Math.random() * 10000) + 30000 : Math.floor(Math.random() * 3000) + 10000;
      label = d3.timeFormat("%b")(current); // e.g., "Jan", "Feb"
      data.push({ id: id++, month: label, value, fullDate });
      current.setMonth(current.getMonth() + 1); // Move to next month
    }
  }
  return data;
};

function ChartsSection({ selectedPeriod, currentDate, setCurrentDate }) {
  // Refs for the Sales Metric - Brands chart
  const svgRefSales = useRef();
  const containerRefSales = useRef();

  // Refs for the Sales Metric - Ambassadors chart
  const svgRefAmbassadors = useRef();
  const containerRefAmbassadors = useRef();


  // Function to get the data for the selected period relative to currentDate
  const getDataForPeriod = (type) => {
    let startDate;
    let endDate = new Date(currentDate); // Always use currentDate as reference for end of range

    switch (selectedPeriod) {
      case "Daily":
        // Total one day's data, every 4 hours (6 points)
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0); // Start of the current day
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999); // End of the current day
        return generateMockData(startDate, endDate, type, "hourly4");
      case "Weekly":
        // Monday to Sunday data (7 points)
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7); // Go back to Monday
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6); // Go to Sunday
        endDate.setHours(23, 59, 59, 999);
        return generateMockData(startDate, endDate, type, "daily");
      case "Monthly":
        // 4 weeks of data (4 points)
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 4 * 7); // Go back 4 full weeks
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999); // Ensure end of current day is included
        return generateMockData(startDate, endDate, type, "weekly");
      case "Yearly":
        // Jan to December data (12 points)
        startDate = new Date(currentDate.getFullYear(), 0, 1); // January 1st of current year
        endDate = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999); // December 31st of current year
        return generateMockData(startDate, endDate, type, "monthly");
      default:
        // Default to last 12 months data
        startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() - 11);
        startDate.setDate(1); // Start of the month
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return generateMockData(startDate, endDate, type, "monthly");
    }
  };

  // Determines which field from the data object should be used for the X-axis label
  const getXKeyForPeriod = () => {
    switch (selectedPeriod) {
      case "Daily": return "hour";
      case "Weekly": return "day";
      case "Monthly": return "week";
      case "Yearly": return "month";
      default: return "month";
    }
  };

  // Logic for Previous/Next period navigation
  const onPrevious = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case "Daily":
        newDate.setDate(newDate.getDate() - 1); // Move back 1 day
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() - 7); // Move back 1 week
        break;
      case "Monthly":
        newDate.setDate(newDate.getDate() - 4 * 7); // Move back 4 weeks
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() - 1); // Move back 1 year
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  const onNext = () => {
    const newDate = new Date(currentDate);
    switch (selectedPeriod) {
      case "Daily":
        newDate.setDate(newDate.getDate() + 1); // Move forward 1 day
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() + 7); // Move forward 1 week
        break;
      case "Monthly":
        newDate.setDate(newDate.getDate() + 4 * 7); // Move forward 4 weeks
        break;
      case "Yearly":
        newDate.setFullYear(newDate.getFullYear() + 1); // Move forward 1 year
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  // Get data for both charts
  const salesData = getDataForPeriod("sales");
  const ambassadorData = getDataForPeriod("ambassadors"); // Using 'ambassadors' type
  const xKey = getXKeyForPeriod();
  const salesChartColor = "#3B82F6"; // Blue color for sales
  const ambassadorChartColor = "#EF4444"; // Red color for ambassadors

  // Local helper function to render a single chart
  const renderChart = (svgRef, containerRef, data, chartColor, chartTitle) => {
    if (!data || data.length === 0) {
      d3.select(svgRef.current).selectAll("*").remove();
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // Clear previous chart elements
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scalePoint()
      .domain(data.map(d => d[xKey]))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1])
      .range([height, 0]);

    // Create gradient definition
    const defs = svg.append("defs");
    // Use a dynamic ID for the gradient based on the chart title to ensure uniqueness
    const gradientId = `area-chart-gradient-${chartTitle.replace(/\s+/g, '-')}`;
    const gradient = defs.append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", height);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", chartColor)
      .attr("stop-opacity", 0.3);
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", chartColor)
      .attr("stop-opacity", 0.05);

    // Draw X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "11px")
      .style("color", "#666");

    // Draw Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => {
        if (d >= 1000000) return `${d / 1000000}M`;
        if (d >= 1000) return `${d / 1000}K`;
        return d;
      }))
      .selectAll("text")
      .style("font-size", "11px")
      .style("color", "#666");

    // Draw grid lines
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat("")
        .ticks(5))
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3)
      .style("stroke", "#e0e0e0");

    // Define the area
    const area = d3.area()
      .x(d => x(d[xKey]))
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveCardinal.tension(0.3));

    // Define the line
    const line = d3.line()
      .x(d => x(d[xKey]))
      .y(d => y(d.value))
      .curve(d3.curveCardinal.tension(0.3));

    // Draw the area path
    g.append("path")
      .datum(data)
      .attr("fill", `url(#${gradientId})`)
      .attr("d", area);

    // Draw the line path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", chartColor)
      .attr("stroke-width", 2);

    // Add dots for each data point for interactivity
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d[xKey]))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .attr("fill", chartColor)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        const tooltip = d3.select("body").append("div")
          .attr("class", "chart-tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "rgba(0, 0, 0, 0.8)")
          .style("color", "#fff")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none");

        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`
            ${d[xKey]}<br/>
            Value: ${d3.format(",.0f")(d.value)}
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");

        d3.select(this).attr("r", 6);
      })
      .on("mouseout", function() {
        d3.select(".chart-tooltip").remove();
        d3.select(this).attr("r", 4);
      });

      // Cleanup function for useEffect to remove tooltips when component unmounts
      return () => {
        d3.select("body").selectAll(".chart-tooltip").remove();
      };
  };

  // Effect hook to render the Sales Metric - Brands chart
  useEffect(() => {
    const cleanup = renderChart(
      svgRefSales,
      containerRefSales,
      salesData,
      salesChartColor,
      "Sales Metric - Brands"
    );
    return cleanup;
  }, [salesData, xKey, salesChartColor]); // Depend on salesData, xKey, and its specific color

  // Effect hook to render the Sales Metric - Ambassadors chart
  useEffect(() => {
    const cleanup = renderChart(
      svgRefAmbassadors,
      containerRefAmbassadors,
      ambassadorData,
      ambassadorChartColor,
      "Sales Metric - Ambassadors"
    );
    return cleanup;
  }, [ambassadorData, xKey, ambassadorChartColor]); // Depend on ambassadorData, xKey, and its specific color


  // Determine the display label for the current period (e.g., "June 2025" for monthly)
  const getPeriodLabel = () => {
    if (!salesData || salesData.length === 0) return "No Data"; // Use salesData for consistency

    const firstDate = salesData[0]?.fullDate;
    const lastDate = salesData[salesData.length - 1]?.fullDate;

    if (!firstDate || !lastDate) return "Invalid Date Range";

    switch (selectedPeriod) {
      case "Daily":
        return d3.timeFormat("%b %d, %Y")(firstDate); // e.g., "Jun 16, 2025"
      case "Weekly":
        return `${d3.timeFormat("%b %d")(firstDate)} - ${d3.timeFormat("%b %d, %Y")(lastDate)}`; // e.g., "Jun 10 - Jun 16, 2025"
      case "Monthly": // 4 weeks of data
        return `${d3.timeFormat("%b %d, %Y")(firstDate)} - ${d3.timeFormat("%b %d, %Y")(lastDate)}`; // e.g., "May 19, 2025 - Jun 16, 2025"
      case "Yearly": // Jan to Dec
        return d3.timeFormat("%Y")(firstDate); // e.g., "2025"
      default:
        return "";
    }
  };


  return (
    <div>
      {/* Navigation for both charts - placed above both charts */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: "15px", gap: '15px' }}>
          <button
            onClick={onPrevious}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#555',
              fontWeight: '500'
            }}
          >
            &lt; {/* Left arrow */}
          </button>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
            {getPeriodLabel()}
          </span>
          <button
            onClick={onNext}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#555',
              fontWeight: '500'
            }}
          >
            &gt; {/* Right arrow */}
          </button>
      </div>

      {/* Sales Metric - Brands Chart Container */}
      <div
        ref={containerRefSales}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          marginTop: "24px",
          border: "1px solid #f0f0f0",
          position: "relative",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", margin: "0 0 15px 0" }}>
          Sales Metric - Brands
        </h3>
        <svg ref={svgRefSales}></svg>
      </div>

      {/* Sales Metric - Ambassadors Chart Container */}
      <div
        ref={containerRefAmbassadors}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          marginTop: "24px", // Added margin-top to separate multiple charts
          border: "1px solid #f0f0f0",
          position: "relative",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", margin: "0 0 15px 0" }}>
          Sales Metric - Ambassadors
        </h3>
        <svg ref={svgRefAmbassadors}></svg>
      </div>
    </div>
  );
}

export default ChartsSection;