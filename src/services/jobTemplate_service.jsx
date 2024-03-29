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

class JobTemplateDataService {
  getAll() {
    return http.get("/jobtemplate/");
  }

  get(id) {
    return http.get(`/jobtemplate/?id=${id}`);
  }

  create(data) {
    return http.post("/jobtemplate/", data);
  }

  update(id, data) {
    return http.patch(`/jobtemplate/${id}/`, data).catch((e) => {
      console.log(e);
    });
  }

  delete(id) {
    return http.delete(`/jobtemplate/${id}/`);
  }

  deleteAll() {
    return http.delete(`/jobtemplate/`);
  }

  findByName(name) {
    return http.get(`/jobtemplate/?name=${name}`);
  }

  findByID(id){
    return http.get(`/jobtemplate/?id=${id}`);
  }

  getPage(page_number) {
    return  http.get(`/jobtemplate/?page=${page_number}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new JobTemplateDataService();