// InquiryAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8082/inquiry/';

export const fetchInquiries = async () => {
  try {
    const response = await axios.get(baseURL); // API 엔드포인트를 설정합니다.
    return response.data.inquiryInfo; // Adjusted to match the response structure
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    throw error;
  }
};
