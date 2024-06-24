import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable';
import { useNavigate, useLocation } from 'react-router-dom';
import './Honeypot.css';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, InputAdornment, Button} from '@mui/material';

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

function Honeypot() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('initialRows');
    return savedRows ? JSON.parse(savedRows) : initialRows;
  });

  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

  // Get the current page number from the URL query parameters
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm);
    } else {
      setFilteredRows(rows);
    }
    setPage(currentPage);
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
    localStorage.setItem('initialRows', JSON.stringify(rows));
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(newPage===1) {
      navigate('/honeypot', { state: { searchTerm } });
    } else {
      navigate(`/honeypot?page=${newPage}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (term = searchTerm) => {
    const filtered = rows.filter(row =>
      row.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRows(filtered);
    navigate(`/honeypot?page=${page}`, { state: { searchTerm: term } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleRowClick = (no, status) => {
    navigate(`/honeypot/${no}`, { state: { from: location.pathname + location.search, searchTerm, page, status } });
  };

  const displayedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box component="main" className="honeypot-main">
      <Box className="honeypot-header">
        <Typography variant="h5" component="div">
          허니팟 관리 전체 조회
        </Typography>
        <Box className="honeypot-search">
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
              style: { borderRadius: 20, border: '1px solid #FFB755' }
            }}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
  );
}

export default Honeypot;
