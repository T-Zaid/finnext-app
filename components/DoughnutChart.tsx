'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const chartData = {
        labels: ['Bank 1', 'Bank 2', 'Bank 3'],
        datasets: [
            {
                id: 1,
                label: 'Banks',
                data: [1250, 5000, 3500],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
    }

    return <Doughnut
        data={chartData}
        options={{
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }}
    />
}

export default DoughnutChart;