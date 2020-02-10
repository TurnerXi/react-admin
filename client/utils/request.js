import axios from 'axios';
import qs from 'qs';

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  paramsSerializer: params => {
    return qs.stringify(params, { indices: false });
  },
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
    return Promise.reject(error);
  }
);

export default service;
