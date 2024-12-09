import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const LineChart = ({ data }) => {

    const lineChartData = [
        { date: "2024-12-01", count: 12 },
        { date: "2024-12-02", count: 15 },
        { date: "2024-12-03", count: 8 },
        { date: "2024-12-04", count: 20 },
        { date: "2024-12-05", count: 18 },
      ];

      
      const chartData = {
        labels: lineChartData.map((item) => item.date),
        datasets: [
          {
            label: 'Vulnerabilities',
            data: lineChartData.map((item) => item.count),
            borderColor: 'rgba(25, 86, 194, 1)', // Dark blue for the line
            backgroundColor: 'rgba(25, 86, 194, 0.8)', // Light blue for the area below the line
            tension: 0, // Straight lines
            fill: true, // Ensures area below line is filled
          },
        ],
      };
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: true }, // Show vertical gridlines
          },
          y: {
            beginAtZero: true,
          },
        },
      };
      
      
  return <Line data={chartData} options={options} />;
};

export default LineChart;
