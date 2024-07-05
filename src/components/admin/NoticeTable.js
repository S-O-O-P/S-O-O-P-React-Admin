import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './Table.css'; // 공통 CSS 파일 임포트

function NoticeTable({ notices }) {
  const handleRowClick = (noticeCode) => {
    // Handle row click if needed
    console.log(`Row clicked: ${noticeCode}`);
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head-cell">No</TableCell>
            <TableCell className="table-head-cell">제목</TableCell>
            <TableCell className="table-head-cell">등록일자</TableCell>
            <TableCell className="table-head-cell">조회</TableCell>
            <TableCell className="table-head-cell">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice, index) => (
            <TableRow key={notice.noticeCode} className="table-row">
              <TableCell className="table-cell">{index + 1}</TableCell>
              <TableCell className="table-cell">{notice.title}</TableCell>
              <TableCell className="table-cell">{notice.regDate}</TableCell>
              <TableCell className="table-cell">{notice.userCode}</TableCell>
              <TableCell className="table-cell">
                <Button
                  variant="outlined"
                  className='manage'
                  onClick={() => handleRowClick(notice.noticeCode)}
                >
                  수정
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NoticeTable;

