import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Pagination } from '@mui/material';
import NoticeTable from '../../components/admin/NoticeTable';
import './Notice.css';

const initialNotices = [
  { id: 1, title: '공지사항 1', date: '2024-07-16', views: 34, manage: '수정' },
  { id: 2, title: '공지사항 2', date: '2024-07-16', views: 28, manage: '수정' },
  { id: 3, title: '공지사항 3', date: '2024-07-16', views: 22, manage: '수정' },
  // Add more notices as needed
];

function Notice() {
  const [notices, setNotices] = useState(initialNotices);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = initialNotices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotices(filtered);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedNotices = notices.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="notice-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">공지 사항 전체 조회</Typography>
        <Box className="actions-container">
          <Button variant="outlined" className="register-button">등록</Button>
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
              style: { borderRadius: 20, border: '1px solid #FFB755', backgroundColor: '#fff' },
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
      <NoticeTable notices={displayedNotices} rowsPerPage={rowsPerPage} />
        <Pagination
          count={Math.ceil(notices.length / rowsPerPage)}
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
    </Box>
  );
}

export default Notice;
