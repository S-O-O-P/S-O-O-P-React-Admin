import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import './Customerdetail.css'; // CSS 파일 임포트

// CustomerDetail 컴포넌트
function CustomerDetail() {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보

  // 회원 목록 데이터
  const members = [
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
  ];

  const member = members.find(member => member.id === id); // 회원 정보 찾기

  // 회원 정보를 찾지 못했을 때 메시지 표시
  if (!member) {
    return <Typography variant="h4" color="#FFB755" className='customer-error'>회원 정보를 찾을 수 없습니다.</Typography>;
  }

  // 확인 버튼 클릭 핸들러
  const handleConfirmClick = () => {
    const from = location.state?.from || '/customer'; // 기본값을 '/customer'로 설정
    navigate(from, { state: { searchTerm: location.state?.searchTerm } });
  };

  return (
    <Box className="customer-detail-container">
      <Grid container spacing={2} className="customer-detail-grid">
        <Grid item xs={12} sm={6}>
          <div className="detail-group">
            <Typography className="detail-label">회원코드</Typography>
            <Typography className="detail-value">{member.id}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">성별</Typography>
            <Typography className="detail-value">{member.gender}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">이메일</Typography>
            <Typography className="detail-value">{member.email}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">닉네임</Typography>
            <Typography className="detail-value">{member.nickname}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">가입일자</Typography>
            <Typography className="detail-value">{member.date}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">가입플랫폼</Typography>
            <Typography className="detail-value">카카오톡</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="profile-content-container">
          <Typography className="profile-content">프로필 사진</Typography>
          <Box className="profile-picture">
            <Typography>등록된 프로필이 없습니다.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="자기소개"
            multiline
            rows={4}
            defaultValue="자기소개 글 입니다."
            variant="outlined"
            fullWidth
            InputProps={{ readOnly: true, className: "text-field-input" }} // 읽기 전용 설정
          />
        </Grid>
        <Grid item xs={12} className="button-container">
          <Button variant="outlined" className="cancel-button" onClick={() => navigate(-1)}>취소</Button>
          <Button variant="outlined" className="confirm-button" onClick={handleConfirmClick}>확인</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomerDetail;
