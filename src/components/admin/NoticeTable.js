import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../../pages/Notice/Notice.css';

function NoticeTable({ notices }) {
  const handleRowClick = (id) => {
    // Handle row click if needed
  };

  return (
    <TableContainer component={Paper} className="notice-table-container">
      <Table className="notice-table">
        <TableHead className="notice-table-head">
          <TableRow>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>no</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>제목</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>등록일자</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>조회</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', color:'white' }}>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id} className="notice-table-row">
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{notice.id}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{notice.title}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{notice.date}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{notice.views}</TableCell>
              <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                <Button variant="outlined" className='manage' onClick={() => handleRowClick(notice.id)}>{notice.manage}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NoticeTable;
