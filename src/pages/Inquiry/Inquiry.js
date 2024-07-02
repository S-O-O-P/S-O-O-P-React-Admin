import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, InputBase, Pagination } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import InquiryTable from '../../components/admin/InquiryTable';
import axios from 'axios';

function Inquiry() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    if (location.state?.updatedInquiry) {
      setInquiries(prevInquiries => prevInquiries.map(inquiry =>
        inquiry.inquiryCode === location.state.updatedInquiry.inquiryCode
          ? location.state.updatedInquiry
          : inquiry
      ));
      setFilteredInquiries(prevInquiries => prevInquiries.map(inquiry =>
        inquiry.inquiryCode === location.state.updatedInquiry.inquiryCode
          ? location.state.updatedInquiry
          : inquiry
      ));
    } else {
      if (location.state?.searchTerm) {
        handleSearch(location.state.searchTerm, inquiries);
      } else {
        setFilteredInquiries(inquiries);
      }
    }
    setPage(currentPage);
  }, [currentPage, location.state?.searchTerm, location.state?.updatedInquiry, inquiries]);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inquiry/'); // API 엔드포인트를 설정합니다.
      setInquiries(response.data.inquiryInfo); // Adjusted to match the response structure
      if (location.state?.searchTerm) {
        handleSearch(location.state.searchTerm, response.data.inquiryInfo);
      } else {
        setFilteredInquiries(response.data.inquiryInfo);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

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

  const handleSearch = (term = searchTerm, inquiriesList = inquiries) => {
    const filtered = inquiriesList.filter(inquiry =>
      inquiry.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInquiries(filtered);
    setPage(1); // Reset to first page on search
    if (page === 1) {
      navigate('/inquiry', { state: { searchTerm } });
    } else {
      navigate(`/inquiry?page=${page}`, { state: { searchTerm } });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleInquiryClick = (inquiry) => {
    if (inquiry.answerStatus === '답변대기' || inquiry.answerStatus === '답변완료') {
      navigate(`/inquiry/${inquiry.inquiryCode}`, { state: { inquiry, page, searchTerm } });
    }
  };

  const displayedInquiries = Array.isArray(filteredInquiries)
    ? filteredInquiries.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">1:1 문의 관리</Typography>
        <Box className="actions-container">
          <Box className="search-box">
            <InputBase
              className="search-input"
              placeholder='회원 이름 검색'
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
