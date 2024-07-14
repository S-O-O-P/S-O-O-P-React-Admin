import axios from "axios";

export default function EventsInfoApi({setEvents}, apiName, earlyCode = null, eventData = null){

  // 얼리버드 공연/전시 정보 모두 호출
  const selectAllEventsInfo = () => {
    axios.get('http://localhost:2/cultureinfo/early')
      .then(response => {
        console.log('API Response All:', response.data); // 디버깅을 위한 로그
        setEvents(response.data.earlyBirdList || []); // EventsInfo가 null일 경우 빈 배열로 설정
        // setFilteredRows(response.data.earlyBirdList || []);
        console.log('Fetched Events All:', response.data.earlyBirdList); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS!', error));
  } 

  // 얼리버드 공연/전시 상세 정보 호출
  const selectDetailEventsInfo = (earlyCode) => {
    axios.get('http://localhost:8082/cultureinfo/early/'+earlyCode)
      .then(response => {
        console.log('API Response detail:', response.data); // 디버깅을 위한 로그
        setEvents(response.data.foundEarlyInfo || {}); // EventsInfo가 null일 경우 빈 객체로 설정        
        console.log('Fetched Event for detail:', response.data.foundEarlyInfo.ebTitle); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS! detail', error));
  }

  // 얼리버드 공연/전시 신규 등록
  const registerNewEventsInfo = (eventData) => {
    axios.post('http://localhost:8082/cultureinfo/early', eventData)
    .then(response => {
      console.log('API Response register:', response.data);
      // 성공적인 응답 처리
    })
    .catch(error => {
      console.error('ERROR OCCURS! register', error);
      // 에러 처리
    });
  }

  // 얼리버드 공연/전시 수정
  const editEventsInfo = (earlyCode, eventData) => {
    axios.put('http://localhost:8082/cultureinfo/early/'+earlyCode, eventData)
    .then(response => {
      console.log('API Response edit:', response.data);
      // 성공적인 응답 처리
    })
    .catch(error => {
      console.error('ERROR OCCURS! edit', error);
      // 에러 처리
    });
  }

  // 얼리버드 공연/전시 삭제
  const deleteEventsInfo = (earlyCode) => {
    axios.delete('http://localhost:8082/cultureinfo/early/'+earlyCode)
    .then(response => {
      console.log('API Response delete:', response.data);
      // 성공적인 응답 처리
    })
    .catch(error => {
      console.error('ERROR OCCURS! delete', error);
      // 에러 처리
    });
  }
  
  switch(apiName){
    case("all") : selectAllEventsInfo(); break; 
    case("detail") : selectDetailEventsInfo(earlyCode); break; 
    case("register") : registerNewEventsInfo(eventData); break; 
    case("edit") : editEventsInfo(earlyCode, eventData); break; 
    case("delete") : deleteEventsInfo(earlyCode); break; 
  }
}