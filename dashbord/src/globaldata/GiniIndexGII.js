import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Title, PointElement, LinearScale } from "chart.js";

ChartJS.register(Tooltip, Title, PointElement, LinearScale);

const SocialIndexScatterPlot = ({ selectedContinent, selectedSocialIndex,selectedMetricDesaster }) => {
  const [chartData, setChartData] = useState({});
  const [indexLabel, setIndexLabel] = useState("");

  useEffect(() => {
    if (selectedContinent && selectedSocialIndex) {
      fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) =>
              item.CONTINENT === selectedContinent &&
              item[selectedSocialIndex] !== null &&
              item[selectedMetricDesaster] !== null
          );

          // Map filtered data to scatter data including country names
          const scatterData = filteredData.map((item) => ({
            x: item[selectedSocialIndex],
            y: item[selectedMetricDesaster],
            label: item.COUNTRY, // Add country name
          }));

          setChartData({
            datasets: [
              {
                label: `${selectedSocialIndex} vs Gender Inequality Index`,
                data: scatterData,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                pointRadius: 5,
              },
            ],
          });

          setIndexLabel(selectedSocialIndex);
        });
    }
  }, [selectedContinent, selectedSocialIndex]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: indexLabel,
        },
      },
      y: {
        title: {
          display: true,
              text: `${ selectedMetricDesaster }`,
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

export default SocialIndexScatterPlot;
