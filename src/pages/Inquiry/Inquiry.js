import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Pagination } from '@mui/material';
import InquiryTable from '../../components/admin/InquiryTable';
import './Inquiry.css';

const initialInquiries = [
  { id: 37, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 36, title: '공연 프로그램북이나 굿즈MD를 구입하고 싶습니다.', category: '전시회', date: '2024-07-16', manage: '답변완료' },
  // Add more inquiries as needed
];

function Inquiry() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = initialInquiries.filter(inquiry =>
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setInquiries(filtered);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedInquiries = inquiries.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="inquiry-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">1:1 문의 전체 조회</Typography>
        <Box className="search-container">
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
      <InquiryTable inquiries={displayedInquiries} rowsPerPage={rowsPerPage} />
        <Pagination
          count={Math.ceil(inquiries.length / rowsPerPage)}
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

export default Inquiry;
