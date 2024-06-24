import React from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardChart from '../../components/admin/DashboardChart';
import './Dashboard.css';

const monthlyChartData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  datasets: [
    {
      label: '생성 건수',
      data: [30, 45, 40, 50, 60, 55, 50, 45, 35, 30, 25, 20],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const dailyChartData = {
  labels: ['뮤지컬', '전시회', '공연', '행사축제', '팝업'],
  datasets: [
    {
      label: '생성 건수',
      data: [35, 40, 55, 60, 50],
      backgroundColor: [
        '#FFB755', // Vibrant Orange
        '#DFE0DF', // Olive Green
        '#14DFA4', // Steel Blue
        '#00E1C8', // Chocolate
        '#FFBA94', // Blue Violet
      ],
    },
  ],
};

const reportData = [
  { id: 35, title: 'XX 같이 볼사람 1', date: '2024-06-03', queries: 0 },
  { id: 34, title: 'XX 같이 볼사람 1', date: '2024-06-03', queries: 0 },
  { id: 33, title: 'XX 같이 볼사람 1', date: '2023-06-03', queries: 0 },
  { id: 32, title: 'XX 같이 볼사람 1', date: '2024-06-03', queries: 0 },
  { id: 31, title: 'XX 같이 볼사람 1', date: '2024-06-03', queries: 0 },
];

const inquiryData = [
  { id: 36, title: '공연 프로그램북이나 공식MD를 구입하고 싶습니다.', status: '답변완료', date: '2024-06-03', type: '전시회', control: '버튼' },
  { id: 35, title: '공연장에 몇 시까지 도착해야 하나요?', status: '답변완료', date: '2024-06-02', type: '행사/축제', control: '버튼' },
  { id: 34, title: '공연장에 갈 때 옷차림에 제한이 있나요?', status: '답변완료', date: '2024-06-01', type: '공연', control: '버튼' },
  { id: 33, title: '비어있는 좌석으로 자리를 옮겨도 되나요?', status: '답변완료', date: '2024-06-01', type: '팝업', control: '버튼' },
  { id: 32, title: '공연시작 시산에 늦었어요. 늦게라도 들어갈 수 있나요?', status: '답변완료', date: '2024-06-01', type: '뮤지컬', control: '버튼' },
];

const notices = [
  { id: 32, title: '[공지사항] 얼리벗 업데이트 사항 공지', date: '2024-06-03' },
  { id: 31, title: '[이벤트] 얼리벗 신규회원 이벤트!', date: '2024-06-02' },
  { id: 30, title: '[공지사항] 얼리벗 개인정보 처리방침 변경 안내(6/7)', date: '2024-06-01' },
  { id: 29, title: '[공지사항] 어리버드 티켓 정보 서비스 업데이트 공지', date: '2024-06-01' },
  { id: 28, title: '[이벤트] 얼리벗 신규 오픈 이벤트', date: '2024-06-01' },
];

function Dashboard() {
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
          <DashboardChart title="장르별 허니팟" chartData={dailyChartData} />
        </Grid>
      </Grid>
      <Box className="dashboard-info-container" sx={{ mt: 2 }}>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">매칭 횟수</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>45,912</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>546</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">1:1문의</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>45,912</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>2</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper className="dashboard-info" sx={{ borderRadius: '20px', border: '1px solid #FFB755' }}>
          <Typography className="info-title">신고 접수</Typography>
          <Box className="info-content">
            <Box className="info-item">
              <Typography>전체</Typography>
              <Typography>45,912</Typography>
            </Box>
            <div className="horizontal-line"></div>
            <Box className="info-item">
              <Typography>오늘</Typography>
              <Typography>2</Typography>
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
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.id}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.title}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.date}</TableCell>
                      <TableCell sx={{ borderBottom: index === reportData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.queries}</TableCell>
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
                    <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }} align="center">구분</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">관리</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inquiryData.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.id}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.title}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.type}</TableCell>
                      <TableCell sx={{ borderBottom: index === inquiryData.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{row.status}</TableCell>
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
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.id}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.title}</TableCell>
                      <TableCell sx={{ borderBottom: index === notices.length - 1 ? 'none' : '1px solid rgba(224, 224, 224, 1)' }} align="center">{notice.date}</TableCell>
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
}
export default Dashboard;
