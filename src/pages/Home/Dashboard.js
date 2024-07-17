import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardChart from '../../components/admin/DashboardChart';
import { fetchDashboardData } from '../../apis/DashboardAPI';
import './Dashboard.css';
import '../../components/admin/Table.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = ({ page, searchTerm }) => {
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

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleInquiryClick = (row) => {
    if (row.answerStatus === '답변대기' || row.answerStatus === '답변완료') {
      navigate(`/inquiry/${row.inquiryCode}`, { state: { row, page, searchTerm } });
    }
  };

  const handleRowClick = (id, type) => {
    navigate(`/notice/${id}`, { state: { type } });
  };

  const handleRowClick2 = (honeypotCode, status) => {
    if (location && location.pathname) {
      navigate(`/honeypot/${honeypotCode}`, { state: { from: location.pathname + location.search, searchTerm, page, status } });
    }
  };

  // Sort reportData by registration date in descending order
  const sortedReportData = [...reportData].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));

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
                  {inquiryData.slice(0, 5).map((row) => (
                    <TableRow key={row.inquiryCode}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.displayOrder}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center" onClick={() => handleInquiryClick(row)} style={{ cursor: 'pointer' }}>{row.title}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.category}</TableCell>
                      <TableCell>
                        <Box className={`answer-status ${row.answerStatus === '답변대기' ? 'notAnswer-status' : ''}`} sx={{ textAlign: 'center' }}>
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
                    <TableCell sx={{ color: 'white' }} align="center">신고접수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedReportData.filter(row => row.reportCount > 0).length === 0 ? (
                    <TableRow key="no-data">
                      <TableCell sx={{height:'265px', fontSize:'16px'}} colSpan={4} align="center">
                        현재 신고 접수내역이 존재하지 않습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {sortedReportData
                        .filter(row => row.reportCount > 0)
                        .slice(0, 5)
                        .map((row) => (
                          <TableRow key={row.reportCode}>
                            <TableCell
                              sx={{
                                borderRight: '1px solid rgba(224, 224, 224, 1)',
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                              }}
                              align="center"
                            >
                              {row.displayOrder}
                            </TableCell>
                            <TableCell
                              sx={{
                                borderRight: '1px solid rgba(224, 224, 224, 1)',
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                              }}
                              align="center"
                              onClick={() => handleRowClick2(row.honeypotCode, row.status)}
                              style={{ cursor: 'pointer' }}
                            >
                              {row.honeypotTitle}
                            </TableCell>
                            <TableCell
                              sx={{
                                borderRight: '1px solid rgba(224, 224, 224, 1)',
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                              }}
                              align="center"
                            >
                              {row.regDate}
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                              align="center"
                            >
                              {row.reportCount}
                            </TableCell>
                          </TableRow>
                        ))}
                      {Array.from({
                        length: Math.max(0, 5 - sortedReportData.filter(row => row.reportCount > 0).length),
                      }).map((_, index) => (
                        <TableRow key={`empty-${index}`}>
                          <TableCell
                            sx={{
                              borderRight: '1px solid rgba(224, 224, 224, 1)',
                              height: '53px',
                              borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            }}
                          />
                          <TableCell
                            sx={{
                              borderRight: '1px solid rgba(224, 224, 224, 1)',
                              height: '53px',
                              borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            }}
                          />
                          <TableCell
                            sx={{
                              borderRight: '1px solid rgba(224, 224, 224, 1)',
                              height: '53px',
                              borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            }}
                          />
                          <TableCell
                            sx={{
                              height: '53px',
                              borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            }}
                          />
                        </TableRow>
                      ))}
                    </>
                  )}
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
                  {notices.slice(0, 5).map((notice) => (
                    <TableRow key={notice.noticeCode}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.displayOrder}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center" onClick={() => handleRowClick(notice.noticeCode, "detail")} style={{ cursor: 'pointer' }}>{notice.title}</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.regDate}</TableCell>
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
