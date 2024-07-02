import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from '../../components/admin/CustomerTable';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box, Button, InputAdornment, Typography } from '@mui/material';

function Customer() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);

  const [page, setPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:8080/customer/')
      .then(response => {
        console.log('API Response:', response.data); // Debugging statement
        const filteredUsers = response.data.usersInfo.filter(user => user.userRole !== 'ADMIN');
        setMembers(filteredUsers);
        setFilteredMembers(filteredUsers);
      })
      .catch(error => console.error('There was an error fetching the members!', error));
  }, []);

  useEffect(() => {
    setFilteredMembers(members);
    setPage(currentPage);
  }, [members, currentPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if(value === 1) {
      navigate('/customer', { state: { searchTerm } });
    } else {
      navigate(`/customer?page=${value}`, { state: { searchTerm } });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (term = searchTerm) => {
    console.log("Searching for:", term); // Add logging
    console.log("Members:", members); // Log the members to inspect userCodes

    const filtered = members.filter(member =>
      member.nickname.toString().toLowerCase().includes(term.toLowerCase())
    );

    console.log("Filtered members:", filtered); // Add logging
    setFilteredMembers(filtered);
    setPage(1); // Reset to first page on search
    if(page === 1) {
      navigate('/customer', { state: { searchTerm } });
    } else {
      navigate(`/customer?page=${page}`, { state: { searchTerm } });
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

  return (
    <Box className="customer-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-title">회원 전체 조회</Typography>
        <Box className="actions-container">
          <TextField
            placeholder='회원 이름 검색'
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="search-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearchClick}>
                    <img src="/images/admin/icon_search.png" alt="search" />
                  </Button>
                </InputAdornment>
              ),
              style: { borderRadius: 20, border: '1px solid #FFB755' },
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFB755',
                },
              },
            }}
          />
        </Box>
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





