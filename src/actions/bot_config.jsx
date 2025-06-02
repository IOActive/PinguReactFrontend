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

import BotConfigDataService from "services/bot_config_service";
import {action_request, action_recieved, action_error} from "./action"
import {
     CREATE_BOT_CONFIG,
     UPDATE_BOT_CONFIG,
     BOT_CONFIG_REQUEST,
     BOT_CONFIG_FAILURE,
     RETRIEVE_BOT_CONFIG,
     BOT_CONFIG_SUCCESS
} from "./types";

export const create_bot_config = (payload) => (dispatch) => {
     dispatch(action_request(CREATE_BOT_CONFIG, payload));
     return BotConfigDataService.create(payload).then(
          (response) => {
               dispatch(action_recieved(BOT_CONFIG_SUCCESS, response.data));
               return Promise.resolve();
          },
          (error) => {
               const message = error.response.data;

               dispatch(action_error(BOT_CONFIG_FAILURE, message));

               return Promise.reject();
          }
     );
};


export const get_bot_config = (bot_id) => (dispatch) => {
     dispatch(action_request(BOT_CONFIG_REQUEST));
     return BotConfigDataService.get(bot_id).then(
          (response) => {
               dispatch(action_recieved(RETRIEVE_BOT_CONFIG, response.data));
               return Promise.resolve();
          },
          (error) => {
               const message = error.response.data;

               dispatch(action_error(BOT_CONFIG_FAILURE, message));

               return Promise.reject();
          }
     );
};

export const update_bot_config = (id, bot_config) => (dispatch) => {
     dispatch(action_request(UPDATE_BOT_CONFIG, { "id": id, "config_data": bot_config}));
     return BotConfigDataService.update(id, bot_config).then(
          (response) => {
               dispatch(action_recieved(UPDATE_BOT_CONFIG, response.data));
               return Promise.resolve();
          },
          (error) => {
               const message = error.response.data;
               dispatch(action_error(BOT_CONFIG_FAILURE, message));
               return Promise.reject();
          }
     );
};

export const get_default_bot_config = () => (dispatch) => {
     dispatch(action_request(BOT_CONFIG_REQUEST));
     return BotConfigDataService.get_default()
          .then((response) => {
               dispatch(action_recieved(RETRIEVE_BOT_CONFIG, response.data));
               return Promise.resolve();
          })
          .catch((error) => {
               const message = error.response.data;
               dispatch(action_error(BOT_CONFIG_FAILURE, message));
               return Promise.reject();
          });
};

