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


import BuildDataService from "../services/build_service";

import {
    CREATE_BUILD , 
    RETRIEVE_BUILDS,
    UPDATE_BUILD, 
    DELETE_BUILD, 
    BUILD_FAILURE,
    BUILD_REQUEST,
} from "./types";

function buildRequest(payload) {
  return {
    type: BUILD_REQUEST,
    isFetching: true,
    payload,
  };
}

export function buildRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function buildError(message) {
  return {
    type: BUILD_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const upload_build = (payload) => (dispatch) => {
    dispatch(buildRequest(payload));
    return BuildDataService.create(payload).then(
      (response) => {
        dispatch(buildRecieved(CREATE_BUILD,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.msg;  
        dispatch(buildError(message));
 
        return Promise.reject();
      }
    );
  };

export const get_builds = () => (dispatch) => {
    dispatch(buildRequest());
    return BuildDataService.getAll().then(
      (response) => {
        dispatch(buildRecieved(RETRIEVE_BUILDS, response.data));
        return Promise.resolve();
       },
      (error) => {
        const message = error.response.data.msg;  
        dispatch(buildError(message));
 
        return Promise.reject();
       }
    );
};

export const get_build_by_id = (id) => (dispatch) => {
    return BuildDataService.get(id).then(
       (response) => {
         dispatch(buildRecieved(RETRIEVE_BUILDS, response.data));
         return Promise.promise.resolve();
        },
       (error) => {
         const message = error.response.data.msg;  
         dispatch(buildError(message));
 
         return Promise.reject();
        }
     );
};

export const delete_build = (id) => (dispatch) => {
    return BuildDataService.delete(id).then(
        (response) => {
            dispatch({type: DELETE_BUILD, payload: id});
            return Promise.resolve();
        },
        error => {
            const message = error.response.data.msg;  
            dispatch(buildError(message));
 
            return Promise.reject();
        }
    );
};

export const update_build = (id, data) => (dispatch) => {
    return BuildDataService.update(id, data).then(
        response => {
            dispatch({type: UPDATE_BUILD, payload: response.data});
            return Promise.resolve();
        },
        error => {
            const message = error.response.data.msg;  
            dispatch(buildError(message));
 
            return Promise.reject();
        }
    );
};