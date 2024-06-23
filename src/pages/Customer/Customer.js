import React, { useState, useEffect } from 'react';
import CustomerTable from '../../components/admin/CustomerTable';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box, Button, InputAdornment, Typography } from '@mui/material';

function Customer() {
  const members = [
    { id: 'user001', nickname: 'userone', gender: '남', email: 'userone@gmail.com', date: '2024-06-23' },
    { id: 'user002', nickname: 'usertwo', gender: '여', email: 'usertwo@gmail.com', date: '2024-06-23' },
    { id: 'user003', nickname: 'userthree', gender: '남', email: 'userthree@gmail.com', date: '2024-06-23' },
    { id: 'user004', nickname: 'userfour', gender: '여', email: 'userfour@gmail.com', date: '2024-06-23' },
    { id: 'user005', nickname: 'userfive', gender: '남', email: 'userfive@gmail.com', date: '2024-06-23' },
    { id: 'user006', nickname: 'usersix', gender: '여', email: 'usersix@gmail.com', date: '2024-06-23' },
    { id: 'user007', nickname: 'userseven', gender: '남', email: 'userseven@gmail.com', date: '2024-06-23' },
    { id: 'user008', nickname: 'usereight', gender: '여', email: 'usereight@gmail.com', date: '2024-06-23' },
    // Add more members here...
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [filteredMembers, setFilteredMembers] = useState(members);

  const rowsPerPage = 5;

  useEffect(() => {
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm);
    } else {
      setFilteredMembers(members);
    }
    setPage(currentPage);
  }, [currentPage, location.state?.searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      navigate('/customer', { state: { searchTerm } });
    } else {
      navigate(`/customer?page=${value}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (term = searchTerm) => {
    const filtered = members.filter(member =>
      member.id.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMembers(filtered);
    navigate(`/customer?page=${page}`, { state: { searchTerm: term } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  return (
    <Box className="customer-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">회원 전체 조회</Typography>
       
          <TextField
           placeholder='회원 코드 검색'
            variant="outlined"
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
      <CustomerTable
        members={filteredMembers}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
}

export default Customer;
