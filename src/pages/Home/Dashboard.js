import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import DashboardChart from '../../components/admin/DashboardChart';
import './Dashboard.css';

const Dashboard = () => {
  const [monthlyChartData, setMonthlyChartData] = useState({
    labels: [],
    datasets: [{ label: '생성 건수', data: [], backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
  });
  const [genreChartData, setGenreChartData] = useState({
    labels: [],
    datasets: [{ label: '생성 건수', data: [], backgroundColor: [] }],
  });

  useEffect(() => {
    axios.get('/dashboard/postHoney')
      .then(response => {
        const data = response.data;
        const monthlyData = calculateMonthlyData(data);
        setMonthlyChartData({
          labels: Object.keys(monthlyData),
          datasets: [{ label: '생성 건수', data: Object.values(monthlyData), backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
        });
      })
      .catch(error => {
        console.error('Error fetching monthly data', error);
      });

    axios.get('/dashboard/postHoney/genre')
      .then(response => {
        const data = response.data;
        const genreData = calculateGenreData(data);
        setGenreChartData({
          labels: Object.keys(genreData),
          datasets: [{ label: '생성 건수', data: Object.values(genreData), backgroundColor: generateColors(Object.keys(genreData).length) }],
        });
      })
      .catch(error => {
        console.error('Error fetching genre data', error);
      });
  }, []);

  const calculateMonthlyData = (data) => {
    const monthlyData = {};
    data.forEach(item => {
      const month = item.honeyAt.slice(0, 7); // Extract YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month]++;
    });
    return monthlyData;
  };

  const calculateGenreData = (data) => {
    const genreData = {};
    data.forEach(item => {
      genreData[item.HONEY_GENRE] = item.count;
    });
    return genreData;
  };

  const generateColors = (length) => {
    const colors = ['#FFB755', '#DFE0DF', '#14DFA4', '#00E1C8', '#FFBA94'];
    return colors.slice(0, length);
  };

 
  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <Typography variant="h6" sx={{ color: 'white' }}>오늘의 허니팟</Typography>
        <Box className="dashboard-title">
          <Typography variant="h7" className="dashboard-summary">20개</Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DashboardChart title="월별 허니팟" chartData={monthlyChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardChart title="장르별 허니팟" chartData={genreChartData} />
        </Grid>
      </Grid>
      {/* Other dashboard components */}
    </Box>
  );
};

export default Dashboard;
