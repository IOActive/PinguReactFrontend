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

class TokenService {
    getLocalRefreshToken() {
      return localStorage.getItem("refresh_token");
    }
  
    getLocalAccessToken() {
      return localStorage.getItem("access_token");
    }
    
    setAccessToken(accessToken) {
        localStorage.setItem("access_token", accessToken);
    }

    setRefreshToken(refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
    }

    updateLocalAccessToken(token) {
      localStorage.setItem("access_token", token);
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
  
  export default new TokenService();