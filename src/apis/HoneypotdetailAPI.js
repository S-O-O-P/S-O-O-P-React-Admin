// HoneypotDetailAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8082/honeypot/';

export const fetchHoneypotDetail = async (honeypotCode) => {
  try {
    const response = await axios.get(`${baseURL}${honeypotCode}`);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the honeypot data!', error);
    throw error;
  }
};

export const toggleHoneypotStatus = async (honeypotCode, newStatus) => {
  try {
    const response = await axios.post(`${baseURL}${honeypotCode}/toggleStatus`, { newStatus });
    return response.data;
  } catch (error) {
    console.error('There was an error updating the honeypot status!', error);
    throw error;
  }
};
