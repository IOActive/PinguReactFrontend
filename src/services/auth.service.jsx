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
