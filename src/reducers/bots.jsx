# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  BOT_REQUEST,
  BOT_FAILURE,
} from "../actions/types";

const initialState = [];

function botReducer(bots = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOT_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_BOT:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_BOTS:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_BOT:
      if (bots.payload) {
        return bots.map((bot) => {
          if (bot.id === payload.id) {
            return {
              ...bot,
              ...payload,
            };
          } else {
            return bot;
          }
        });
      }
      else {
        return bots;
      }

    //case DELETE_BOT:

    case BOT_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return bots;
  }
}

export default botReducer;
