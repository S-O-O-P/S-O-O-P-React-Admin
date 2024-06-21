import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable';
import { useNavigate, useLocation } from 'react-router-dom';
import './Honeypot.css';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Checkbox, Button } from '@mui/material';

const initialRows = [
  { no: 37, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 3, status: '활성화' },
  { no: 36, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 35, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 34, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 33, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 32, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 31, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 30, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 29, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 28, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 27, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 26, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 25, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 24, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 23, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 22, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 21, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 20, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 19, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
  { no: 18, title: 'XX 같이 볼사람 1', date: '2024-06-03', report: 0, status: '활성화' },
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

  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleSelectRow = (no) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(no)
        ? prevSelectedRows.filter(selectedNo => selectedNo !== no)
        : [...prevSelectedRows, no]
    );
  };

  const handleToggleSelected = () => {
    const newStatus = rows.find(row => selectedRows.includes(row.no) && row.status === '활성화')
      ? '비활성화'
      : '활성화';
    setRows(prevRows =>
      prevRows.map(row =>
        selectedRows.includes(row.no)
          ? { ...row, status: newStatus }
          : row
      )
    );
    setSelectedRows([]);
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
      <Button onClick={handleToggleSelected} disabled={selectedRows.length === 0}>
        {selectedRows.length > 0 && rows.find(row => selectedRows.includes(row.no) && row.status === '활성화')
          ? '비활성화로 변경'
          : '활성화로 변경'}
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">
                <Checkbox
                  checked={selectedRows.length === displayedRows.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < displayedRows.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(displayedRows.map(row => row.no));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </TableCell>
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
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
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