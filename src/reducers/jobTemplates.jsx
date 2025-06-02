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
  CREATE_JOBTEMPLATE,
  RETRIEVE_JOBTEMPLATES,
  UPDATE_JOBTEMPLATE,
  DELETE_JOBTEMPLATE,
  JOBTEMPLATE_REQUEST,
  JOBTEMPLATE_FAILURE,
} from "actions/types";

const initialState = [];

function jobTemplateReducer(jobTemplates = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case JOBTEMPLATE_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_JOBTEMPLATE:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_JOBTEMPLATES:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_JOBTEMPLATE:
      if (jobTemplates.payload) {
        return jobTemplates.map((jobTemplate) => {
          if (jobTemplate.id === payload.id) {
            return {
              ...jobTemplate,
              ...payload,
            };
          } else {
            return jobTemplate;
          }
        });
      }
      else {
        return jobTemplates;
      }

    //case DELETE_JOBTEMPLATE:

    case JOBTEMPLATE_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload.message,
      };
    default:
      return jobTemplates;
  }
}

export default jobTemplateReducer;
