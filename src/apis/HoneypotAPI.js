// honeypotAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8082/honeypot/';

export const fetchHoneypots = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.honeypotInfo || [];
  } catch (error) {
    console.error('There was an error fetching the honeypot data!', error);
    throw error;
  }
};
