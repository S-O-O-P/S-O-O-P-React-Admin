// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardChart from '../../components/admin/DashboardChart';
import { fetchDashboardData } from '../../apis/DashboardAPI'; // 전체 데이터를 가져오는 함수 임포트
import './Dashboard.css';
import '../../components/admin/Table.css'

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
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    fetchDashboardData()
      .then(data => {
        setMonthlyHoneyCount(data.monthlyHoneyCount);
        
        // 중복 장르 합산 처리
        const genreCountMap = new Map();
        data.genreHoneyCount.forEach(item => {
          if (genreCountMap.has(item.genre)) {
            genreCountMap.set(item.genre, genreCountMap.get(item.genre) + item.honey_count);
          } else {
            genreCountMap.set(item.genre, item.honey_count);
          }
        });
        
        const combinedGenreHoneyCount = Array.from(genreCountMap, ([genre, honey_count]) => ({ genre, honey_count }));
        setGenreHoneyCount(combinedGenreHoneyCount);

        setTodayMatchingCount(data.todayMatchingCount);
        setTotalMatchingCount(data.totalMatchingCount);
        setTodayInquiryCount(data.todayInquiryCount);
        setTotalInquiryCount(data.totalInquiryCount);
        setTodayHoneyCount(data.todayHoneyCount);
        setTotalReportCount(data.totalReportCount);
        setTodayReportCount(data.todayReportCount);
        setReportData(data.reportData);
        setInquiryData(data.inquiryData);
        setNotices(data.notices);
      })
      .catch(error => console.error("There was an error fetching the dashboard data!", error));

      const currentDate = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setTodayDate(currentDate);
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
      <Box className="dashboard-today">
        <Typography variant="h6" sx={{ color: 'white' }}>Today</Typography>
          <Typography variant="h7" className="dashboard-summary">{todayDate}</Typography>
        </Box>
      <Box className="dashboard-title">
        <Typography variant="h6" sx={{ color: 'white' }}>오늘의 허니팟</Typography>
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
                  {inquiryData.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.inquiryCode}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.title}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.category}</TableCell>
                      <TableCell>
                        <Box className={`answer-status ${row.answerStatus === '답변대기' ? 'notAnswer-status' : ''}`} sx={{textAlign:'center'}}>
                          {row.answerStatus}
                        </Box>
                    </TableCell>
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
                {reportData.slice(0, 5).map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.honeypotCode}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.honeypotTitle}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.regDate}</TableCell>
                    <TableCell sx={{ borderBottom: index === reportData.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.reportCount}</TableCell>
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
                  {notices.slice(0, 5).map((notice, index) => (
                    <TableRow key={notice.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.noticeCode}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.title}</TableCell>
                      <TableCell sx={{ borderBottom: index === notices.slice(0, 5).length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.regDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Other dashboard components */}
    </Box>
  );
};

export default Dashboard;
