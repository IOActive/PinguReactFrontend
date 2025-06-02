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

import {
  CREATE_BOT_CONFIG,
  RETRIEVE_BOT_CONFIG,
  UPDATE_BOT_CONFIG,
  BOT_CONFIG_REQUEST,
  BOT_CONFIG_FAILURE,
} from "actions/types";

const initialState = [];

function BotConfigReducer(bot_configs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case BOT_CONFIG_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_BOT_CONFIG:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_BOT_CONFIG:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_BOT_CONFIG:
      if (bot_configs.payload) {
        return bot_configs.payload.results.map((bot_config) => {
          if (bot_config.id === payload.id) {
            return {
              ...bot_config,
              ...payload,
            };
          } else {
            return bot_config;
          }
        });
      }
      else {
        return bot_configs;
      }

    case BOT_CONFIG_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload.message,
      };
    default:
      return bot_configs;
  }
}

export default BotConfigReducer;
