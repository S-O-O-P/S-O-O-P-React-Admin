import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/EventsDetail.css';

export default function EventInfo(id){
  const navigate = useNavigate();

  return(
    <div className="fill_in_box">
      <ul className="fill_list">
        <li className="genre_category">
          <span className="fill_item_tit">카테고리</span>
          <div className="fill_contxt">
            <p>뮤지컬</p>
          </div>
        </li>
        {/* // 장르 카테고리 필터*/}        

        <li className="event_place">
          <span className="fill_item_tit">지역</span>
          <div className="fill_contxt">
            <p>서울</p>
          </div>
        </li>
        {/* // 공연/전시 장소 */}

        <li className="event_place">
          <span className="fill_item_tit">관람 장소</span>
          <div className="fill_contxt">
            <p>더현대 서울 ALT.1</p>
          </div>
        </li>
        {/* // 공연/전시 장소 */}

        <li className="event_age">
          <span className="fill_item_tit">관람 연령</span>
          <div className="fill_contxt">
            <p>전체관람가</p>
          </div>
        </li>
        {/* // 공연/전시 관람연령 */}
        
        <li className="event_price">
          <span className="fill_item_tit"> 할인 가격</span>
          <div className="fill_contxt">
            <p>9,900 원</p>
          </div>
        </li>
        {/* // 공연/전시 얼리버드 가격 */}  

        <li className="event_price">
          <span className="fill_item_tit">일반 가격</span>
          <div className="fill_contxt">
            <p>15,000 원</p>
          </div>
        </li>
        {/* // 공연/전시 가격 */}      

        <li className="event_period buy_ticket">
          <span className="fill_item_tit">예매 기간</span>
          <ul className="flex_start">
            <li>
              <span>시작</span>
              <div className="fill_contxt">
                <p>2024-08-01</p>
              </div>
            </li>
            <li>
              <span>마감</span>
              <div className="fill_contxt">
                <p>2024-08-31</p>
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
                <p>2024-08-01</p>
              </div>
            </li>
            <li>
              <span>마감</span>
              <div className="fill_contxt">
                <p>2024-08-31</p>
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
                <p>인터파크 티켓</p>
              </div>
            </li>
            <li>
              <div className="fill_contxt">
                <p>http://interparkticket.com</p>
              </div>
            </li>
          </ul>
        </li>
        {/* // 공연/전시 예매처 */}     
        
        <li className="event_tit">
          <span className="fill_item_tit">제목</span>
          <div className="fill_contxt">
            <p>서양 미술사 800년展</p>
          </div>
        </li>
        {/* // 공연/전시 제목 */}
      </ul>
      <div className="event_detail_box">
        <div className="event_detail_saved">   
          <p className="event_detail_text">서양 미술사 800년 대서사시를 경험하세요!</p>            

          {/* 업로드 된 이미지 영역 */}
          <ul className="uploaded_img_list">
            <li><img src="https://i.pinimg.com/originals/58/3d/2b/583d2b45dcf0b09e76fd97941985ec8d.jpg" alt="uploaded image"/></li>
          </ul>
        </div>
      </div>


      {/* 목록 / 취소 / 등록 버튼 영역 */}
      <ul className="btn_list flex_between">
        <li><a href="#" className="negative_btn" onClick={() => navigate(-1)}>목록</a></li>
        <li className="flex_start">
          <a href="#" className="negative_btn cancel">삭제</a>
          <button type="submit" className="register_btn" onClick={() => navigate(`/events/edit/${id}`)}>수정</button>
        </li>
      </ul>
    </div>
  );
}