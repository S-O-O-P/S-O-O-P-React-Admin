
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import './EventsDetail.css';
import EventInfo from '../../components/admin/EventInfo';
import EventForm from '../../components/admin/EventForm';
import EventEdit from '../../components/admin/EventEdit';

const initialEvents = [
  { id: 1, category: '뮤지컬', title: '뮤지컬 (디어 에반 헨슨) - 부산 (Dear Evan Hansen)', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-12', manage: '수정' },
  { id: 2, category: '전시회', title: '서울 아트쇼 800회 특별전', ticketOpenDate: '2024.08.20(화) 12:00', createdAt: '2024-04-10', manage: '수정' },
  // Add more events as needed
];


function EventsDetail() {
  const { type, id } = useParams();
  const event = initialEvents.find(event => event.id === parseInt(id));

  if (!event) {
    if(id == 0) {

    } else {
      return (
      <Box className="error-container">
        <Typography variant="h4" color="#FFB755">해당 공연/전시 정보를 찾을 수 없습니다.</Typography>
      </Box>
      );
    }    
  }

  return (
    <Box className="event-detail-container">
      <div className="wrapper">
        {/* 전시 / 공연 정보 조회 */}
        <div className="contents_cont">
          <div className="event_sec_box">
            <div className="event_sec">
              <p className="sec_tit">공연/전시 정보 {type == "detail" ? null : type == "edit" ? "수정" : "등록"}</p>
              {type == "detail" ? EventInfo(id) : type == "edit" ? EventEdit(id) : EventForm()}
              {/* // 공연/전시 정보 등록 form */}
              
            </div>
          </div>
        </div>
        {/* // 전시 / 공연 정보 등록 */}
      </div>
    </Box>
  );
}

export default EventsDetail;
