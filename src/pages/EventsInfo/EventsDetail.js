
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import './EventsDetail.css';
import EventInfo from '../../components/admin/EventInfo';
import EventForm from '../../components/admin/EventForm';
import EventEdit from '../../components/admin/EventEdit';

function EventsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const {type} = location.state;

  return (
    <Box className="event-detail-container">
      <div className="wrapper">
        {/* 전시 / 공연 정보 조회 */}
        <div className="contents_cont">
          <div className="event_sec_box">
            <div className="event_sec">
              <p className="sec_tit">얼리버드 공연/전시 정보 {type == "detail" ? null : type == "edit" ? "수정" : "등록"}</p>
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
