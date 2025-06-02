/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/


import BotDataService from "services/bot_service";

import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  BOT_REQUEST,
  BOT_FAILURE
} from "./types";

import {action_request, action_recieved, action_error} from "./action"

export const createBot = (payload) => (dispatch) => {
  dispatch(action_request(BOT_REQUEST, payload));
  return BotDataService.create(payload).then(
    (response) => {
      dispatch(action_recieved(CREATE_BOT, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BOT_FAILURE, message));

      return Promise.reject();
    }
  );
};


export const retrieveBots = (page_number) => async (dispatch) => {
  try {
    const response = await BotDataService.getPage(page_number);
    dispatch(action_recieved(RETRIEVE_BOTS, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data;
    dispatch(action_error(BOT_FAILURE, message));
    return Promise.reject(error);
  }
};

export const getBot = (id) => (dispatch) => {
  dispatch(action_request(BOT_REQUEST, id));
  return BotDataService.findByID(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_BOTS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BOT_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const updateBot = (id, data) => (dispatch) => {
  dispatch(action_request(BOT_REQUEST, data));
  return BotDataService.update(id, data).then(
    (response) => {
      dispatch(action_recieved(UPDATE_BOT, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BOT_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const deleteBot = (id) => (dispatch) => {
  dispatch(action_request(BOT_REQUEST, id));
  return BotDataService.deleteBot(id).then(
    (response) => {
      dispatch(action_recieved(DELETE_BOT, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BOT_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const findBotsByName = (name) => (dispatch) => {
  dispatch(action_request(BOT_REQUEST, name));
  return BotDataService.findByName(name).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_BOTS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BOT_FAILURE, message));

      return Promise.reject();
    }
  );
}