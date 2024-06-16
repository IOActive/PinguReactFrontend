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
  CREATE_BUILD,
  RETRIEVE_BUILDS,
  UPDATE_BUILD,
  DELETE_BUILD,
  BUILD_REQUEST,
  BUILD_FAILURE,
} from "../actions/types";

const initialState = [];

function buildReducer(builds = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUILD_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_BUILD:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_BUILDS:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_BUILD:
      if (builds.payload) {
        return builds.map((build) => {
          if (build.id === payload.id) {
            return {
              ...build,
              ...payload,
            };
          } else {
            return build;
          }
        });
      }
      else {
        return builds;
      }

    //case DELETE_BUILD:

    case BUILD_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return builds;
  }
}

export default buildReducer;
