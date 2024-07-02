import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/Events.css'; // CSS 파일 임포트

// EventTable 컴포넌트
function EventTable({ events }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 행 클릭 핸들러
  const handleRowClick = (id) => {
    navigate(`/events/detail/${id}`);
  };
  // 수정 버튼 클릭 핸들러
  const handleUpdateClick = (id) => {
    navigate(`/events/edit/${id}`);
  };

  return (
    <TableContainer component={Paper} className="event-table-container">
      <Table className="events-table">
        <TableHead className="events-table-head">
          <TableRow>
            <TableCell align="center" className="table-cell" sx={{color:'white'}}>구분</TableCell>
            <TableCell align="center" className="table-cell" sx={{color:'white'}}>제목</TableCell>
            <TableCell align="center" className="table-cell" sx={{color:'white'}}>티켓오픈일시</TableCell>
            <TableCell align="center" className="table-cell" sx={{color:'white'}}>작성일</TableCell>
            <TableCell align="center" className="table-cell" sx={{color:'white'}}>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="events-table-row" >
              <TableCell align="center" className="table-cell">{event.category}</TableCell>
              <TableCell align="center" className="table-cell" onClick={() => handleRowClick(event.id)} sx={{cursor:'pointer'}}>{event.title}</TableCell>
              <TableCell align="center" className="table-cell">{event.ticketOpenDate}</TableCell>
              <TableCell align="center" className="table-cell">{event.createdAt}</TableCell>
              <TableCell align="center" className="table-cell">
                <Button variant="outlined" className="manage" onClick={() => handleUpdateClick(event.id)} sx={{cursor:'pointer'}}>{event.manage}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
