//import axios from 'axios';
import authHeader from './auth-header';
import http from "../http-common";

class UserService {
  getPublicContent() {
    return http.get('/all');
  }

  getUserBoard() {
    return http.get('/user');
  }

  getAdminBoard() {
    return http.get('/admin');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
