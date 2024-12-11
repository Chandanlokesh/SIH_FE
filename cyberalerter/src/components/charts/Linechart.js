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

    // Modern color palette
    const modernBrightColors = [
        '#FF7F50', // Coral
        '#20B2AA', // LightSeaGreen
        '#F5DEB3', // Wheat
        '#FFDAB9', // PeachPuff
        '#D2691E', // Chocolate
        '#8A2BE2', // BlueViolet
        '#DA70D6', // Orchid
        '#00BFFF', // DeepSkyBlue
        '#FFD700', // Gold
        '#ADFF2F'  // GreenYellow
      ];

    // Prepare chart data with multiple datasets (one for each product)
    const chartData = {
        labels: lineChartData.labels, // Use all unique dates
        datasets: lineChartData.datasets.map((dataset, index) => ({
            label: dataset.label, // Product name
            data: dataset.data, // Count of vulnerabilities for each date
            borderColor: modernBrightColors[index], // Predefined color for each product
            backgroundColor:  modernBrightColors[index], // Fill the area under the line with the same color
            fill: true,
            tension: 0.3, // Curved lines
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 10, // Make the legend text smaller
                    },
                    boxWidth: 12, // Size of the color box in the legend
                },
            },
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
