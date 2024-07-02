import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


// Chart.js에 사용하려는 스케일과 요소를 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ title, chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '2024년 생성 건수',
      },
    },
    scales: {
      x: {
        stacked: true,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
      },
      y: {
        stacked: true,
      },
    },
  };


  return (
    <Paper className="dashboard-chart" sx={{ borderRadius: '20px', border: '1px solid #FFB755'}}>
      <Typography className="chart-title">{title}</Typography>
      <Bar data={chartData} options={options} />
    </Paper>
  );
}

export default DashboardChart;
