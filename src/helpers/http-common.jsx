import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8086/api',
  headers: {
    'Content-type': 'application/json',
  }
});

http.interceptors.request.use(
  config => {
    const AUTH_TOKEN = localStorage.getItem('access_token');
    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    else {
      delete config.headers.Authorization;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
