import { useNavigate } from 'react-router-dom';
import '../../pages/EventsInfo/EventsDetail.css';
import { useEffect, useState } from 'react';

export default function EventForm(){
  
  // 입력 내용 State
  const [category, setCategory] = useState("concert");
  //const [[]] // 얼리버드 티켓 예매 시작 / 마감
  const [region, setRegion] = useState(""); // 지역
  const [place, setPlace] = useState(""); // 관람 장소
  const [price, setPrice] = useState(""); //관람 가격
  const [age, setAge] = useState(""); // 관람 연령
  //const [] // 얼리버드 티켓 사용 기간 시작 / 마감
  const [whereToBuy, setWhereToBuy] = useState(""); // 예매처 명
  const [buyUrl, setBuyUrl] = useState(""); // 예매처 링크
  const [earlyTitle, setEarlyTitle] = useState(""); // 제목
  const [detailInfo, setDetailInfo] = useState(""); // 상세 정보
  const [imgUrl, setImgUrl] = useState(""); // 이미지 url
  const [thumbnail, setThumbnaill] = useState(""); // 썸네일 이미지 url


  const [currentTextLength, setCurrentTextLength] = useState(0); // 상세 정보 입력 글자 실시간 확인
  const navigate = useNavigate();

  useEffect(
    () => { 
      
      // 카테고리 리스트
      const genreFilter = document.querySelector(".selected_filter");

      // 카테고리 리스트 아이템 클릭이벤트 
      const genreFilterItem = document.querySelectorAll(".genre_filter_list > ul > li");
      
      genreFilter.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
        e.currentTarget.classList.contains("active") ? e.currentTarget.classList.remove("active") : e.currentTarget.classList.add("active"); // 클릭한 버튼의 활성화 여부에 따라 active 클래스 추가 또는 삭제
        e.currentTarget.nextElementSibling.classList.contains("active") ? e.currentTarget.nextElementSibling.classList.remove("active") : e.currentTarget.nextElementSibling.classList.add("active"); // 클릭한 버튼 > 필터링 리스트의 active 클래스 추가 또는 삭제
      })

      genreFilterItem.forEach(detailItem => { // 카테고리 필터링 리스트 아이템 각각에
        detailItem.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
          e.currentTarget.closest("ul").classList.remove("active"); // 카테고리 필터링 리스트 비활성화
          genreFilter.classList.remove("active"); // 카테고리 필터링 리스트 비활성화
          e.currentTarget.closest("ul").previousElementSibling.childNodes[0].innerText = e.currentTarget.innerText;
        })
      });

       //페이지 로드시, 등록된 스케쥴 제목 및 내용 텍스트 길이 반영
      // $(window).on('load', () => {
      //     $(".tit_counted").text($(".schedule_tit").val().length);
      //     $(".txt_counted").text($(".schedule_contxt_box").val().length);
      // })
      // <span className="txt_counts"><span className="counted_num">0</span>/500</span>

      //스케쥴 제목 입력시 텍스트 길이 실시간 반영
      const detailInfoTxt = document.querySelector('.event_detail_txt');

      //스케쥴 내용 입력시 텍스트 길이 실시간 반영
      // const onChangeTextHandler = (e) => {
      //   e.currentTarget.value = 
      // }
      // $(".detailInfoTxt").on('input', (e) => {
      //     $(".txt_counted").text(e.target.value.length);
      // })

      // 날짜/input/textarea 클릭시, 스크롤 100px 내리기
      //window.scrollTo({top: 0, behavior: 'smooth'});
      // $('.schedule_tit, .schedule_date_input, .schedule_contxt_box').on('click', () => {
      //     $('html, body').animate({scrollTop: 100}, 200);
      // })

      // 제목 및 내용 미입력시 등록 불가
      // function goWrite(frm) {
      //     var title = frm.scheduleTitle.value;
      //     var content = frm.scheduleContext.value;

      //     if (title.trim() == ''){
      //         // alert("제목을 입력해주세요");
      //         $(".pop_cont").find("p").text("제목을 입력해주세요.");
      //         $(".pop_bg, .pop_cont").addClass("active");
      //         $("html, body").addClass("fixed");
      //         $(".confirm_btn").click(() => {
      //             $(".pop_bg, .pop_cont").removeClass("active"); // 팝업창/팝업배경 비활성화
      //             $("html, body").removeClass("fixed");
      //             $('.schedule_tit').focus();
      //         })

      //         return false;
      //     }
      //     if (content.trim() == ''){
      //         $(".pop_cont").find("p").text("내용을 입력해주세요.");
      //         $(".pop_bg, .pop_cont").addClass("active");
      //         $("html, body").addClass("fixed");
      //         $(".confirm_btn").click(() => {
      //             $(".pop_bg, .pop_cont").removeClass("active"); // 팝업창/팝업배경 비활성화
      //             $("html, body").removeClass("fixed");
      //             $('.schedule_contxt_box').focus();
      //         })

      //         return false;
      //     }
      //     frm.submit();
      // }

      return () => {
      }
    },[]
  );

  return(
    <form className="fill_in_box">
      <ul className="fill_list">
        <li className="genre_category">
          <span className="fill_item_tit">카테고리</span>
          <div className="genre_filter_list">
            <span className="selected_filter flex_between"><span className="selected_option">공연</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className="filter_arrow_icon"/></span>
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
            <input type="date" placeholder="2024-07-18"/>
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
          <input type="text" placeholder="관람 장소를 입력하세요."/>
        </li>
        {/* // 공연/전시 장소 */}

        
        <li className="event_price">
          <span className="fill_item_tit">가격</span>
          <input type="text" placeholder="가격을 입력하세요."/>
        </li>
        {/* // 공연/전시 장소 */}

        <li className="event_age">
          <span className="fill_item_tit">관람 연령</span>
          <input type="text" placeholder="관람 연령을 입력하세요."/>
        </li>
        {/* // 공연/전시 관람연령 */}

        <li className="event_period">
          <span className="fill_item_tit">관람 기간</span>
          <ul className="flex_start">
            <li><span>시작</span><input type="date" placeholder="2024-08-01"/></li>
            <li><span>마감</span><input type="date" placeholder="2024-08-31"/></li>
          </ul>
        </li>
        {/* // 공연/전시 관람기간 */}

        <li className="event_purchase">
          <span className="fill_item_tit">예매처 정보</span>
          <ul className="purchase_place_info flex_start">
            <li><input type="text" className="where_to_buy" placeholder="예매처 명을 입력하세요."/></li>
            <li><input type="text" className="link_for_buying" placeholder="예매처 URL을 입력하세요."/></li>
          </ul>
        </li>
        {/* // 공연/전시 예매처 */}     
        
        <li className="event_tit">
          <span className="fill_item_tit">제목</span>
          <input type="text" placeholder="제목을 입력하세요."/>
        </li>
        {/* // 공연/전시 제목 */}
      </ul>
      <div className="event_detail">           
        <div className="detail_txt_box">
          <textarea maxLength="500" className="event_detail_txt" placeholder='상세 정보를 입력하세요.' onChange={e => setCurrentTextLength(e.target.value.length)}></textarea>
          <span className="txt_counts"><span className="counted_num">{currentTextLength}</span>/500</span>
        </div>              
        {/* // 공연/전시 상세 정보 */}
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
      <ul className="btn_list flex_between">
        {/* <li><a href="#" className="negative_btn">목록</a></li> */}
        <li>          
          <a href="#" className="negative_btn cancel" onClick={() => navigate(-1)}>취소</a>
        </li>
        <li>          
          <button type="submit" className="register_btn">수정</button>
        </li>
      </ul>
    </form>
  );
}