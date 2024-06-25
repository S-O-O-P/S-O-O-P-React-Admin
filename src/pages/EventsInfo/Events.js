import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventTable from '../../components/admin/EventTable'; // EventTable 컴포넌트 임포트
import './Events.css'; // CSS 파일 임포트


// 초기 이벤트 목록
const initialEvents = [
  { id: 1, category: '뮤지컬', title: '뮤지컬 (디어 에반 헨슨) - 부산 (Dear Evan Hansen)', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-12', manage: '수정' },
  { id: 2, category: '전시회', title: '서울 아트쇼 800회 특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
  { id: 3, category: '행사지원', title: '2024 부산국제화랑제특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
];

function Events() {
  const [events, setEvents] = useState(initialEvents); // 이벤트 상태 관리
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const rowsPerPage = 10; // 페이지 당 행 수 설정

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 핸들러
  const handleSearch = () => {
    const filtered = initialEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filtered);
    setPage(1); // 검색 시 페이지를 첫 페이지로 설정
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  // 현재 페이지에 표시할 이벤트 계산
  const displayedEvents = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="events-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">공연/전시 정보 전체 조회</Typography>
        <Box className="actions-container">

          <Button variant="contained" className="register-button" onClick={() => navigate('/events/register/0')}>등록</Button>

          <TextField
            variant="outlined"
            placeholder="제목 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-field"
            InputProps={{
              endAdornment: (
                <InputAdornment >
                  <Button onClick={handleSearch}>
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
      {initialEvents.length === 0 ? (
        <Box className="error-container">
          <Typography variant="h4" color="#FFB755">해당 공연/전시 정보를 찾을 수 없습니다.</Typography>
        </Box>
      ) : (
        <>
          <EventTable events={displayedEvents} rowsPerPage={rowsPerPage} />
          <Pagination
            count={Math.ceil(events.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            className="pagination"
          />
        </>
      )}
    </Box>
  );
}

export default Events;
