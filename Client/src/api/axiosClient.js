import axios from 'axios';
// import { getToken } from 'utils/hooks/useToken';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
// axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

export default axios;
