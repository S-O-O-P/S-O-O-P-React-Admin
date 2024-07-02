import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable'; // HoneypotTable 컴포넌트 임포트
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, InputAdornment, Button, InputBase } from '@mui/material';
import axios from 'axios';

function Honeypot() {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보

  // URL 쿼리 파라미터에서 현재 페이지 번호 가져오기
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage); // 페이지 상태 관리
  const rowsPerPage = 5; // 페이지 당 행 수 설정
  const [rows, setRows] = useState([]); // 행 데이터 상태 관리
  const [filteredRows, setFilteredRows] = useState([]); // 필터링된 행 상태 관리
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || ''); // 검색어 상태 관리

  useEffect(() => {
    axios.get('http://localhost:8080/honeypot/')
      .then(response => {
        console.log('API Response:', response.data); // 디버깅을 위한 로그
        setRows(response.data.honeypotInfo || []); // honeypotInfo가 null일 경우 빈 배열로 설정
        setFilteredRows(response.data.honeypotInfo || []);
        console.log('Fetched Rows:', response.data.honeypotInfo); // Log the fetched data
      })
      .catch(error => console.error('There was an error fetching the honeypot data!', error));
  }, []);

  useEffect(() => {
    setFilteredRows(rows); // 검색어가 없으면 전체 행 설정
    setPage(currentPage); // 현재 페이지 설정
  }, [currentPage, rows]);

  // 상태 변경에 따라 행 상태 업데이트
  useEffect(() => {
    if (location.state?.toggleStatus) {
      setRows(prevRows =>
        prevRows.map(row =>
          row.honeypotCode === location.state.toggleStatus.honeypotCode
            ? { ...row, visibilityStatus: location.state.toggleStatus.newStatus }
            : row
        )
      );
      navigate(location.pathname + location.search, { replace: true, state: { searchTerm: location.state.searchTerm } });
    }
  }, [location.state, navigate, location.pathname, location.search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage === 1) {
      navigate('/honeypot', { state: { searchTerm } });
    } else {
      navigate(`/honeypot?page=${newPage}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 변경
  };

  const handleSearch = (term = searchTerm) => {
    console.log("Searching for:", term); // Add logging
    console.log("Rows:", rows); // Log the rows to inspect titles

    const filtered = rows.filter(row =>
      row.honeypotTitle && row.honeypotTitle.toLowerCase().includes(term.toLowerCase())
    );

    console.log("Filtered rows:", filtered); // Add logging
    setFilteredRows(filtered);
    setPage(1); // Reset to first page on search
    if (page === 1) {
      navigate('/honeypot', { state: { searchTerm } });
    } else {
      navigate(`/honeypot?page=${page}`, { state: { searchTerm } });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch(); // 검색 버튼 클릭 시 검색 수행
  };

  const handleRowClick = (honeypotCode, status) => {
    navigate(`/honeypot/${honeypotCode}`, { state: { from: location.pathname + location.search, searchTerm, page, status } });
  };

  const displayedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage); // 현재 페이지에 표시할 행 계산

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">
          허니팟 관리 전체 조회
        </Typography>
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

        <TableContainer component={Paper} className="table-container">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell className="table-head-cell" align="center">허니팟</TableCell>
                <TableCell className="table-head-cell" align="center">제목</TableCell>
                <TableCell className="table-head-cell" align="center">등록일자</TableCell>
                <TableCell className="table-head-cell" align="center">신고건수</TableCell>
                <TableCell className="table-head-cell" align="center">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((row) => (
                <HoneypotTable
                  key={row.honeypotCode}
                  row={row}
                  handleRowClick={handleRowClick}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="honeypot-pagination">
<Pagination
        count={Math.ceil(filteredRows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
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
      
    </Box>
  );
}

export default Honeypot;