// CustomerDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, InputBase } from '@mui/material';
import { fetchCustomerDetail } from '../../apis/CustomerdetailAPI'; // API 호출 함수 임포트
import './Customerdetail.css'; // CSS 파일 임포트

// CustomerDetail 컴포넌트
function CustomerDetail() {
  const { userCode } = useParams(); // URL 파라미터에서 ID 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보

  const [member, setMember] = useState({}); // 단일 객체로 변경
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerDetail(userCode)
      .then(data => {
        console.log('API Response:', data); // 디버깅을 위한 로그
        setMember(data); // 응답 데이터를 단일 객체로 설정
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the member data!', error);
        setLoading(false);
      });
  }, [userCode]);

  // 로딩 중일 때 메시지 표시
  if (loading) {
    return <Typography variant="h4" color="#FFB755" className='customer-loading'>Loading...</Typography>;
  }

  // 회원 정보를 찾지 못했을 때 메시지 표시
  if (!member) {
    return <Typography variant="h4" color="#FFB755" className='customer-error'>회원 정보를 찾을 수 없습니다.</Typography>;
  }

  // 확인 버튼 클릭 핸들러
  const handleConfirmClick = () => {
    const from = location.state?.from || '/customer'; // 기본값을 '/customer'로 설정
    navigate(from, { state: { searchTerm: location.state?.searchTerm } });
  };

  const signupPlatformBeforeColon = member.signupPlatform ? member.signupPlatform.split(':')[0] : '';

  return (
    <Box className="customer-detail-container">
      <Typography className="nickname-info" variant="h4" component="div" sx={{ marginBottom: '30px' }}>
        {member.nickname} 님의 회원 정보
      </Typography>
      <Grid container spacing={-20} className="customer-detail-grid">
        <Grid item xs={12} sm={6}>
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
            <Typography className="detail-value">{member.signupDate}</Typography>
          </div>
          <div className="detail-group">
            <Typography className="detail-label">가입플랫폼</Typography>
            <Typography className="detail-value">{signupPlatformBeforeColon}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} container direction="column" >
          <Grid item className="profile-content-container">
            <Typography className="profile-content">프로필 사진</Typography>
          </Grid>
          <Grid item className="profile-picture-container">
            <Box className="profile-picture">
              {member.profilePic ? (
                <img src={member.profilePic} alt="Profile" />
              ) : (
                <Typography className='detail-values'>등록된 프로필이 없습니다.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography className="detail-label" sx={{ marginBottom: '25px' }}>자기소개</Typography>
          <Box className="search-boxs">
            <InputBase
              multiline
              className='detail-values'
              rows={4}
              defaultValue={member.aboutMe}
              variant="outlined"
              fullWidth
              readOnly // 읽기 전용 설정
            />
          </Box>
        </Grid>
        <Grid item xs={12} className="button-container">
          <Button variant="outlined" className="confirm-button" onClick={handleConfirmClick}>확인</Button>
        </Grid>
      
    </Box>
  );
}

export default CustomerDetail;
