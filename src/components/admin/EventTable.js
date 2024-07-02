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
            <TableRow key={event.id}>
              <TableCell className="table-cell">{event.category}</TableCell>
              <TableCell onClick={() => handleRowClick(event.id)} className="table-cell" style={{ cursor: 'pointer' }}>{event.title}</TableCell>
              <TableCell className="table-cell">{event.ticketOpenDate}</TableCell>
              <TableCell className="table-cell">{event.createdAt}</TableCell>
              <TableCell className="table-cell">
                <Button variant="outlined" className="manage" onClick={() => handleRowClick(event.id)}>{event.manage}</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
