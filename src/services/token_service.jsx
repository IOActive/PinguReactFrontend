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