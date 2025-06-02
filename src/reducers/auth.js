import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from 'actions/types';

const token = localStorage.getItem('access_token');
export default function auth(state = {
  isFetching: false,
  isAuthenticated: !!token,
}, action) {
  switch (action.type) {
      case LOGIN_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false,
          });
      case LOGIN_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              errorMessage: '',
              user: action.user
          });
      case LOGIN_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              errorMessage: action.message,
          });
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, {
              isAuthenticated: false,
          });
      default:
          return state;
  }
}
