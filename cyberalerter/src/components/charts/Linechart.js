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

const LineChart = ({ lineChartData }) => {

    // Prepare chart data with multiple datasets (one for each product)
    const chartData = {
        labels: lineChartData.labels, // Use all unique dates
        datasets: lineChartData.datasets.map((dataset) => ({
            label: dataset.label, // Product name
            data: dataset.data, // Count of vulnerabilities for each date
            borderColor: dataset.borderColor || getRandomColor(), // Random or predefined color for each product
            backgroundColor: dataset.backgroundColor || 'rgba(25, 86, 194, 0.1)', // Optional background for the area under the line
            fill: true,
            tension: 0.2, // Curved lines
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true }, // Show legend for each product line
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

// Utility function to generate a random color for each product line
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default LineChart;
