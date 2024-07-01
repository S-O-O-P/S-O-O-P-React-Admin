import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import './Honeypotdetail.css'; // CSS 파일 임포트

// HoneypotDetail 컴포넌트
function HoneypotDetail() {
  const { honeypotCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`honeypotCode: ${honeypotCode}`); // Add this line to debug honeypotCode
    axios.get(`http://localhost:8080/honeypot/${honeypotCode}`)
      .then(response => {
        console.log('API Response:', response.data);
        setRow(response.data); // Ensure the response data structure is correct
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the honeypot data!', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }
        setLoading(false);
      });
  }, [honeypotCode]);

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
    const newStatus = row.visibilityStatus === '활성화' ? '비활성화' : '활성화';

    axios.post(`http://localhost:8080/honeypot/${honeypotCode}/toggleStatus`, { newStatus })
        .then(response => {
            // 상태 변경이 성공하면 서버 응답에 따라 로컬 상태 업데이트
            setRow(prevRow => ({ ...prevRow, visibilityStatus: newStatus }));

            // 상태 변경 후 목록 페이지로 이동
            const from = location.state?.from || '/honeypot';
            navigate(from, { state: { toggleStatus: { honeypotCode: parseInt(honeypotCode, 10), newStatus }, searchTerm: location.state?.searchTerm } });
        })
        .catch(error => {
            console.error('There was an error updating the honeypot status!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }
        });
};
 

  return (
    <Box className="honeypot-detail-container">
      <Typography variant="h4" component="div" gutterBottom>
        허니팟 상세 정보
      </Typography>
      <Grid container spacing={3} className="honeypot-detail-info">
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">모집 상태</Typography>
            <Typography variant="body2">{row.closureStatus}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">모집인원</Typography>
            <Typography variant="body2">{row.totalMember}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">신고횟수</Typography>
            <Typography variant="body2">{row.reportCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">생성일자</Typography>
            <Typography variant="body2">{row.regDate}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-item">
            <Typography variant="body1">장르</Typography>
            <Typography variant="body2">{row.interestCode}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className="honeypot-detail-divider">
        <Typography variant="h6" component="div" gutterBottom>
          게시물 상세 제목
        </Typography>
      </Box>
      <Typography variant="body1" className="honeypot-detail-description">
        {row.honeypotContent}
      </Typography>
      <Box className="honeypot-detail-buttons">
        <Button variant="outlined" className="honeypot-action-button-outline" onClick={handleBackClick}>
          목록
        </Button>
        <Box className="honeypot-right-buttons">
          <Button variant="outlined" className="honeypot-action-button-outline" onClick={handleBackClick}>
            취소
          </Button>
          <Button variant="contained" className="honeypot-action-button-contained" onClick={handleClickOpen}>
            {row.visibilityStatus === '활성화' ? '비활성화' : '활성화'}
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="custom-dialog-content">
          <img src="/images/commons/icon_alert.png" alt="icon" className="dialog-icon" />
          <DialogContentText className="dialog-text">
            해당 게시물을 {row.visibilityStatus === '활성화' ? '비활성화' : '재활성화'} 하시겠습니까?
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
