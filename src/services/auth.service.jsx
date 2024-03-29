/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import http from "../helpers/http-common";
import TokenService from "./token_service";

function login(creds) {
  return http
    .post( "auth/login/", creds)
    .then(response => {
      if (response.data.access) {
        TokenService.setUser(response.data.user);
        TokenService.setAccessToken(response.data.access);
        TokenService.setRefreshToken(response.data.refresh);
      }

      return response.data;
    });
}

function logout() {
  TokenService.removeUser();
}

function register(data) {
  return http.post("auth/register/", data);
}

function getCurrentUser() {
  return TokenService.getUser();
}

export default {login, logout, register, getCurrentUser};
