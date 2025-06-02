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


import FuzzerDataService from "services/fuzzer_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_FUZZER,
  RETRIEVE_FUZZERS,
  UPDATE_FUZZER,
  DELETE_FUZZER,
  FUZZER_REQUEST,
  FUZZER_FAILURE
} from "./types";

export const createFuzzer = (payload) => (dispatch) => {

  dispatch(action_request(FUZZER_REQUEST, payload));
  return FuzzerDataService.create(payload).then(
    (response) => {
      dispatch(action_recieved(CREATE_FUZZER, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(FUZZER_FAILURE, message));
      return Promise.reject();
    }
  );
};


export const retrieveFuzzers = (page_number) => async (dispatch) => {
  try {
    const response = await FuzzerDataService.getPage(page_number);

    dispatch(action_recieved(RETRIEVE_FUZZERS, response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    const message = error.response.data;     
    dispatch(action_error(FUZZER_FAILURE, message));
    return Promise.reject(error);
  }
};

export const getFuzzer = (id) => (dispatch) => {
  dispatch(action_request(FUZZER_REQUEST, id));
  return FuzzerDataService.findByID(id).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_FUZZERS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(FUZZER_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const updateFuzzer = (id, data) => (dispatch) => {
  dispatch(action_request(FUZZER_REQUEST, data));
  return FuzzerDataService.update(id, data).then(
    (response) => {
      dispatch(action_recieved(UPDATE_FUZZER, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(FUZZER_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const deleteFuzzer = (id) => (dispatch) => {
  dispatch(action_request(FUZZER_REQUEST, id));
  return FuzzerDataService.delete(id).then(
    (response) => {
      dispatch(action_recieved(DELETE_FUZZER, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(FUZZER_FAILURE, message));
      return Promise.reject();
    }
  );
}

export const findFuzzersByName = (name) => (dispatch) => {
  dispatch(action_request(FUZZER_REQUEST, name));
  return FuzzerDataService.findByName(name).then(
    (response) => {
      dispatch(action_recieved(RETRIEVE_FUZZERS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message = error.response.data; 
      dispatch(action_error(FUZZER_FAILURE, message));

      return Promise.reject();
    }
  );
}

export const download_fuzzer_source = (fuzzer_id) => {
  return FuzzerDataService.download_fuzzer_source(fuzzer_id).then(
    (response) => {
      const contentDisposition = response.headers["content-disposition"];
      let filename = `${fuzzer_id}.zip`;
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