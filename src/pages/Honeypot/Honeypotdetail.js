import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, InputBase } from '@mui/material';
import { fetchHoneypotDetail, toggleHoneypotStatus } from '../../apis/HoneypotdetailAPI';
import './Honeypotdetail.css';

function HoneypotDetail() {
  const { honeypotCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`honeypotCode: ${honeypotCode}`);
    fetchHoneypotDetail(honeypotCode)
      .then(data => {
        console.log('API Response:', data);
        setRow(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the honeypot data!', error);
        setLoading(false);
      });
  }, [honeypotCode]);

  const handleBackClick = () => {
    const from = location.state?.from || '/honeypot';
    const page = location.state?.page || 1;
    const displayOrder = location.state?.displayOrder || 0;
    const searchTerm = location.state?.searchTerm || '';
    navigate(from, { state: { searchTerm, page, displayOrder } });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleStatus = () => {
    setOpen(false);
    const newStatus = row.visibilityStatus === '활성화' ? '비활성화' : '활성화';

    toggleHoneypotStatus(honeypotCode, newStatus)
      .then(() => {
        setRow(prevRow => ({ ...prevRow, visibilityStatus: newStatus }));

        const from = location.state?.from || '/honeypot';
        const page = location.state?.page || 1;
        const displayOrder = location.state?.displayOrder || 0;
        const searchTerm = location.state?.searchTerm || '';
        navigate(from, {
          state: {
            toggleStatus: { honeypotCode: parseInt(honeypotCode, 10), newStatus },
            searchTerm,
            page,
            displayOrder
          }
        });
      })
      .catch(error => {
        console.error('There was an error updating the honeypot status!', error);
      });
  };

  return (
    <Box className="honeypot-detail-container">
      <Typography variant="h4" component="div" sx={{ marginBottom: '30px' }}>
        허니팟 상세 정보
      </Typography>
      <Grid container spacing={3} className="honeypot-detail-info">
        <Grid item xs={6} sm={4}>
          <Box className="detail-group">
            <Typography className="detail-label">모집 상태</Typography>
            <Typography className="detail-value">{row.closureStatus}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-group">
            <Typography className="detail-label">모집인원</Typography>
            <Typography className="detail-value">{row.totalMember}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-group">
            <Typography className="detail-label">신고횟수</Typography>
            <Typography className="detail-value">{row.reportCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-group">
            <Typography className="detail-label">생성일자</Typography>
            <Typography className="detail-value">{row.regDate}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box className="detail-group">
            <Typography className="detail-label">장르</Typography>
            <Typography className="detail-value">{row.interestCode}</Typography>
          </Box>
        </Grid>
        <Grid item xs={7} sm={5}>
          <Box className="detail-group">
            <Typography className="detail-label">제목</Typography>
            <Typography className="detail-value">{row.honeypotTitle}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography className="detail-label" component="div" sx={{ marginBottom: '25px' }}>
        내용
      </Typography>
      <Box className="search-boxs">
        <InputBase
          multiline
          rows={4}
          className='detail-values'
          defaultValue={row.honeypotContent}
          variant="outlined"
          fullWidth
          readOnly
        />
      </Box>

      <Box className="honeypot-detail-buttons">
        <Button variant="outlined" className="cancel-button" onClick={handleBackClick}>
          목록
        </Button>
        <Box className="honeypot-right-buttons">
          <Button variant="outlined" className="cancel-button" onClick={handleBackClick}>
            취소
          </Button>
          <Button variant="outlined" className="honeypot-action-button-contained" onClick={handleClickOpen}>
            {row.visibilityStatus === '활성화' ? '비활성화' : '활성화'}
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} className='custom_dialog_box'>
        <DialogContent className="custom-dialog-content">
          <img src="/images/commons/icon_alert.png" alt="icon" className="dialog-icon" />
          <DialogContentText className="dialog-text">
            해당 게시물을 {row.visibilityStatus === '활성화' ? '비활성화' : '재활성화'} 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="custom-dialog-actions">
          <Button onClick={handleClose} className="custom-cancel-button two_button">
            취소
          </Button>
          <Button onClick={handleToggleStatus} className="custom-confirm-button two_button" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HoneypotDetail;
