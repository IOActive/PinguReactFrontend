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


import JobTemplateDataService from "services/jobTemplate_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_JOBTEMPLATE,
  RETRIEVE_JOBTEMPLATES,
  UPDATE_JOBTEMPLATE,
  DELETE_JOBTEMPLATE,
  JOBTEMPLATE_REQUEST,
  JOBTEMPLATE_FAILURE
} from "./types";

export const createJobTemplate = (payload) => (dispatch) => {
    dispatch(action_request(JOBTEMPLATE_REQUEST, payload));
    return JobTemplateDataService.create(payload).then(
      (response) => {
        dispatch(action_recieved(CREATE_JOBTEMPLATE,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(JOBTEMPLATE_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveJobTemplates = () => async (dispatch) => {
  try {
    dispatch(action_request(JOBTEMPLATE_REQUEST));
    const response = await JobTemplateDataService.getAll();

    dispatch(action_recieved(RETRIEVE_JOBTEMPLATES, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data;     
    dispatch(action_error(JOBTEMPLATE_FAILURE, message));
    return Promise.reject(error);
  }
};

export const getJobTemplate = (id) => (dispatch) => {
  dispatch(action_request(JOBTEMPLATE_REQUEST, id));
  return JobTemplateDataService.findByID(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_JOBTEMPLATES, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOBTEMPLATE_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const updateJobTemplate = (id, data) => (dispatch) => {
  dispatch(action_request(JOBTEMPLATE_REQUEST, data));
  return JobTemplateDataService.update(id, data).then(
    (response) => {
      dispatch(action_recieved(UPDATE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOBTEMPLATE_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const deleteJobTemplate = (id) => (dispatch) => {
  dispatch(action_request(JOBTEMPLATE_REQUEST, id));
  return JobTemplateDataService.delete(id).then(
    (response) => {
      dispatch(action_recieved(DELETE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOBTEMPLATE_FAILURE, message));
      return Promise.reject();
    }
  );
}
