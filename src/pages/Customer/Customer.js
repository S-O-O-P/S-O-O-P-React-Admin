import React, { useState, useEffect } from 'react';
import CustomerTable from '../../components/admin/CustomerTable'; // CustomerTable 컴포넌트 임포트
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box, Button, InputAdornment, Typography } from '@mui/material';

// Customer 컴포넌트
function Customer() {
  // 회원 목록 데이터
  const members = [
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user005', nickname: 'userfive', gender: '남', email: 'userfive@gmail.com', date: '2024-06-23' },
    { id: 'user006', nickname: 'usersix', gender: '여', email: 'usersix@gmail.com', date: '2024-06-23' },
    { id: 'user007', nickname: 'userseven', gender: '남', email: 'userseven@gmail.com', date: '2024-06-23' },
    { id: 'user008', nickname: 'usereight', gender: '여', email: 'usereight@gmail.com', date: '2024-06-23' },
  ];

  const location = useLocation(); // 현재 위치 정보
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  const query = new URLSearchParams(location.search); // URL 쿼리 파라미터 파싱
  const currentPage = parseInt(query.get('page') || '1', 10); // 현재 페이지 번호

  const [page, setPage] = useState(currentPage); // 페이지 상태 관리
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || ''); // 검색어 상태 관리
  const [filteredMembers, setFilteredMembers] = useState(members); // 필터링된 회원 목록 상태 관리

  const rowsPerPage = 5; // 페이지 당 행 수 설정

  useEffect(() => {
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm); // 검색어가 있으면 검색 수행
    } else {
      setFilteredMembers(members); // 검색어가 없으면 전체 회원 목록 설정
    }
    setPage(currentPage); // 현재 페이지 설정
  }, [currentPage, location.state?.searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      navigate('/customer', { state: { searchTerm } });
    } else {
      navigate(`/customer?page=${value}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 변경
  };

  const handleSearch = (term = searchTerm) => {
    const filtered = members.filter(member =>
      member.id.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMembers(filtered); // 필터링된 회원 목록 설정
    navigate(`/customer?page=${page}`, { state: { searchTerm: term } }); // 검색 결과 페이지로 이동
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Enter 키를 누르면 검색 수행
    }
  };

  const handleSearchClick = () => {
    handleSearch(); // 검색 버튼 클릭 시 검색 수행
  };

  return (
    <Box className="customer-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">회원 전체 조회</Typography>
        <Box className="actions-container">
          <TextField
            placeholder='회원 코드 검색'
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="search-field"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Button onClick={handleSearchClick}>
                    <img src="images/admin/icon_search.png" alt="search" />
                  </Button>
                </InputAdornment>
              ),
              style: { borderRadius: 20, border: '1px solid #FFB755' },

              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755', // 기본 테두리 색상
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755', // 호버 시 테두리 색상
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755', // 포커스 시 테두리 색상
                },
              },
            }}
          />
      </Box>
      </Box>
      <CustomerTable
        members={filteredMembers}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
}

export default Customer;

