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

import { getHttpInstance } from "helpers/http-common"; // Use the HTTP instance getter



class FuzzerDataService {
  getAll() {
    return getHttpInstance().get("/fuzzer/");
  }

  get(id) {
    return getHttpInstance().get(`/fuzzer/?id=${id}`);
  }

  create(data) {
    return getHttpInstance().post("/fuzzer/", data, {
      headers: {
        "Content-Type": "multipart/form-data",  // ✅ Override for file uploads
      },
    });
  }

  update(id, data) {
    return getHttpInstance().patch(`/fuzzer/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",  // ✅ Override for file uploads
      },
    });
  }

  delete(id) {
    return getHttpInstance().delete(`/fuzzer/${id}/`);
  }

  deleteAll() {
    return getHttpInstance().delete(`/fuzzer/`);
  }

  findByName(name) {
    return getHttpInstance().get(`/fuzzer/?name=${name}`);
  }

  findByID(id){
    return getHttpInstance().get(`/fuzzer/?id=${id}`);
  }

  getPage(page_number) {
    return  getHttpInstance().get(`/fuzzer/?page=${page_number}`);
  }

  download_fuzzer_source(id) {
    return getHttpInstance().get(`/fuzzer/${id}/download`, {
      responseType: 'blob',
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FuzzerDataService();