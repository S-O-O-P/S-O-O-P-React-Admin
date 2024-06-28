import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Pagination } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import InquiryTable from '../../components/admin/InquiryTable';
import './Inquiry.css';

const initialInquiries = [
  { id: 37, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 36, title: '공연 프로그램북이나 굿즈MD를 구입하고 싶습니다.', category: '전시회', date: '2024-07-16', manage: '미답변' },
  { id: 35, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 34, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 33, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 32, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 31, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 30, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 29, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 28, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 27, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 26, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 25, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 24, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 23, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 22, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
  { id: 21, title: '이벤트 관련 안내질문 있나요?', category: '뮤지컬', date: '2024-07-16', manage: '미답변' },
];

function Inquiry() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  const rowsPerPage = 5;

  useEffect(() => {
    const savedInquiries = JSON.parse(localStorage.getItem('inquiries')) || initialInquiries;
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm, savedInquiries);
    } else {
      setFilteredInquiries(savedInquiries);
    }
    setPage(currentPage);
  }, [currentPage, location.state?.searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      navigate('/inquiry', { state: { searchTerm } });
    } else {
      navigate(`/inquiry?page=${value}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (term = searchTerm, inquiriesList = initialInquiries) => {
    const filtered = inquiriesList.filter(inquiry =>
      inquiry.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInquiries(filtered);
    navigate(`/inquiry?page=${page}`, { state: { searchTerm: term } });
  };

  const handleInquiryClick = (inquiry) => {
    if (inquiry.manage === '미답변' || inquiry.manage === '답변완료') {
      navigate(`/inquiry/${inquiry.id}`, { state: { inquiry, page, searchTerm } });
    }
  };

  const displayedInquiries = filteredInquiries.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                  <Button onClick={() => handleSearch()}>
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
      <InquiryTable
        inquiries={displayedInquiries}
        rowsPerPage={rowsPerPage}
        onInquiryClick={handleInquiryClick}
      />
      <Pagination
        count={Math.ceil(filteredInquiries.length / rowsPerPage)}
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
