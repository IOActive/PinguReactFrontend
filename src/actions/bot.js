
import BotDataService from "../services/bot_service";

import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  DELETE_ALL_BOTS
} from "./types";

export const createBot = (bot_name, last_beat_time, task_payload, task_end_time, task_status, platform) => async (dispatch) => {
  try {
    const res = await BotDataService.create({ bot_name, last_beat_time, task_payload, task_end_time, task_status, platform });

    dispatch({
      type: CREATE_BOT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveBots = () => async (dispatch) => {
  try {
    const res = await BotDataService.getAll();

    dispatch({
      type: RETRIEVE_BOTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBot = (id, data) => async (dispatch) => {
  try {
    const res = await BotDataService.update(id, data);

    dispatch({
      type: UPDATE_BOT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBot = (id) => async (dispatch) => {
  try {
    await BotDataService.delete(id);

    dispatch({
      type: DELETE_BOT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findBotsByName = (name) => async (dispatch) => {
  try {
    const res = await BotDataService.findByName(name);

    dispatch({
      type: RETRIEVE_BOTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const deleteAllBots = () => async (dispatch) => {
    try {
      const res = await BotDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_BOTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };