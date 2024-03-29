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
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_REQUEST,
  JOB_FAILURE,
} from "../actions/types";

const initialState = [];

function jobReducer(jobs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case JOB_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_JOB:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_JOBS:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_JOB:
      if (jobs.payload) {
        return jobs.map((job) => {
          if (job.id === payload.id) {
            return {
              ...job,
              ...payload,
            };
          } else {
            return job;
          }
        });
      }
      else {
        return jobs;
      }

    //case DELETE_JOB:

    case JOB_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return jobs;
  }
}

export default jobReducer;
