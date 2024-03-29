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

function getPage(page_number) {
  return  http.get(`/bot/?page=${page_number}`);
}

function get(id) {
  return http.get(`/bot/?id=${id}`);
}

function create(data) {
  return http.post("/bot/", data);
}

function update(id, data) {
  return http.patch(`/bot/${id}/`, data);
}

function deleteBot(id) {
  return http.delete(`/bot/${id}/`);
}

function deleteAll() {
  return http.delete(`/bot/`);
}

function findByName(name) {
  return http.get(`/bot/?name=${name}`);
}

function findByID(id){
  return http.get(`/bot/?id=${id}`);
}

export default {getPage, get, create, update, deleteBot, deleteAll, findByName, findByID};
