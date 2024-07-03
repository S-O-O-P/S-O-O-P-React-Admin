// CustomerAPI.js
import axios from 'axios';

const baseURL = 'http://localhost:8080/customer/';

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.usersInfo.filter(user => user.userRole !== 'ADMIN');
  } catch (error) {
    console.error('There was an error fetching the members!', error);
    throw error;
  }
};

export const initializeCustomers = async () => {
  try {
    const filteredUsers = await fetchCustomers();
    return filteredUsers;
  } catch (error) {
    console.error('There was an error initializing the members!', error);
    throw error;
  }
};
