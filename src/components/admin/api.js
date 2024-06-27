import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // 필요한 경우 쿠키를 전송하도록 설정
});

export default api;
