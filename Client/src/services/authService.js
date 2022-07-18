import axios from 'api/axiosClient';

export const loginUserRequest = async (payload) => {
  try {
    const res = await axios.post('/login', payload);
    return res;
  } catch (error) {
    return error;
  }
};

export const registerUserRequest = async (payload) => {
  try {
    const res = await axios.post('/register', payload);
    return res;
  } catch (error) {
    return error;
  }
};
