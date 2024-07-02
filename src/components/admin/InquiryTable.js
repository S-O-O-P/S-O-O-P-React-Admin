import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import '../admin/Table.css' // 공통 CSS 파일 임포트

function InquiryTable({ inquiries, rowsPerPage, onInquiryClick }) {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head-cell">문의코드</TableCell>
            <TableCell className="table-head-cell">제목</TableCell>
            <TableCell className="table-head-cell">유형</TableCell>
            <TableCell className="table-head-cell">작성일</TableCell>
            <TableCell className="table-head-cell">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.inquiryCode}>
              <TableCell className="table-cell">{inquiry.inquiryCode}</TableCell>
              <TableCell className="table-cell" onClick={() => onInquiryClick(inquiry)} style={{ cursor: 'pointer' }}>{inquiry.title}</TableCell>
              <TableCell className="table-cell">{inquiry.category}</TableCell>
              <TableCell className="table-cell">{inquiry.inquiryDate}</TableCell>
              <TableCell className="table-cell">
                <Box className={`manage ${inquiry.answerStatus === '답변대기' ? 'inactive-status' : ''}`}>
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
