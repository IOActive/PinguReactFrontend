
import BotDataService from "../services/bot_service";

import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  BOT_REQUEST,
  BOT_FAILURE
} from "./types";

function botRequest(payload) {
  return {
    type: BOT_REQUEST,
    isFetching: true,
    payload,
  };
}

export function botRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function botError(message) {
  return {
    type: BOT_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createBot = (bot_name, last_beat_time, task_payload, task_end_time, task_status, platform) => (dispatch) => {
    const payload = {bot_name, last_beat_time, task_payload, task_end_time, task_status, platform};
    dispatch(botRequest(payload));
    return BotDataService.create(payload).then(
      (response) => {
        dispatch(botRecieved(CREATE_BOT,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(botError(message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveBots = () => (dispatch) => {
  dispatch(botRequest(""));
  return BotDataService.getAll().then(
    (response) => {
      dispatch(botRecieved(RETRIEVE_BOTS, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(botError(message));
      return Promise.reject();
    }
  );
}

export const getBot = (id) => (dispatch) => {
  dispatch(botRequest(id));
  return BotDataService.findByID(id).then(
    (response) => {
      dispatch(botRecieved(RETRIEVE_BOTS, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(botError(message));

      return Promise.reject();
    }
  );
}

export const updateBot = (id, data) => (dispatch) => {
  dispatch(botRequest(data));
  return BotDataService.update(id, data).then(
    (response) => {
      dispatch(botRecieved(UPDATE_BOT, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(botError(message));
      return Promise.reject();
    }
  );
}

export const deleteBot = (id) => (dispatch) => {
  dispatch(botRequest(id));
  return BotDataService.delete(id).then(
    (response) => {
      dispatch(botRecieved(DELETE_BOT, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(botError(message));
      return Promise.reject();
    }
  );
}

export const findBotsByName = (name) => (dispatch) => {
  dispatch(botRequest(name));
  return BotDataService.findByName(name).then(
    (response) => {
      dispatch(botRecieved(RETRIEVE_BOTS, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(botError(message));

      return Promise.reject();
    }
  );
}