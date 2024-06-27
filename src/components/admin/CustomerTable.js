import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../../pages/Customer/Customer.css'; // Ensure you have the appropriate styles

// CustomerTable 컴포넌트
function CustomerTable({ members, page, rowsPerPage, handlePageChange }) {
  const location = useLocation(); // 현재 위치 정보
  const paginatedMembers = members.slice((page - 1) * rowsPerPage, page * rowsPerPage); // 현재 페이지에 표시할 회원 목록

  return (
    <Box className="member-table-container">
      <TableContainer component={Paper}>
        <Table className='table'>
          <TableHead className='table-content'>
            <TableRow>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>회원코드</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>닉네임</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>성별</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>이메일</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>가입일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembers.map((member, index) => (
              <TableRow key={index} className='customer-table-row'>
                <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                  <Link to={`/customer/${member.userCode}`} state={{ from: location.pathname + location.search, searchTerm: location.state?.searchTerm }} className="link">
                    {member.userCode}
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.nickname}</TableCell>
                <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.gender}</TableCell>
                <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.email}</TableCell>
                <TableCell align="center">{member.signupDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(members.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        className="pagination"
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
  );
}

export default CustomerTable;
