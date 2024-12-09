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
  

const DoughnutChart = ({ data }) => {

    const doughnutChartData = [
        { product: "Product A", count: 30 },
        { product: "Product B", count: 45 },
        { product: "Product C", count: 25 },
        { product: "Product D", count: 10 },
      ];
      

      const chartData = {
        labels: doughnutChartData.map((item) => item.product),
        datasets: [
          {
            data: doughnutChartData.map((item) => item.count),
            backgroundColor: ['#FFB6C1', '#87CEEB', '#FFD700', '#98FB98'], // Light Pink, Sky Blue, Gold, Pale Green
            borderColor: ['#FF69B4', '#4682B4', '#FFA500', '#00FA9A'], // Hot Pink, Steel Blue, Orange, Medium Spring Green
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
        },
      };
      

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
