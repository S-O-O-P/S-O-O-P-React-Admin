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
import '../../pages/Home/Dashboard.css';

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
  return (
    <Paper className="dashboard-chart" sx={{ borderRadius: '20px', border: '1px solid #FFB755'}}>
      <Typography className="chart-title">{title}</Typography>
      <Bar data={chartData} />
    </Paper>
  );
}

export default DashboardChart;
