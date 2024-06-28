import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable'; // HoneypotTable 컴포넌트 임포트
import { useNavigate, useLocation } from 'react-router-dom';
import './Honeypot.css'; // CSS 파일 임포트
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, InputAdornment, Button} from '@mui/material';
import axios from 'axios';

function Honeypot() {
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const rowsPerPage = 5; // 페이지 당 행 수 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보
  const [rows, setRows] = useState([]); // 행 데이터 상태 관리
  const [filteredRows, setFilteredRows] = useState([]); // 필터링된 행 상태 관리
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || ''); // 검색어 상태 관리

  // URL 쿼리 파라미터에서 현재 페이지 번호 가져오기
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    axios.get('http://localhost:8080/honeypot/')
      .then(response => {
        console.log('API Response:', response.data); // 디버깅을 위한 로그
        setRows(response.data.honeypotInfo); // honeypotInfo가 null일 경우 빈 배열로 설정
        setFilteredRows(response.data.honeypotInfo);
      })
      .catch(error => console.error('There was an error fetching the honeypot data!', error));
  }, []);

  useEffect(() => {
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm); // 검색어가 있으면 검색 수행
    } else {
      setFilteredRows(rows); // 검색어가 없으면 전체 행 설정
    }
    setPage(currentPage); // 현재 페이지 설정
  }, [currentPage, location.state?.searchTerm, rows]);

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
    if(newPage === 1) {
      navigate('/honeypot', { state: { searchTerm } });
    } else {
      navigate(`/honeypot?page=${newPage}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 변경
  };

  const handleSearch = (term = searchTerm) => {
    const filtered = rows.filter(row =>
      row.title.toLowerCase().includes(term.toLowerCase()) || row.honeypotCode.toString().includes(term)
    );
    setFilteredRows(filtered); // 필터링된 행 설정
    navigate(`/honeypot?page=${page}`, { state: { searchTerm: term } }); // 검색 결과 페이지로 이동
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Enter 키를 누르면 검색 수행
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
    <Box className="honeypot-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">
          허니팟 관리 전체 조회
        </Typography>
        <Box className="actions-container">
          <TextField
            variant="outlined"
            placeholder="제목 또는 허니팟 코드 검색"
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

      <Box className="honeypot-table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">허니팟</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">제목</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">등록일자</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">신고건수</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">관리</TableCell>
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
            sx={{
              '.MuiPaginationItem-root': {
                color: 'primary',
                '&.Mui-selected': {
                  backgroundColor: '#FFB755',
                  color: '#fff',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Honeypot;
