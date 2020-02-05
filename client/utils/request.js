import axios from 'axios';

const service = axios.create({
  baseURL: '/',
  timeout: 5000,
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status !== 200) {
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    console.error(error);
    Promise.reject(error);
  }
);

export default service;
