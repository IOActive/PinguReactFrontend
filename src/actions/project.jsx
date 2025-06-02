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


import ProjectDataService from "services/project_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_PROJECT,
  RETRIEVE_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_REQUEST,
  PROJECT_FAILURE
} from "./types";

export const createProject = (payload) => (dispatch) => {
    dispatch(action_request(PROJECT_REQUEST, payload));
    return ProjectDataService.create(payload).then(
      (response) => {
        dispatch(action_recieved(CREATE_PROJECT,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
        dispatch(action_error(PROJECT_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveProjects = (page_number) => async (dispatch) => {
  try {
    dispatch(action_request(PROJECT_REQUEST, page_number));
    const response = await ProjectDataService.getPage(page_number);

    dispatch(action_recieved(RETRIEVE_PROJECTS, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data;     
    dispatch(action_error(PROJECT_FAILURE, message));
    return Promise.reject(error);
  }
};

export const getProject = (id) => (dispatch) => {
  dispatch(action_request(PROJECT_REQUEST, id));
  return ProjectDataService.findByID(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_PROJECTS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(PROJECT_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const updateProject = (id, data) => (dispatch) => {
  dispatch(action_request(PROJECT_REQUEST, data));
  return ProjectDataService.update(id, data).then(
    (response) => {
      dispatch(action_recieved(UPDATE_PROJECT, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(PROJECT_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const deleteProject = (id) => (dispatch) => {
  dispatch(action_request(PROJECT_REQUEST, id));
  return ProjectDataService.delete(id).then(
    (response) => {
      dispatch(action_recieved(DELETE_PROJECT, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(PROJECT_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const findProjectsByName = (name) => (dispatch) => {
  dispatch(action_request(PROJECT_REQUEST, name));
  return ProjectDataService.findByName(name).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_PROJECTS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data.detail;

      dispatch(action_error(PROJECT_FAILURE, message));

      return Promise.reject();
    }
  );
}