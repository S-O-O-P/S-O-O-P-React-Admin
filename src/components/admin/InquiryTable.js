import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import '../../pages/Inquiry/Inquiry.css';

function InquiryTable({ inquiries }) {
  const handleRowClick = (id) => {
    // Handle row click if needed
  };

  return (
    <TableContainer component={Paper} className="inquiry-table-container">
      <Table className="inquiry-table">
        <TableHead className="inquiry-table-head">
          <TableRow>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>no</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>제목</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>구분</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>작성일</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="inquiry-table-row">
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.id}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.title}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.category}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.date}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                <Box onClick={() => handleRowClick(inquiry.id)}  className={`status-cell ${inquiry.manage === '미답변' ? 'inactive-status' : ''}`}>
                {inquiry.manage}
        </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InquiryTable;
