import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../pages/Events/Events.css';

function EventTable({ events }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/events/${id}`);
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
                <Button variant="outlined" className="manage" onClick={() => handleRowClick(event.id)} sx={{cursor:'pointer'}}>{event.manage}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
