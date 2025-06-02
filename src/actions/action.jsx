export function action_request(type, payload="") {
  return {
    type: type,
    isFetching: true,
    payload,
  };
}

export function action_recieved(type, payload) {
  return {
    type: type,
    isFetching: false,
    payload: payload
  };
}

export function action_error(type, payload) {
  return {
    type: type,
    isFetching: false,
    payload: payload,
  };
}