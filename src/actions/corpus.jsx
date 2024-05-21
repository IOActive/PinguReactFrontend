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


import CorpusDataService from "../services/corpus_service";

import {
  CREATE_CORPUS,
  CORPUS_REQUEST,
  CORPUS_FAILURE,
} from "./types";

function corpusRequest(payload) {
  return {
    type: CORPUS_REQUEST,
    isFetching: true,
    payload,
  };
}

export function corpusRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function corpusError(message) {
  return {
    type: CORPUS_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const upload_corpus = (payload) => (dispatch) => {
    dispatch(corpusRequest(payload));
    return CorpusDataService.create(payload).then(
      (response) => {
        dispatch(corpusRecieved(CREATE_CORPUS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(corpusError(message));
 
        return Promise.reject();
      }
    );
  };