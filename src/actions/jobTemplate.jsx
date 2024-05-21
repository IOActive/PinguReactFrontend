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


import JobTemplateDataService from "../services/jobTemplate_service";

import {
  CREATE_JOBTEMPLATE,
  RETRIEVE_JOBTEMPLATES,
  UPDATE_JOBTEMPLATE,
  DELETE_JOBTEMPLATE,
  JOBTEMPLATE_REQUEST,
  JOBTEMPLATE_FAILURE
} from "./types";

function jobTemplateRequest(payload) {
  return {
    type: JOBTEMPLATE_REQUEST,
    isFetching: true,
    payload,
  };
}

export function jobTemplateRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function jobTemplateError(message) {
  return {
    type: JOBTEMPLATE_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createJobTemplate = (payload) => (dispatch) => {
    dispatch(jobTemplateRequest(payload));
    return JobTemplateDataService.create(payload).then(
      (response) => {
        dispatch(jobTemplateRecieved(CREATE_JOBTEMPLATE,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.message || error.response.data.msg | error.toString(); 
  
        dispatch(jobTemplateError(message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveJobTemplates = () => async (dispatch) => {
  try {
    dispatch(jobTemplateRequest());
    const response = await JobTemplateDataService.getAll();

    dispatch(jobTemplateRecieved(RETRIEVE_JOBTEMPLATES, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data.message || error.response.data.msg | error.toString();     dispatch(jobTemplateError(message));
    return Promise.reject(error);
  }
};

export const getJobTemplate = (id) => (dispatch) => {
  dispatch(jobTemplateRequest(id));
  return JobTemplateDataService.findByID(id).then(
    (response) => {
      dispatch(jobTemplateRecieved(RETRIEVE_JOBTEMPLATES, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data.message || error.response.data.msg | error.toString(); 
      dispatch(jobTemplateError(message));

      return Promise.reject();
    }
  );
}

export const updateJobTemplate = (id, data) => (dispatch) => {
  dispatch(jobTemplateRequest(data));
  return JobTemplateDataService.update(id, data).then(
    (response) => {
      dispatch(jobTemplateRecieved(UPDATE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data.message || error.response.data.msg | error.toString(); 
      dispatch(jobTemplateError(message));
      return Promise.reject();
    }
  );
}

export const deleteJobTemplate = (id) => (dispatch) => {
  dispatch(jobTemplateRequest(id));
  return JobTemplateDataService.delete(id).then(
    (response) => {
      dispatch(jobTemplateRecieved(DELETE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data.message || error.response.data.msg | error.toString(); 
      dispatch(jobTemplateError(message));
      return Promise.reject();
    }
  );
}
