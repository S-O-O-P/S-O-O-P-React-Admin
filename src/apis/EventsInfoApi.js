import axios from "axios";

export default function EventsInfoApi({setEvents}){
    axios.get('http://localhost:8080/cultureinfo/early')
      .then(response => {
        console.log('API Response:', response.data); // 디버깅을 위한 로그
        setEvents(response.data.earlyBirdList || []); // EventsInfo가 null일 경우 빈 배열로 설정
        // setFilteredRows(response.data.earlyBirdList || []);
        console.log('Fetched Events:', response.data.earlyBirdList); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS!', error));
}