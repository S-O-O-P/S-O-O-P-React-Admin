import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import '../../pages/Inquiry/Inquiry.css';

function InquiryTable({ inquiries, rowsPerPage, onInquiryClick }) {
  return (
    <TableContainer component={Paper} className="inquiry-table-container">
      <Table className="inquiry-table">
        <TableHead className="inquiry-table-head">
          <TableRow>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>문의코드</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>제목</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>유형</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>작성일</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.inquiryCode} className="inquiry-table-row">
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.inquiryCode}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}  onClick={() => onInquiryClick(inquiry)} style={{ cursor: 'pointer' }}>{inquiry.title}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.category}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>{inquiry.inquiryDate}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                <Box className={`status-cells ${inquiry.answerStatus === '미답변' ? 'inactive-status' : ''}`}>
                {inquiry.answerStatus}
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
