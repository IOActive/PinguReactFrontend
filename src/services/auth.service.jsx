import http from "../helpers/http-common";

function login(creds) {
  return http
    .post( "auth/login/", creds)
    .then(response => {
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        //localStorage.setItem("user", response.data.user);

      }

      return response.data;
    });
}

function logout() {
  localStorage.removeItem("access_token");
}

function register(data) {
  return http.post("auth/register/", data);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function refreshToken(token) {
  return http.post("auth/refresh/", {refresh: token});
}

export default {login, logout, register, getCurrentUser, refreshToken};
