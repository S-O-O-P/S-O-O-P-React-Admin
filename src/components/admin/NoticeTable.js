import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../admin/Table.css'// 공통 CSS 파일 임포트

function NoticeTable({ notices }) {
  const handleRowClick = (id) => {
    // Handle row click if needed
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head-cell">no</TableCell>
            <TableCell className="table-head-cell">제목</TableCell>
            <TableCell className="table-head-cell">등록일자</TableCell>
            <TableCell className="table-head-cell">조회</TableCell>
            <TableCell className="table-head-cell">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id} className="table-row">
              <TableCell className="table-cell">{notice.id}</TableCell>
              <TableCell className="table-cell">{notice.title}</TableCell>
              <TableCell className="table-cell">{notice.date}</TableCell>
              <TableCell className="table-cell">{notice.views}</TableCell>
              <TableCell className="table-cell">
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
