import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from '../../components/admin/CustomerTable';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, InputBase, Typography } from '@mui/material';


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
    console.log("Searching for:", term); // Add logging
    console.log("Members:", members); // Log the members to inspect userCodes

    const filtered = members.filter(member =>
      member.nickname.toString().toLowerCase().includes(term.toLowerCase())
    );

    console.log("Filtered members:", filtered); // Add logging
    setFilteredMembers(filtered);
    setPage(1); // Reset to first page on search
    if (page === 1) {
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
    handleSearch(); // Perform search on button click
  };

  return (
    <Box className="common-container">
      <Box className="header-container">
        <Typography variant="h5" className="table-titles">회원 관리</Typography>
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
