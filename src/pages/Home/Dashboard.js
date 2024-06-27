import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardChart from '../../components/admin/DashboardChart'; // 이 컴포넌트는 이미 정의되어 있다고 가정합니다.
import './Dashboard.css';

const Dashboard = () => {
  const [monthlyHoneyCount, setMonthlyHoneyCount] = useState([]);
  const [genreHoneyCount, setGenreHoneyCount] = useState([]);
  const [todayMatchingCount, setTodayMatchingCount] = useState(0);
  const [totalMatchingCount, setTotalMatchingCount] = useState(0);
  const [todayInquiryCount, setTodayInquiryCount] = useState(0);
  const [totalInquiryCount, setTotalInquiryCount] = useState(0);
  const [todayHoneyCount, setTodayHoneyCount] = useState(0);
  const [totalReportCount, setTotalReportCount] = useState(0);
  const [todayReportCount, setTodayReportCount] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard/monthly-honey-count')
      .then(response => setMonthlyHoneyCount(response.data.monthlyHoneyCount))
      .catch(error => console.error("There was an error fetching the monthly honey count!", error));

    axios.get('http://localhost:8080/dashboard/genre-honey-count')
      .then(response => setGenreHoneyCount(response.data.genreHoneyCount))
      .catch(error => console.error("There was an error fetching the genre honey count!", error));

    axios.get('http://localhost:8080/dashboard/today-matching-count')
      .then(response => setTodayMatchingCount(response.data.todayMatchingCount))
      .catch(error => console.error("There was an error fetching the today matching count!", error));

    axios.get('http://localhost:8080/dashboard/total-matching-count')
      .then(response => setTotalMatchingCount(response.data.totalMatchingCount))
      .catch(error => console.error("There was an error fetching the today matching count!", error));

    axios.get('http://localhost:8080/dashboard/today-inquiry-count')
      .then(response => setTodayInquiryCount(response.data.todayInquiryCount))
      .catch(error => console.error("There was an error fetching the today inquiry count!", error));

    axios.get('http://localhost:8080/dashboard/total-inquiry-count')
      .then(response => setTotalInquiryCount(response.data.totalInquiryCount))
      .catch(error => console.error("There was an error fetching the today inquiry count!", error));


    axios.get('http://localhost:8080/dashboard/today-honey-count')
      .then(response => setTodayHoneyCount(response.data.todayHoneyCount))
      .catch(error => console.error("There was an error fetching the today honey count!", error));

    axios.get('http://localhost:8080/dashboard/total-report-count')
      .then(response => setTotalReportCount(response.data.totalReportCount))
      .catch(error => console.error("There was an error fetching the today matching count!", error));

    axios.get('http://localhost:8080/dashboard/today-report-count')
      .then(response => setTodayReportCount(response.data.todayReportCount))
      .catch(error => console.error("There was an error fetching the today matching count!", error));

    axios.get('http://localhost:8080/dashboard/reports')
      .then(response => setReportData(response.data.reports))
      .catch(error => console.error("There was an error fetching the reports!", error));

    axios.get('http://localhost:8080/dashboard/inquiries')
      .then(response => setInquiryData(response.data.inquiries))
      .catch(error => console.error("There was an error fetching the inquiries!", error));

    axios.get('http://localhost:8080/dashboard/notices')
      .then(response => setNotices(response.data.notices))
      .catch(error => console.error("There was an error fetching the notices!", error));
  }, []);

  const monthlyChartData = {
    labels: monthlyHoneyCount.map(item => item.month),
    datasets: [
      {
        label: '생성 건수',
        data: monthlyHoneyCount.map(item => item.honey_count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const genreChartData = {
    labels: genreHoneyCount.map(item => item.genre),
    datasets: [
      {
        label: '생성 건수',
        data: genreHoneyCount.map(item => item.honey_count),
        backgroundColor: [
          '#FFB755', 
          '#DFE0DF', 
          '#14DFA4', 
          '#00E1C8', 
          '#FFBA94', 
        ],
      },
    ],
  };

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-header">
        <Typography variant="h6" sx={{ color: 'white' }}>오늘의 허니팟</Typography>
        <Box className="dashboard-title">
          <Typography variant="h7" className="dashboard-summary">{todayHoneyCount}개</Typography>
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
      <Box className="dashboard-info-container" sx={{ mt: 2 }}>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">매칭 횟수</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>{totalMatchingCount}</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>{todayMatchingCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">1:1문의</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>{totalInquiryCount}</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>{todayInquiryCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">신고 접수</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>{totalReportCount}</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>{todayReportCount}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-table" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
            <Box className="table-title-container">
              <Typography className="table-title" sx={{ backgroundColor: '#FFB755', color: 'white', margin: 'auto' }}>신고 접수 내역</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">no</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">제목</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">등록일자</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">신고조회</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.honeypotCode}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.honeypotTitle}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.regDate}</TableCell>
                      <TableCell sx={{ borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.reportCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-table" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
            <Box className="table-title-container">
              <Typography className="table-title" sx={{ backgroundColor: '#FFB755', color: 'white', margin: 'auto' }}>1:1문의 내역</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">no</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">제목</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">유형</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">관리</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inquiryData.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.inquiryCode}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.title}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.category}</TableCell>
                      <TableCell sx={{ borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.answerStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper className="dashboard-table" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
            <Box className="table-title-container">
              <Typography className="table-title" sx={{ backgroundColor: '#FFB755', color: 'white', margin: 'auto' }}>최신 공지 사항</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">no</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">제목</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">등록일자</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notices.map((notice, index) => (
                    <TableRow key={notice.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.noticeCode}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.title}</TableCell>
                      <TableCell sx={{ borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.regDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
