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
