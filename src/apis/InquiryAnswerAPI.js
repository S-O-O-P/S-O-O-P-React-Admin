// InquiryAnswerAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8082/inquiry/';

export const fetchInquiryDetails = async (inquiryCode) => {
  try {
    const response = await axios.get(`${baseURL}${inquiryCode}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the inquiry details!", error);
    throw error;
  }
};

export const postInquiryAnswer = async (inquiryCode, answer) => {
  try {
    await axios.post(`${baseURL}${inquiryCode}/answer`, { answer });
  } catch (error) {
    console.error("There was an error posting the answer!", error);
    throw error;
  }
};

export const updateInquiryStatus = async (inquiryCode, status) => {
  try {
    await axios.patch(`${baseURL}${inquiryCode}/status`, { answerStatus: status });
  } catch (error) {
    console.error("There was an error updating the answer status!", error);
    throw error;
  }
};
