import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable'; // HoneypotTable 컴포넌트 임포트
import { useNavigate, useLocation } from 'react-router-dom';
import './Honeypot.css'; // CSS 파일 임포트
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, InputAdornment, Button} from '@mui/material';

// 초기 행 데이터
const initialRows = [
  { no: 37, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 3, status: '활성화' },
  { no: 36, title: 'XX 같이 볼사람 2', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 35, title: 'XX 같이 볼사람 3', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 34, title: 'XX 같이 볼사람 4', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 33, title: 'XX 같이 볼사람 5', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 32, title: 'XX 같이 볼사람 6', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 31, title: 'XX 같이 볼사람 7', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 30, title: 'XX 같이 볼사람 8', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 29, title: 'XX 같이 볼사람 9', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 28, title: 'XX 같이 볼사람 10', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 27, title: 'XX 같이 볼사람 11', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 26, title: 'XX 같이 볼사람 12', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 25, title: 'XX 같이 볼사람 13', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 24, title: 'XX 같이 볼사람 14', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 23, title: 'XX 같이 볼사람 15', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 22, title: 'XX 같이 볼사람 16', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 21, title: 'XX 같이 볼사람 17', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 20, title: 'XX 같이 볼사람 18', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 19, title: 'XX 같이 볼사람 19', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 18, title: 'XX 같이 볼사람 20', date: '2024-06-03', report: 0, status: '활성화' },
];

// Honeypot 컴포넌트
function Honeypot() {
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const rowsPerPage = 5; // 페이지 당 행 수 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const location = useLocation(); // 현재 위치 정보
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('initialRows');
    return savedRows ? JSON.parse(savedRows) : initialRows; // 로컬 스토리지에서 초기 행 데이터 로드
  });

  const [filteredRows, setFilteredRows] = useState(rows); // 필터링된 행 상태 관리
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || ''); // 검색어 상태 관리

  // URL 쿼리 파라미터에서 현재 페이지 번호 가져오기
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm); // 검색어가 있으면 검색 수행
    } else {
      setFilteredRows(rows); // 검색어가 없으면 전체 행 설정
    }
    setPage(currentPage); // 현재 페이지 설정
  }, [currentPage, location.state?.searchTerm, rows]);

  useEffect(() => {
    if (location.state?.toggleStatus) {
      setRows(prevRows =>
        prevRows.map(row =>
          row.no === location.state.toggleStatus.no ? { ...row, status: location.state.toggleStatus.newStatus } : row
        )
      );
      navigate(location.pathname + location.search, { replace: true, state: { searchTerm: location.state.searchTerm } });
    }
  }, [location.state, navigate, location.pathname, location.search]);

  useEffect(() => {
    localStorage.setItem('initialRows', JSON.stringify(rows)); // 로컬 스토리지에 초기 행 데이터 저장
  }, [rows]);

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
      row.title.toLowerCase().includes(term.toLowerCase())
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

  const handleRowClick = (no, status) => {
    navigate(`/honeypot/${no}`, { state: { from: location.pathname + location.search, searchTerm, page, status } });
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
            placeholder="제목 검색"
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
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">no</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">제목</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">등록일자</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">신고건수</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }} align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <HoneypotTable
                key={row.no}
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
