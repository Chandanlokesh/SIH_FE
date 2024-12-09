import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  console.log("[bc] data", data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Vulnerabilities by Severity' },
    },
    scales: {
      x: {
        grid: { display: false }, // Remove vertical grid lines
      },
      y: { beginAtZero: true },
    },
    barPercentage: 0.5, // Controls individual bar width
    categoryPercentage: 0.6, // Controls spacing between bars
  };
  
  const chartData = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Vulnerabilities',
        data: [data.Low, data.Medium, data.High, data.Critical],
        backgroundColor: [
          'rgba(107, 190, 122, 0.7)', // Light green (Moss)
          'rgba(255, 221, 51, 0.7)', // Yellow
          'rgba(255, 165, 0, 0.7)', // Orange
          'rgba(255, 99, 71, 0.7)', // Red
        ],
        borderColor: [
          'rgba(107, 190, 122, 1)', // Light green (Moss)
          'rgba(255, 221, 51, 1)', // Yellow
          'rgba(255, 165, 0, 1)', // Orange
          'rgba(255, 99, 71, 1)', // Red
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
