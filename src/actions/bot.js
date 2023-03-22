
import BotDataService from "../services/bot_service";

import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  GET_BOT,
  SET_MESSAGE,
  BOT_FALI,
} from "./types";

export const createBot = (bot_name, last_beat_time, task_payload, task_end_time, task_status, platform) => (dispatch) => {
    return BotDataService.create(bot_name, last_beat_time, task_payload, task_end_time, task_status, platform).then(
      (response) => {
        dispatch({
          type: CREATE_BOT,
          payload: response.data,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: BOT_FALI,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const retrieveBots = () => (dispatch) => {
  return BotDataService.getAll().then(
    (response) => {
      dispatch({
        type: RETRIEVE_BOTS,
        payload: response.data
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOT_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const getBot = (id) => (dispatch) => {
  return BotDataService.findByID(id).then(
    (response) => {
      dispatch({
        type: GET_BOT,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOT_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const updateBot = (id, data) => (dispatch) => {
  return BotDataService.update(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_BOT,
        payload: response.data
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOT_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const deleteBot = (id) => (dispatch) => {
  return BotDataService.delete(id).then(
    (response) => {
      dispatch({
        type: DELETE_BOT,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOT_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const findBotsByName = (name) => (dispatch) => {
  return BotDataService.findByName(name).then(
    (response) => {
      dispatch({
        type: GET_BOT,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: BOT_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}