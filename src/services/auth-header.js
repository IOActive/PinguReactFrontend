export default function authHeader() {
  const token = localStorage.getItem('access_token');

  if (token) {
    return 'Bearer ' + token; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
