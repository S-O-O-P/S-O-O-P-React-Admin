import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/EventsDetail.css';

export default function EventEdit(id){

  const navigate = useNavigate();

  
  return(
    <form className="fill_in_box">
      <ul className="fill_list">
        <li className="genre_category">
          <span className="fill_item_tit">카테고리</span>
          <div className="genre_filter_list">
            <span className="selected_filter flex_between"><span className="selected_option">공연</span><img src="./assets/images/common/icon_arrow_bottom_main_color.png" alt="arrow direction bottom icon" className="filter_arrow_icon"/></span>
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

        <li className="event_date">
          <span className="fill_item_tit">티켓 예매 기간</span>
          <label>
            {/* 티켓 예매 기간 */}
            <input type="date" value="2024-07-18"/>
            {/* <img src="" alt="calendar icon"> */}
          </label>
          {/* <label>
            <input type="text">
          </label> */}
          {/* 시간 정보 입력 */}
        </li>
        {/* // 공연/전시 정보 일자 선택 */}

        <li className="event_place">
          <span className="fill_item_tit">장소</span>
          <input type="text" value="더현대 서울 ALT.1"/>
        </li>
        {/* // 공연/전시 장소 */}

        
        <li className="event_price">
          <span className="fill_item_tit">가격</span>
          <input type="text" value="9900"/>
        </li>
        {/* // 공연/전시 장소 */}

        <li className="event_age">
          <span className="fill_item_tit">관람연령</span>
          <input type="text" value="전체관람가"/>
        </li>
        {/* // 공연/전시 관람연령 */}

        <li className="event_period">
          <span className="fill_item_tit">관람기간</span>
          <ul className="flex_start">
            <li><span>시작</span><input type="date" value="2024-08-01"/></li>
            <li><span>마감</span><input type="date" value="2024-08-31"/></li>
          </ul>
        </li>
        {/* // 공연/전시 관람기간 */}

        <li className="event_purchase">
          <span className="fill_item_tit">예매처 정보</span>
          <ul className="purchase_place_info flex_start">
            <li><input type="text" className="where_to_buy" value="인터파크 티켓"/></li>
            <li><input type="text" className="link_for_buying" value="http://interparkticket.com"/></li>
          </ul>
        </li>
        {/* // 공연/전시 예매처 */}     
        
        <li className="event_tit">
          <span className="fill_item_tit">제목</span>
          <input type="text" value="서양 미술사 800년展"/>
        </li>
        {/* // 공연/전시 제목 */}
      </ul>
      <div className="event_detail">           
        <div className="detail_txt_box">
          <textarea maxLength="500" className="event_detail_txt">서양 미술사 800년 대서사시를 경험하세요.</textarea>
          <span className="txt_counts"><span className="counted_num">0</span>/500</span>
        </div>              
        {/* // 공연/전시 예매처 */}
      </div>

      {/* 이미지 업로드 미리보기 영역 */}
      <div className="preview_box">
        <p className="attached_file_count">첨부파일 (&nbsp;<span className="eng"><span className="eng count_preview">0</span>&nbsp;/&nbsp;5</span>&nbsp;)</p>
        <ul className="preview_list">
          <li className="preview_img">
            <img src="https://i.pinimg.com/originals/58/3d/2b/583d2b45dcf0b09e76fd97941985ec8d.jpg" alt="preview image"/>
            <span className="remove_preview_btn">×</span>
          </li>
          <li className="upload_img_btn">
            <label className="file_upload_box preview" name="upload">                    
              <span className="upload_btn">＋</span>
              <input type="file" name="upload" className="file_upload_input"/>
            </label>
          </li>
        </ul>
      </div>

      {/* 목록 / 취소 / 등록 버튼 영역 */}
      <ul className="btn_list flex_end">
        {/* <li><a href="#" className="negative_btn">목록</a></li> */}
        <li>          
          <a href="#" className="negative_btn cancel" onClick={() => navigate("/events")}>취소</a>
        </li>
        <li>          
          <button type="submit" className="register_btn">수정</button>
        </li>
      </ul>
    </form>
  );
}