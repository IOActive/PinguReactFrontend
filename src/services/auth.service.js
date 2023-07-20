
import http from "../helpers/http-common";

class AuthService {
  login(creds) {
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

  logout() {
    localStorage.removeItem("access_token");
  }

  register(data) {
    return http.post("auth/register/", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
