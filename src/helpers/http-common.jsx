# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
