import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Title, PointElement, LineElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(Tooltip, Title, PointElement, LineElement, LinearScale, CategoryScale);

// Helper function to calculate linear regression
const calculateLinearRegression = (data) => {
  const n = data.length;
  const sumX = data.reduce((acc, point) => acc + point.x, 0);
  const sumY = data.reduce((acc, point) => acc + point.y, 0);
  const sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
  const sumX2 = data.reduce((acc, point) => acc + point.x * point.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

const MetricDesaster = ({ selectedContinent, selectedMetricDesaster }) => {
  const [chartData, setChartData] = useState({});
  const [indexLabel, setIndexLabel] = useState("");

  useEffect(() => {
    if (selectedContinent && selectedMetricDesaster) {
      fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) =>
              item.CONTINENT === selectedContinent &&
              item[selectedMetricDesaster] !== null &&
              item["Gender Inequality Index"] !== null
          );

          const scatterData = filteredData.map((item) => ({
            x: item[selectedMetricDesaster],
            y: item["Gender Inequality Index"],
            label: item.COUNTRY, // Add country name
          }));

          // Calculate linear regression
          const { slope, intercept } = calculateLinearRegression(scatterData);

          // Define two points for the regression line based on min/max x-values
          const minX = Math.min(...scatterData.map((point) => point.x));
          const maxX = Math.max(...scatterData.map((point) => point.x));

          const regressionLineData = [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept },
          ];

          setChartData({
            datasets: [
              {
                label: `${selectedMetricDesaster} vs Gender Inequality Index`,
                data: scatterData,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                pointRadius: 5,
              },
              {
                label: "Regression Line",
                data: regressionLineData,
                type: "line", // Plot as a line
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
                pointRadius: 0, // No points for the regression line
              },
            ],
          });

          setIndexLabel(selectedMetricDesaster);
        });
    }
  }, [selectedContinent, selectedMetricDesaster]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: indexLabel,
        },
        type: 'linear', // Ensure X-axis is linear for continuous data
      },
      y: {
        title: {
          display: true,
          text: "Gender Inequality Index",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          // Display the country name in the tooltip
          title: (tooltipItems) => {
            return tooltipItems[0].raw.label; // Access the label (country name)
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 w-full h-96">
      {chartData?.datasets ? (
        <Scatter data={chartData} options={options} />
      ) : (
        <p className="text-gray-500">Select a social index to display the plot.</p>
      )}
    </div>
  );
};

export default MetricDesaster;
