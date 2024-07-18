import React, { useState, useEffect } from 'react';
import HoneypotTable from '../../components/admin/HoneypotTable';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button, InputBase } from '@mui/material';
import { fetchHoneypots } from '../../apis/HoneypotAPI';

function Honeypot() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const rowsPerPage = 5;
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [activeSearchTerm, setActiveSearchTerm] = useState(location.state?.searchTerm || '');

  useEffect(() => {
    fetchHoneypots()
      .then(data => {
        console.log('API Response:', data);
        setRows(data);
        setFilteredRows(data);
      })
      .catch(error => console.error('There was an error fetching the honeypot data!', error));
  }, []);

  useEffect(() => {
    const filtered = rows.filter(row =>
      row.honeypotTitle && row.honeypotTitle.toLowerCase().includes(activeSearchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [activeSearchTerm, rows]);

  useEffect(() => {
    if (location.state?.toggleStatus) {
      setRows(prevRows =>
        prevRows.map(row =>
          row.honeypotCode === location.state.toggleStatus.honeypotCode
            ? { ...row, visibilityStatus: location.state.toggleStatus.newStatus }
            : row
        )
      );
      navigate(location.pathname + location.search, {
        replace: true,
        state: { searchTerm: location.state.searchTerm, page: location.state.page }
      });
    }
  }, [location.state, navigate, location.pathname, location.search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage === 1) {
      navigate('/honeypot', { state: { searchTerm: activeSearchTerm } });
    } else {
      navigate(`/honeypot?page=${newPage}`, { state: { searchTerm: activeSearchTerm, page: newPage } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    setActiveSearchTerm(searchTerm);
    if (page === 1) {
      navigate('/honeypot', { state: { searchTerm } });
    } else {
      navigate(`/honeypot?page=${page}`, { state: { searchTerm } });
    }
  };



  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleRowClick = (honeypotCode, displayOrder) => {
    navigate(`/honeypot/${honeypotCode}`, {
      state: { from: location.pathname + location.search, searchTerm: activeSearchTerm, page, displayOrder }
    });
  };

  const displayedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">
          허니팟 관리
        </Typography>
        <Box className="actions-container">
          <Box className="search-box">
            <InputBase
              className="search-input"
              placeholder='제목 검색'
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
              <TableCell className="table-head-cell" align="center">no</TableCell>
              <TableCell className="table-head-cell" align="center">제목</TableCell>
              <TableCell className="table-head-cell" align="center">등록일자</TableCell>
              <TableCell className="table-head-cell" align="center">신고건수</TableCell>
              <TableCell className="table-head-cell" align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <HoneypotTable
                key={row.honeypotCode}
                row={row}
                handleRowClick={() => handleRowClick(row.honeypotCode, (page - 1) * rowsPerPage + index)}
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
