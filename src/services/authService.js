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

export const getUserInfoRequest = async (payload) => {
  const { email, token } = payload;
  try {
    const res = await axios.post(
      '/user',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const searchUsersRequest = async (payload) => {
  try {
    const res = await axios.post('/search-user', payload);
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllUsersRequest = async (payload) => {
  const { accessToken: token, page } = payload;
  try {
    const res = await axios.post(
      'users',
      { page },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
