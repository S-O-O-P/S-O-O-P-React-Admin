import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, InputBase, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventTable from '../../components/admin/EventTable'; // EventTable 컴포넌트 임포트
import EventsInfoApi from '../../apis/EventsInfoApi';

function Events() {
  const [events, setEvents] = useState([]); // 이벤트 상태 관리
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const rowsPerPage = 5; // 페이지 당 행 수 설정

  const navigate = useNavigate();

  useEffect(() => {
    // 얼리버드 공연/전시 리스트 전체 조회 api 호출
    EventsInfoApi({ setEvents }, "all");
  }, []);

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      EventsInfoApi({ setEvents }, "all");
      setPage(1);
      navigate('/events');
    } else {
      const filtered = events.filter(event =>
        event.ebTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEvents(filtered);
      setPage(1); // 검색 시 페이지를 첫 페이지로 설정
      navigate('/events', { state: { searchTerm } });
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      navigate('/events', { state: { searchTerm } });
    } else {
      navigate(`/events?page=${value}`, { state: { searchTerm } });
    }
  };

  // 키 입력 핸들러
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchClick = () => {
    handleSearch();
  };

  // 등록 버튼 클릭 핸들러
  const handleRegisterClick = (id, type) => {
    navigate(`/events/${id}`, { state: { type } });
  };

  // 현재 페이지에 표시할 이벤트 계산
  const displayedEvents = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">얼리버드 공연/전시</Typography>
        <Box className="actions-container">
          <Button variant="outlined" className="register-button" onClick={() => handleRegisterClick("new", "register")}>등록</Button>
          <Box className="search-box">
            <InputBase
              className="search-input"
              placeholder='제목 검색'
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSearchClick}>
              <img src="/images/admin/icon_search.png" alt="search" />
            </Button>
          </Box>
        </Box>
      </Box>
      {events.length === 0 ? (
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
            className='pagination'
            sx={{
              '.MuiPaginationItem-root': {
                color: '#FFB755',
              },
              '.Mui-selected': {
                backgroundColor: '#FFB755',
                color: '#fff',
              },
            }}
          />
        </>
      )}
    </Box>
  );
}

export default Events;
