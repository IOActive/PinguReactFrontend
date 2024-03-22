import axios from 'axios';
import TokenService from '../services/token_service';

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


http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await http.post("/auth/refresh/", {
            refresh: TokenService.getLocalRefreshToken(),
          });
          
          TokenService.updateLocalAccessToken(rs.data.access);

          return http(originalConfig);
        } catch (_error) {
          TokenService.removeUser();
          window.location.replace("/login");
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default http;
