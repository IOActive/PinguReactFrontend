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


import BuildDataService from "services/build_service";
import { action_request, action_recieved, action_error } from "./action"
import {
  CREATE_BUILD,
  RETRIEVE_BUILDS,
  UPDATE_BUILD,
  DELETE_BUILD,
  BUILD_FAILURE,
  BUILD_REQUEST,
} from "./types";

export const upload_build = (payload) => (dispatch) => {

  const formData = new FormData();
  formData.append("build_zip", payload.build_zip);  // Attach file
  formData.append("filename", payload.build_zip.name);
  formData.append("project_id", payload.project_id);
  formData.append("type", payload.type);
  formData.append("blobstore_path", payload.blobstore_path);

  dispatch(action_request(BUILD_REQUEST, payload));
  return BuildDataService.create(formData).then(
    (data) => {
      dispatch(action_recieved(RETRIEVE_BUILDS, data));
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BUILD_FAILURE, message));

      return Promise.reject(message);
    }
  );
};

export const get_builds = (page_number, project) => (dispatch) => {
  dispatch(action_request(BUILD_REQUEST));
  return BuildDataService.getPage(page_number, project).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_BUILDS, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BUILD_FAILURE, message));

      return Promise.reject();
    }
  );
};

export const get_build_by_id = (id) => (dispatch) => {
  return BuildDataService.get(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_BUILDS, response.data));
      return Promise.promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BUILD_FAILURE, message));

      return Promise.reject();
    }
  );
};

export const delete_build = (id) => (dispatch) => {
  return BuildDataService.delete(id).then(
    (response) => {
      dispatch({ type: DELETE_BUILD, payload: id });
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BUILD_FAILURE, message));

      return Promise.reject();
    }
  );
};

export const update_build = (id, payload) => (dispatch) => {

  const formData = new FormData();
  formData.append("build_zip", payload.build_zip);  // Attach file
  formData.append("filename", payload.filename);
  formData.append("project_id", payload.project_id);
  formData.append("type", payload.type);
  formData.append("blobstore_path", payload.blobstore_path);

  return BuildDataService.update(id, formData).then(
    (response) => {
      dispatch(action_recieved({ type: UPDATE_BUILD, payload: response.data }));
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data;
      dispatch(action_error(BUILD_FAILURE, message));

      return Promise.reject();
    }
  );
};

export const download_build = (id) => {
  return BuildDataService.download_build(id).then(
    (response) => {
      const contentDisposition = response.headers["content-disposition"];
      let filename = `${id}.zip`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return Promise.resolve();
    },
    (error) => {
      console.error("Download failed:", error);
      return Promise.reject(error);
    }
  );
};