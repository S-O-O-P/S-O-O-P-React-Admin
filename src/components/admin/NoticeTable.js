import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './Table.css'; // 공통 CSS 파일 임포트
import { useNavigate } from 'react-router-dom';

function NoticeTable({ notices }) {

  const navigate = useNavigate();

  // 상세페이지 클릭 핸들러
  const handleRowClick = (id, type) => {
    navigate(`/notice/${id}`, { state: { type } });
  };

  // 수정 버튼 클릭 핸들러
  const handleUpdateClick = (id, type) => {
    navigate(`/notice/${id}`, { state: { type } });
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head-cell">No</TableCell>
            <TableCell className="table-head-cell">제목</TableCell>
            <TableCell className="table-head-cell">등록일자</TableCell>
            {/* <TableCell className="table-head-cell">조회</TableCell> */}
            <TableCell className="table-head-cell">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice, index) => (
            <TableRow key={notice.noticeCode} className="table-row">
              <TableCell className="table-cell">{notice.displayOrder}</TableCell>
              <TableCell onClick={() => handleRowClick(notice.noticeCode, "detail")} className="table-cell">{notice.title}</TableCell>
              <TableCell className="table-cell">{notice.regDate}</TableCell>
              {/* <TableCell className="table-cell">{notice.views}</TableCell> */}
              <TableCell className="table-cell">
                <Button
                  variant="outlined"
                  className='manage'
                  onClick={() => handleUpdateClick(notice.noticeCode, "edit")}
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