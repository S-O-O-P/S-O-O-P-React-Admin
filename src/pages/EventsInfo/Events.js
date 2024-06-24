import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Pagination } from '@mui/material';
import EventTable from '../../components/admin/EventTable';
import './Events.css';

const initialEvents = [
  { id: 1, category: '뮤지컬', title: '뮤지컬 (디어 에반 헨슨) - 부산 (Dear Evan Hansen)', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-12', manage: '수정' },
  { id: 2, category: '전시회', title: '서울 아트쇼 800회 특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
  { id: 3, category: '행사지원', title: '2024 부산국제화랑제특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
  // Add more events as needed
];

function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = initialEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filtered);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedEvents = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="events-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">공연/전시 정보 전체 조회</Typography>
        <Box className="actions-container">
          <Button variant="contained" className="register-button">등록</Button>
          <TextField
            variant="outlined"
            placeholder="제목 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearch}>
                    <img src="images/admin/icon_search.png" alt="search" />
                  </Button>
                </InputAdornment>
              ),
              style: { borderRadius: 20, border: '1px solid #FFB755', backgroundColor: '#fff' }
            }}
          />
        </Box>
      </Box>
      <EventTable events={displayedEvents} rowsPerPage={rowsPerPage} />
      <Pagination
        count={Math.ceil(events.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        className="pagination"
      />
    </Box>
  );
}

export default Events;
