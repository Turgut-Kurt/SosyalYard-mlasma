import axios from 'axios';
import store from '../store/index';
import AuthControl from './AuthControl';

const BASE_URL = 'http://sosyal.kuantumyazilim.com/api/sosyalyardimlasma/v1/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('REQUEST', config);
    const {token} = store.getState().SignInReducer;
    if (token !== null && token !== '') {
      config.headers.Authorization = `Bearer ${
        store.getState().SignInReducer.token
      }`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('RESPONSE', response);
    return response;
  },
  (error) => {
    console.log('RESPONSE_ERROR', error.response ? error.response : error);
    if (error.response.status === 401) {
      AuthControl.removeToken();
    }
    return Promise.reject(error);
  },
);
export {axiosInstance};
