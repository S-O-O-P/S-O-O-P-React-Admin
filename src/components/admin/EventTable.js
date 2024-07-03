import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../admin/Table.css'// CSS 파일 임포트

function EventTable({ events }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  const handleRowClick = (id) => {
    navigate(`/events/detail/${id}`);
  };
  // 수정 버튼 클릭 핸들러
  const handleUpdateClick = (id) => {
    navigate(`/events/edit/${id}`);
  };

  // 카테고리 string으로 변환
  const categoryString = (category) => {
    let categoryString = "";
    switch(category){
      case(1) : categoryString = "팝업"; break;
      case(2) : categoryString = "공연"; break;
      case(3) : categoryString = "행사/축제"; break;
      case(4) : categoryString = "전시회"; break;
      case(5) : categoryString = "뮤지컬"; break;
    }
    return categoryString;
  }

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head-cell">구분</TableCell>
            <TableCell className="table-head-cell">제목</TableCell>
            <TableCell className="table-head-cell">티켓오픈일시</TableCell>
            <TableCell className="table-head-cell">작성일</TableCell>
            <TableCell className="table-head-cell">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.earlyBirdCode}>
              <TableCell className="table-cell">{categoryString(event.interestCode)}</TableCell>
              <TableCell onClick={() => handleRowClick(event.earlyBirdCode)} className="table-cell" style={{ cursor: 'pointer' }}>{event.ebTitle}</TableCell>
              <TableCell className="table-cell">{event.saleStartDate}</TableCell>
              <TableCell className="table-cell">{event.dateWritten}</TableCell>
              <TableCell className="table-cell">
                <Button variant="outlined" className="manage" onClick={() => handleRowClick(event.earlyBirdCode)}>수정</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
