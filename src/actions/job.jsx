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


import JobDataService from "services/job_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_REQUEST,
  JOB_FAILURE
} from "./types";

export const createJob = (payload) => (dispatch) => {
    dispatch(action_request(JOB_REQUEST, payload));
    return JobDataService.create(payload).then(
      (response) => {
        dispatch(action_recieved(CREATE_JOB,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
        dispatch(action_error(JOB_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveJobs = (page_number, project) => async (dispatch) => {
  try {
    dispatch(action_request(JOB_REQUEST, page_number));
    const response = await JobDataService.getPage(page_number, project);

    dispatch(action_recieved(RETRIEVE_JOBS, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data;     
    dispatch(action_error(JOB_FAILURE, message));
    return Promise.reject(error);
  }
};

export const getJob = (id) => (dispatch) => {
  dispatch(action_request(JOB_REQUEST, id));
  return JobDataService.findByID(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_JOBS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOB_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const updateJob = (id, data) => (dispatch) => {
  dispatch(action_request(JOB_REQUEST, data));
  return JobDataService.update(id, data).then(
    (response) => {
      dispatch(action_recieved(UPDATE_JOB, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOB_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const deleteJob = (id) => (dispatch) => {
  dispatch(action_request(JOB_REQUEST, id));
  return JobDataService.delete(id).then(
    (response) => {
      dispatch(action_recieved(DELETE_JOB, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(JOB_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const findJobsByName = (name, project) => (dispatch) => {
  dispatch(action_request(JOB_REQUEST, name));
  return JobDataService.findByName(name, project).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_JOBS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data.detail;

      dispatch(action_error(JOB_FAILURE, message));

      return Promise.reject();
    }
  );
}