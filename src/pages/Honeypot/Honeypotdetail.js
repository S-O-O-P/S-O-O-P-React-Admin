import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import './Honeypotdetail.css'; // CSS 파일 임포트

// HoneypotDetail 컴포넌트
function HoneypotDetail() {
  const { no } = useParams(); // URL 파라미터에서 no 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보
  const [open, setOpen] = useState(false); // Dialog 상태 관리

  // 뒤로 가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    const from = location.state?.from || '/honeypot'; // 기본값을 '/honeypot'로 설정
    navigate(from, { state: { searchTerm: location.state?.searchTerm } });
  };

  // Dialog 열기 핸들러
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Dialog 닫기 핸들러
  const handleClose = () => {
    setOpen(false);
  };

  // 상태 토글 핸들러
  const handleToggleStatus = () => {
    setOpen(false);
    const from = location.state?.from || '/honeypot'; // 기본값을 '/honeypot'로 설정
    const currentStatus = location.state?.status;
    const newStatus = currentStatus === '활성화' ? '비활성화' : '활성화';
    navigate(from, { state: { toggleStatus: { no: parseInt(no, 10), newStatus }, searchTerm: location.state?.searchTerm } });
  };

  // 행 데이터
  const rows = [
    { no, title: 'XX 같이 볼 20대 친구 구합니다😁남녀 상관없음~!', 모집상태: '모집중', 모집인원: '1/2', 신고횟수: '3', 생성일자: '2024-06-03', 장르: '뮤지컬', status: location.state?.status }
  ];

  return (
    <Box className="honeypot-detail-container">
      <Typography variant="h4" component="div" gutterBottom>
        허니팟 상세 정보
      </Typography>
      <Grid container spacing={3} className="honeypot-detail-info">
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">모집 상태</Typography>
            <Typography variant="body2">{rows[0].모집상태}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">모집인원</Typography>
            <Typography variant="body2">{rows[0].모집인원}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">신고횟수</Typography>
            <Typography variant="body2">{rows[0].신고횟수}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">생성일자</Typography>
            <Typography variant="body2">{rows[0].생성일자}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">장르</Typography>
            <Typography variant="body2">{rows[0].장르}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className="honeypot-detail-divider">
        <Typography variant="h6" component="div" gutterBottom>
          게시물 상세 제목
        </Typography>
      </Box>
      <Typography variant="body1" className="honeypot-detail-description">
        {rows[0].title.split('😁')[0]}😁<br />{rows[0].title.split('😁')[1]}
      </Typography>
      <Box className="honeypot-detail-buttons">
        <Button variant="outlined" className="honeypot-action-button-outline" onClick={handleBackClick}>
          목록
        </Button>
        <Box className="honeypot-right-buttons">
          <Button variant="outlined" className="honeypot-action-button-outline">
            취소
          </Button>
          <Button variant="contained" className="honeypot-action-button-contained" onClick={handleClickOpen}>
            {rows[0].status === '활성화' ? '비활성화' : '활성화'}
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="custom-dialog-content">
          <img src="/images/commons/icon_alert.png" alt="icon" className="dialog-icon" />
          <DialogContentText className="dialog-text">
            해당 게시물을 {rows[0].status === '활성화' ? '비활성화' : '재활성화'} 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="custom-dialog-actions">
          <Button onClick={handleClose} className="custom-cancel-button">
            취소
          </Button>
          <Button onClick={handleToggleStatus} className="custom-confirm-button" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HoneypotDetail;
