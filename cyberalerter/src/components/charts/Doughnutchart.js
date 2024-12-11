import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
  

const DoughnutChart = ({ doughnutChartData }) => {
      
      const chartData = {
        labels: doughnutChartData.map((item) => item.product),
        datasets: [
          {
            data: doughnutChartData.map((item) => item.count),
            backgroundColor: [
              '#FFB6C1', '#87CEEB', '#FFD700', '#98FB98', '#FF9A8B', '#00BFFF',
              '#F0E68C', '#90EE90', '#D8BFD8', '#FF6347'
            ],
            borderColor:  [
              '#FF69B4', '#4682B4', '#FFA500', '#00FA9A', '#FF4500', '#008080',
              '#B8860B', '#2F4F4F', '#6A5ACD', '#B22222'
            ],
            borderWidth: 1,
          },
        ],
      };
      
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right', // Moves the legend to the right
            labels: {
              usePointStyle: true, // Optional: use circular points instead of squares
              padding: 10, // Add spacing between legend items
            },
          },
        },
      };
      
      

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
