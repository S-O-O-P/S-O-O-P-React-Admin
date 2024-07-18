import axios from "axios";

export default async function EventsInfoApi({ setEvents }, apiName, earlyCode = null, eventData = null) {

  // 얼리버드 공연/전시 정보 모두 호출
  const selectAllEventsInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8082/cultureinfo/early');
      console.log('API Response All:', response.data); // 디버깅을 위한 로그
      setEvents(response.data.earlyBirdList || []); // EventsInfo가 null일 경우 빈 배열로 설정
      console.log('Fetched Events All:', response.data.earlyBirdList); // Log the fetched data
    } catch (error) {
      console.error('ERROR OCCURS!', error);
    }
  };

  // 얼리버드 공연/전시 상세 정보 호출
  const selectDetailEventsInfo = async (earlyCode) => {
    try {
      const response = await axios.get(`http://localhost:8082/cultureinfo/early/${earlyCode}`);
      console.log('API Response detail:', response.data); // 디버깅을 위한 로그
      setEvents(response.data.foundEarlyInfo || {}); // EventsInfo가 null일 경우 빈 객체로 설정        
      console.log('Fetched Event for detail:', response.data.foundEarlyInfo.ebTitle); // Log the fetched data
    } catch (error) {
      console.error('ERROR OCCURS! detail', error);
    }
  };

  // 얼리버드 공연/전시 신규 등록
  const registerNewEventsInfo = async (eventData) => {
    try {
      const response = await axios.post('http://localhost:8082/cultureinfo/early', eventData);
      console.log('API Response register:', response.data);
      // 성공적인 응답 처리
    } catch (error) {
      console.error('ERROR OCCURS! register', error);
      // 에러 처리
    }
  };

  // 얼리버드 공연/전시 수정
  const editEventsInfo = async (earlyCode, eventData) => {
    try {
      const response = await axios.put(`http://localhost:8082/cultureinfo/early/${earlyCode}`, eventData);
      console.log('API Response edit:', response.data);
      // 성공적인 응답 처리
    } catch (error) {
      console.error('ERROR OCCURS! edit', error);
      // 에러 처리
    }
  };

  // 얼리버드 공연/전시 삭제
  const deleteEventsInfo = async (earlyCode) => {
    try {
      const response = await axios.delete(`http://localhost:8082/cultureinfo/early/${earlyCode}`);
      console.log('API Response delete:', response.data);
      // 성공적인 응답 처리
    } catch (error) {
      console.error('ERROR OCCURS! delete', error);
      // 에러 처리
    }
  };

  switch (apiName) {
    case "all":
      await selectAllEventsInfo();
      break;
    case "detail":
      await selectDetailEventsInfo(earlyCode);
      break;
    case "register":
      await registerNewEventsInfo(eventData);
      break;
    case "edit":
      await editEventsInfo(earlyCode, eventData);
      break;
    case "delete":
      await deleteEventsInfo(earlyCode);
      break;
  }
}