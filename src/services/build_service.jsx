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

import http from "../helpers/http-common";

class BuildDataService {
  getAll() {
    return http.get("/build/");
  }

  get(id) {
    return http.get(`/build/?id=${id}`);
  }

  create(data) {
    return http.post("/build/", data);
  }

  update(id, data) {
    return http.patch(`/build/${id}/`, data).catch((e) => {
      console.log(e);
    });
  }

  delete(id) {
    return http.delete(`/build/${id}/`);
  }

  deleteAll() {
    return http.delete(`/build/`);
  }

  findByName(name) {
    return http.get(`/build/?name=${name}`);
  }

  findByID(id){
    return http.get(`/build/?id=${id}`);
  }

  getPage(page_number) {
    return  http.get(`/build/?page=${page_number}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BuildDataService();