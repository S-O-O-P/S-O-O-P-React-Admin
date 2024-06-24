import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import './EventsDetail.css';

const initialEvents = [
  { id: 1, category: '뮤지컬', title: '뮤지컬 (디어 에반 헨슨) - 부산 (Dear Evan Hansen)', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-12', manage: '수정' },
  { id: 2, category: '전시회', title: '서울 아트쇼 800회 특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
  // Add more events as needed
];

function EventsDetail() {
  const { id } = useParams();
  const event = initialEvents.find(event => event.id === parseInt(id));

  if (!event) {
    return (
      <Box className="error-container">
        <Typography variant="h4" color="#FFB755">해당 공연/전시 정보를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box className="event-detail-container">
      <Typography variant="h4" className="event-title">{event.title}</Typography>
      <Typography variant="h6" className="event-category">구분: {event.category}</Typography>
      <Typography variant="body1" className="event-ticketOpenDate">티켓 오픈 일시: {event.ticketOpenDate}</Typography>
      <Typography variant="body1" className="event-createdAt">작성일: {event.createdAt}</Typography>
    </Box>
  );
}

export default EventsDetail;
