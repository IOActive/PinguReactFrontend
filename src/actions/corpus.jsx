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


import CorpusDataService from "services/corpus_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_CORPUS,
  CORPUS_REQUEST,
  CORPUS_FAILURE,
} from "./types";

export const upload_corpus = (payload) => (dispatch) => {

    dispatch(action_request(CORPUS_REQUEST, payload));

    const formData = new FormData();
    formData.append("corpus_binary", payload.corpus_binary);  // Attach file
    formData.append("filename", payload.filename);
    formData.append("job_id", payload.job_id);
    formData.append("fuzzer_id", payload.fuzzer_id);
    formData.append("fuzztarget_name", payload.fuzztarget_name);

    return CorpusDataService.create(formData).then(
      (response) => {
        dispatch(action_recieved(CREATE_CORPUS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.msg;  
        dispatch(action_error(CORPUS_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };