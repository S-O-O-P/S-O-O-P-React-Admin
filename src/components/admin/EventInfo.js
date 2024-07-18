import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/EventsDetail.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useEffect, useState } from 'react';
import EventsInfoApi from '../../apis/EventsInfoApi';

export default function EventInfo({id}){
  const [open, setOpen] = useState(false); // 팝업 활성화 여부 - 비활성화 초기화
  const [events, setEvents] = useState({});
  const [detailInfo, setDetailInfo] = useState(""); // 상세 정보

  useEffect(
    () => {
      if(id){
        //얼리버드 공연/전시 상세 조회 api 호출
        EventsInfoApi({setEvents}, "detail", id);
        console.log("events detail : ",events);
      }
    },[id]
  );

  useEffect(
    () => {
      if (events && Object.keys(events).length > 0) {
        // setDetailInfo(events?.ebContent);
        setDetailInfo((events?.ebContent).replaceAll("<br>", `\n`));
      }
    },[events]
  );

  // Dialog 열기 핸들러
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Dialog 닫기 핸들러
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (id, type) => {
    navigate(`/events/${id}`, {state: {type}});
  };

  // 등록 요청 Insert api 호출
  const callDeleteApi = () => {
    EventsInfoApi({ setEvents }, "delete", id);
  };

  const navigate = useNavigate();

  // 가격 , 붙이기
  const formatPrice = (dPrice) => {
    // console.log(typeof dPrice);
    const endPrice = (dPrice?.toString()).slice(-3);
    const startPirce = (dPrice?.toString()).slice(0, -3);
    return startPirce+','+endPrice;
  }

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

  // 날짜 형식 변경
  function formatDate(date) {
    var writtenDate = new Date(date),
      month = '' + (writtenDate?.getMonth() + 1),
      day = '' + writtenDate?.getDate(),
      year = writtenDate?.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('.');
  }

  return(
    <>
      <div className="fill_in_box">
        <ul className="fill_list">
          <li className="genre_category">
            <span className="fill_item_tit">카테고리</span>
            <div className="fill_contxt">              
              <p>{categoryString(events?.interestCode)}</p>
            </div>
          </li>
          {/* // 장르 카테고리 필터*/}        
  
          <li className="event_place">
            <span className="fill_item_tit">지역</span>
            <div className="fill_contxt">
              <p>{events?.region}</p>
            </div>
          </li>
          {/* // 공연/전시 장소 */}
  
          <li className="event_place">
            <span className="fill_item_tit">관람 장소</span>
            <div className="fill_contxt">
              <p>{events?.place}</p>
            </div>
          </li>
          {/* // 공연/전시 장소 */}
  
          <li className="event_age">
            <span className="fill_item_tit">관람 연령</span>
            <div className="fill_contxt">
              <p>{events?.ageLimit}</p>
            </div>
          </li>
          {/* // 공연/전시 관람연령 */}
          
          <li className="event_price">
            <span className="fill_item_tit"> 할인 가격</span>
            <div className="fill_contxt">
              <p>{events?.discountPrice != undefined ? formatPrice(events?.discountPrice) : "가격정보를 가져오는 중입니다."} 원</p>
            </div>
          </li>
          {/* // 공연/전시 얼리버드 가격 */}  
  
          <li className="event_price">
            <span className="fill_item_tit">일반 가격</span>
            <div className="fill_contxt">
              <p>{events?.regularPrice != undefined ? formatPrice(events?.regularPrice) : "가격정보를 가져오는 중입니다."} 원</p>
            </div>
          </li>
          {/* // 공연/전시 가격 */}      
  
          <li className="event_period buy_ticket">
            <span className="fill_item_tit">예매 기간</span>
            <ul className="flex_start">
              <li>
                <span>시작</span>
                <div className="fill_contxt">
                  <p>{formatDate(events?.saleStartDate)}</p>
                </div>
              </li>
              <li>
                <span>마감</span>
                <div className="fill_contxt">
                  <p>{formatDate(events?.saleEndDate)}</p>
                </div>
              </li>
            </ul>
            {/* 시간 정보 입력 */}
          </li>
          {/* // 얼리버드 티켓 예매 기간 선택 */}
  
          <li className="event_period">
            <span className="fill_item_tit">사용기한</span>
            <ul className="flex_start">
              <li>
                <span>시작</span>
                <div className="fill_contxt">
                  <p>{formatDate(events?.usageStartDate)}</p>
                </div>
              </li>
              <li>
                <span>마감</span>
                <div className="fill_contxt">
                  <p>{formatDate(events?.usageEndDate)}</p>
                </div>
              </li>
            </ul>
          </li>
          {/* // 공연/전시 관람기간 */}
  
          <li className="event_purchase">
            <span className="fill_item_tit">예매처 정보</span>
            <ul className="purchase_place_info saved flex_start">
              <li>
                <div className="fill_contxt">
                  <p>{events?.seller}</p>
                </div>
              </li>
              <li>
                <div className="fill_contxt">
                  <p>{events?.sellerLink}</p>
                </div>
              </li>
            </ul>
          </li>
          {/* // 공연/전시 예매처 */}     
          
          <li className="event_tit">
            <span className="fill_item_tit">제목</span>
            <div className="fill_contxt">
              <p>{events?.ebTitle}</p>
            </div>
          </li>
          {/* // 공연/전시 제목 */}
        </ul>
        <div className="event_detail_box">
          <div className="event_detail_saved">   
            <p className="event_detail_text">{detailInfo}</p>            
            {/* <p className="event_detail_text">{events?ebContent != undefined ? ((events?.ebContent).replaceAll("<br>", "\r\n").replaceAll("<br>", "\n").replaceAll("<br>", "\r")) : "상세 내용을 로딩중입니다" : "상세 내용을 로딩중입니다"}</p>             */}
  
            {/* 업로드 된 이미지 영역 */}
            <ul className="uploaded_img_list">
              <li><img src={events?.poster != null ? events?.poster : `${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="poster"/></li>
            </ul>
          </div>
        </div>
  
  
        {/* 목록 / 취소 / 등록 버튼 영역 */}
        <ul className="btn_list flex_between">
          <li><span className="negative_btn" onClick={() => navigate(-1)}>목록</span></li>
          <li className="flex_start">
            <span  className="negative_btn cancel" onClick={() => {handleClickOpen();}}>삭제</span>
            <button type="button" className="register_btn" onClick={() => handleEditClick(id, "edit")}>수정</button>
            {/* navigate(`/events/${id}`, {state: "edit"}) */}
          </li>
        </ul>
      </div>
      {/* 삭제 버튼 클릭시, 팝업창 */}
      <Dialog open={open} onClose={handleClose} className='custom_dialog_box'>
        <DialogContent className="custom-dialog-content">
          <img src="/images/commons/icon_alert.png" alt="icon" className="dialog-icon" />
          <DialogContentText className="dialog-text">
            해당 공연/전시 정보를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="custom-dialog-actions">
          <Button onClick={handleClose} className="custom-cancel-button two_button">
            취소
          </Button>
          <Button onClick={() => {handleClose(); callDeleteApi(); navigate("/events");}} className="custom-confirm-button two_button" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>    
  );
}