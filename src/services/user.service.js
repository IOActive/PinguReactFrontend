//import axios from 'axios';

import { getHttpInstance } from "helpers/http-common"; // Use the HTTP instance getter


class UserService {
  getPublicContent() {
    
    return getHttpInstance().get('/all');
  }

  getUserBoard() {
    
    return getHttpInstance().get('/user');
  }

  getAdminBoard() {
    
    return getHttpInstance().get('/admin');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
