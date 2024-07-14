// CustomerDetailAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8082/customer/';

export const fetchCustomerDetail = async (userCode) => {
  try {
    const response = await axios.get(`${baseURL}${userCode}`);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the member data!', error);
    throw error;
  }
};
