import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, InputBase, Pagination } from '@mui/material';
import NoticeTable from '../../components/admin/NoticeTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notice/');
      if (Array.isArray(response.data.noticeInfo)) {
        setNotices(response.data.noticeIn);
        setFilteredNotices(response.data.noticeInfo); // Initialize filtered notices
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = notices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 등록 버튼 클릭 핸들러
  const handleRegisterClick = (id, type) => {
    navigate(`/notice/${id}`, { state: { type } });
  };

  const displayedNotices = Array.isArray(filteredNotices) ? filteredNotices.slice((page - 1) * rowsPerPage, page * rowsPerPage) : [];

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">공지 사항 전체 조회</Typography>
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
            <Button onClick={handleSearch}>
              <img src="/images/admin/icon_search.png" alt="search" />
            </Button>
          </Box>
        </Box>
      </Box>
      <NoticeTable notices={displayedNotices} />
      <Pagination
        count={Math.ceil(filteredNotices.length / rowsPerPage)}
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

