import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/EventsDetail.css';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import EventsInfoApi from '../../apis/EventsInfoApi';

export default function EventEdit(id){
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState({});

  useEffect(
    () => {
      //얼리버드 공연/전시 상세 조회 api 호출
      EventsInfoApi({setEvents}, "detail", id);
    },[]
  );

  useEffect(
    () => {
      // events 상태가 업데이트될 때마다 다른 상태 값들을 업데이트
      if (events && Object.keys(events).length > 0) {
        setCategory(categoryString(events?.interestCode));
        setStartBuy(formatDate(events?.saleStartDate));
        setEndBuy(formatDate(events?.saleEndDate));
        setRegion(events?.region);
        setPlace(events?.place);
        setEarlyPrice(events?.discountPrice);
        setPrice(events?.regularPrice);
        setAge(events?.ageLimit);
        setStartUse(formatDate(events?.usageStartDate));
        setEndUse(formatDate(events?.usageEndDate));
        setWhereToBuy(events?.seller);
        setBuyUrl(events?.sellerLink);
        setEarlyTitle(events?.ebTitle);
        setDetailInfo((events?.ebContent).replaceAll("<br>", "\r\n").replaceAll("<br>", "\n").replaceAll("<br>", "\r"));
        setImgUrl(events?.poster);
        setCurrentTextLength(events?.ebContent?.length || 0);
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

  // 카테고리 Number로 변환
  const categoryNumber = (category) => {
    let categoryString = "";
    switch(category){
      case("팝업") : categoryString = 1; break;
      case("공연") : categoryString = 2; break;
      case("행사/축제") : categoryString = 3; break;
      case("전시회") : categoryString = 4; break;
      case("뮤지컬") : categoryString = 5; break;
    }
    return categoryString;
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
      month = '' + (writtenDate.getMonth() + 1),
      day = '' + writtenDate.getDate(),
      year = writtenDate.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('-');
  }

  // db 저장용 날짜 데이터 형식
  function formatDBDate(date) {
    if (!date) return null; // 날짜가 없을 경우 처리
    
    var writtenDate = new Date(date);
    var formattedDate = writtenDate.toISOString(); // ISO 문자열로 변환
    return formattedDate;
  }

  // 수정 요청 Update api 호출
  const callUpdateApi = () => {
    console.log("date type : " + typeof startBuy);
    const eventData = {
      interestCode: categoryNumber(category),
      ebTitle: earlyTitle,
      ebContent: detailInfo.replaceAll("\r\n", "<br>").replaceAll("\n", "<br>").replaceAll("\r", "<br>"),
      // ebContent: detailInfo.replaceAll("\r\n", "<br>").replaceAll("\n", "<br>").replaceAll("\r", "<br>"),
      region: region,
      poster: imgUrl,
      seller: whereToBuy,
      sellerLink: buyUrl,
      regularPrice: price,
      discountPrice: earlyPrice,
      saleStartDate: formatDBDate(startBuy),
      saleEndDate: formatDBDate(endBuy),
      usageStartDate: formatDBDate(startUse),
      usageEndDate: formatDBDate(endUse),
      ageLimit: age,
      dateWritten: new Date().toISOString().split('T')[0],
      place: place,
    };
    console.log("info to be edit : ",eventData);

    EventsInfoApi({ setEvents }, "edit", id, eventData);
  };
  const navigate = useNavigate();
  // 입력 내용 State
  const [category, setCategory] = useState('');
  //const [[]] // 얼리버드 티켓 예매 시작 / 마감
  const [startBuy, setStartBuy] = useState('');
  const [endBuy, setEndBuy] = useState('');
  const [region, setRegion] = useState(''); // 지역
  const [place, setPlace] = useState(''); // 관람 장소
  const [earlyPrice, setEarlyPrice] = useState(''); //얼리버드 가격
  const [price, setPrice] = useState(''); //일반 가격
  const [age, setAge] = useState(''); // 관람 연령
  //const [] // 얼리버드 티켓 사용 기간 시작 / 마감
  const [startUse, setStartUse] = useState('');
  const [endUse, setEndUse] = useState('');
  const [whereToBuy, setWhereToBuy] = useState(''); // 예매처 명
  const [buyUrl, setBuyUrl] = useState(''); // 예매처 링크
  const [earlyTitle, setEarlyTitle] = useState(''); // 제목
  const [detailInfo, setDetailInfo] = useState(''); // 상세 정보
  const [imgUrl, setImgUrl] = useState(''); // 이미지 url
  // const [thumbnail, setThumbnaill] = useState("https://ticketimage.interpark.com/Play/image/etc/24/24007290-02.jpg"); // 썸네일 이미지 url

  const [currentTextLength, setCurrentTextLength] = useState(0); // 상세 정보 입력 글자 실시간 확인

  useEffect(
    () => { 
      
      // 카테고리 리스트
      const genreFilter = document.querySelectorAll(".selected_filter");

      // 카테고리 리스트 아이템 클릭이벤트 
      const genreFilterItem = document.querySelectorAll(".genre_filter_list > ul > li");
      
      genreFilter.forEach(genreBtn => {
        genreBtn.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
          e.currentTarget.classList.contains("active") ? e.currentTarget.classList.remove("active") : e.currentTarget.classList.add("active"); // 클릭한 버튼의 활성화 여부에 따라 active 클래스 추가 또는 삭제
          e.currentTarget.nextElementSibling.classList.contains("active") ? e.currentTarget.nextElementSibling.classList.remove("active") : e.currentTarget.nextElementSibling.classList.add("active"); // 클릭한 버튼 > 필터링 리스트의 active 클래스 추가 또는 삭제
        })
      })      

      genreFilterItem.forEach(detailItem => { // 카테고리 필터링 리스트 아이템 각각에
        detailItem.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
          e.currentTarget.closest("ul").classList.remove("active"); // 카테고리 필터링 리스트 비활성화
          e.currentTarget.closest("ul").previousElementSibling.childNodes[0].innerText = e.currentTarget.innerText;
          e.currentTarget.classList.contains("area_option")? setRegion(e.currentTarget.innerText) : setCategory(e.currentTarget.innerText);
        })
      });

      return () => {
        genreFilter.forEach(genreBtn => {        
          genreBtn.removeEventListener('click', ()=>{});
        })
        genreFilterItem.forEach(detailItem => { // 카테고리 필터링 리스트 아이템 각각에
          detailItem.removeEventListener('click', ()=>{})
        });
      }
    },[]
  );
  
  return(
    <>
      <form className="fill_in_box">
        <ul className="fill_list">
          <li className="genre_category">
            <span className="fill_item_tit">카테고리</span>
            <div className="genre_filter_list">
              <span className="selected_filter flex_between"><span className="selected_option">{category}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className="filter_arrow_icon"/></span>
              <ul>
                <li className="genre_option">전시</li>
                <li className="genre_option">공연</li>
                <li className="genre_option">뮤지컬</li>
                <li className="genre_option">행사/축제</li>
                <li className="genre_option">팝업</li>
              </ul>
            </div>
          </li>
          {/* // 장르 카테고리 필터*/}
  
          <li className="event_place">
            <span className="fill_item_tit">지역</span>
            <div className="genre_filter_list">
              <span className="selected_filter flex_between"><span className="selected_option">{region}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className="filter_arrow_icon"/></span>
              <ul>
                <li className='area_option'>서울</li>
                <li className='area_option'>인천</li>
                <li className='area_option'>부산</li>
                <li className='area_option'>경기</li>
                <li className='area_option'>충북</li>
                <li className='area_option'>충남</li>
                <li className='area_option'>경남</li>
                <li className='area_option'>경북</li>
                <li className='area_option'>대구</li>
                <li className='area_option'>대전</li>
                <li className='area_option'>광주</li>
                <li className='area_option'>세종</li>
                <li className='area_option'>울산</li>
                <li className='area_option'>강원</li>
                <li className='area_option'>전남</li>
                <li className='area_option'>전북</li>
                <li className='area_option'>제주</li>
              </ul>
            </div>
          </li>
          {/* // 공연/전시 지역 */}
  
          <li className="event_place">
            <span className="fill_item_tit">관람 장소</span>
            <input type="text" placeholder="관람 장소를 입력하세요." value={place} onChange={(e) => setPlace(e.target.value)}/>
          </li>
          {/* // 공연/전시 장소 */}
  
          <li className="event_age">
            <span className="fill_item_tit">관람 연령</span>
            <input type="text" placeholder="관람 연령을 입력하세요." value={age} onChange={(e) => setAge(e.target.value)}/>
          </li>
          {/* // 공연/전시 관람연령 */}
          
          <li className="event_price">
            <span className="fill_item_tit">할인 가격</span>
            <input type="text" placeholder="할인 가격을 입력하세요." value={earlyPrice} onChange={(e) => setEarlyPrice(e.target.value)}/>
          </li>
          {/* // 공연/전시 할인 가격 */}
  
          <li className="event_price">
            <span className="fill_item_tit">일반 가격</span>
            <input type="text" placeholder="일반 가격을 입력하세요." value={price} onChange={(e) => setPrice(e.target.value)}/>
          </li>
          {/* // 공연/전시 일반 가격 */}
  
          <li className="event_period">
            <span className="fill_item_tit">예매 기간</span>
            <ul className="flex_start">
              <li><span>시작</span><input type="date" placeholder="2024-08-01" value={startBuy} onChange={(e) => setStartBuy(e.target.value)}/></li>
              <li><span>마감</span><input type="date" placeholder="2024-08-31" value={endBuy} onChange={(e) => setEndBuy(e.target.value)}/></li>
            </ul>
          </li>
          {/* // 공연/전시 예매기간 */}
  
          <li className="event_period">
            <span className="fill_item_tit">사용기한</span>
            <ul className="flex_start">
              <li><span>시작</span><input type="date" placeholder="2024-08-01" value={startUse} onChange={(e) => setStartUse(e.target.value)}/></li>
              <li><span>마감</span><input type="date" placeholder="2024-08-31" value={endUse} onChange={(e) => setEndUse(e.target.value)}/></li>
            </ul>
          </li>
          {/* // 공연/전시 관람기간 */}
  
          <li className="event_purchase">
            <span className="fill_item_tit">예매처 정보</span>
            <ul className="purchase_place_info flex_start">
              <li><input type="text" className="where_to_buy" placeholder="예매처 명을 입력하세요." value={whereToBuy} onChange={(e) => setWhereToBuy(e.target.value)}/></li>
              <li><input type="text" className="link_for_buying" placeholder="예매처 URL을 입력하세요." value={buyUrl} onChange={(e) => setBuyUrl(e.target.value)}/></li>
            </ul>
          </li>
          {/* // 공연/전시 예매처 */}     
          
          <li className="event_tit">
            <span className="fill_item_tit">제목</span>
            <input type="text" placeholder="제목을 입력하세요." value={earlyTitle} onChange={(e) => setEarlyTitle(e.target.value)}/>
          </li>
          {/* // 공연/전시 제목 */}
  
          <li className="event_detail">
            <span className="fill_item_tit">상세 내용</span>
            <div className="event_detail_box editBox">           
              <div className='event_detail_saved'>
                <div className="detail_txt_box">
                  <textarea maxLength="500" className="event_detail_txt" placeholder='상세 정보를 입력하세요.' value={detailInfo} onChange={e =>{ setCurrentTextLength(e.target.value.length); setDetailInfo(e.target.value)}}></textarea>
                  <span className="txt_counts"><span className="counted_num">{currentTextLength}</span>/500</span>
                </div>              
                {/* // 공연/전시 상세 정보 */}          
              </div>
            </div>
          </li>
          <li className="event_img">
            <span className="fill_item_tit">이미지</span>
            <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}/>          
          </li>          
        </ul>
        {/* 이미지 미리보기 영역 */}
        <div className="event_detail_box imgBox">
          <div className="event_detail_saved">            
            {/* 이미지 영역 */}
            <img src={imgUrl} alt="공연/전시 포스터"/>
          </div>
        </div>
        
        {/* 목록 / 취소 / 등록 버튼 영역 */}
        <ul className="btn_list flex_end">
          {/* <li><a href="#" className="negative_btn">목록</a></li> */}
          <li>          
            <a href="#" className="negative_btn cancel" onClick={() => navigate("/events")}>취소</a>
          </li>
          <li>          
            <button type='button' className="register_btn" onClick={() => {handleClickOpen(); callUpdateApi();}}>수정</button>
          </li>
        </ul>
      </form>
      <Dialog open={open} onClose={handleClose} className='custom_dialog_box'>
        <DialogContent className="custom-dialog-content">
          <img src="/images/commons/icon_confirm.png" alt="icon" className="dialog-icon" />
          <DialogContentText className="dialog-text">
            해당 공연/전시 정보가 수정되었습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="custom-dialog-actions">
          {/*  navigate("/events"); */}
          <Button onClick={() => {handleClose();}} className="custom-confirm-button one_button" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}