import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../../pages/Customer/Customer.css'; // Ensure you have the appropriate styles

function CustomerTable({ members, page, rowsPerPage, handlePageChange }) {
  const location = useLocation();
  const paginatedMembers = members.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-head-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white'}} >회원코드</TableCell>
              <TableCell align="center" className="table-head-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>닉네임</TableCell>
              <TableCell align="center" className="table-head-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>성별</TableCell>
              <TableCell align="center" className="table-head-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>이메일</TableCell>
              <TableCell align="center" className="table-head-cell" sx={{color:'white'}}>가입일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembers.map((member, index) => (
              <TableRow key={index} className="customer-table-row">
                <TableCell align="center" className="table-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.userCode}</TableCell>
                <TableCell align="center" className="table-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                  <Link to={`/customer/${member.userCode}`} state={{ from: `${location.pathname}${location.search}`, searchTerm: location.state?.searchTerm }} className="link">
                    {member.nickname}
                  </Link>
                </TableCell>
                <TableCell align="center" className="table-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.gender}</TableCell>
                <TableCell align="center" className="table-cell" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{member.email}</TableCell>
                <TableCell align="center" className="table-cell">{member.signupDate}</TableCell>
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
