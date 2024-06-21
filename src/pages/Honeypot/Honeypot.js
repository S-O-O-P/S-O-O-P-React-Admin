import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable';
import { useNavigate, useLocation } from 'react-router-dom';
import './Honeypot.css';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button } from '@mui/material';

const initialRows = [
  // Your initial rows data here
];

function Honeypot() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : initialRows;
  });

  // Get the current page number from the URL query parameters
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.toggleStatus) {
      setRows(prevRows =>
        prevRows.map(row =>
          row.no === location.state.toggleStatus.no ? { ...row, status: location.state.toggleStatus.newStatus } : row
        )
      );
      navigate(location.pathname + location.search, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname, location.search]);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage === 1) {
      navigate('/honeypot');
    } else {
      navigate(`/honeypot?page=${newPage}`);
    }
  };

  const handleRowClick = (no, status) => {
    navigate(`/honeypot/${no}`, { state: { from: location.pathname + location.search, status } });
  };

  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
            className="search-field"
            InputProps={{
              endAdornment: (
                <img src="images/admin/icon_search.png" alt="search" />
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
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">no</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">제목</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">등록일자</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">신고건수</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">관리</TableCell>
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
          count={Math.ceil(rows.length / rowsPerPage)}
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
