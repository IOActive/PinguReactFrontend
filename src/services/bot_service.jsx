import http from "../helpers/http-common";

function getAll() {
  return http.get("/bot/");
}

function get(id) {
  return http.get(`/bot/?id=${id}`);
}

function create(data) {
  return http.post("/bot/", data);
}

function update(id, data) {
  return http.patch(`/bot/${id}/`, data).catch((e) => {
    console.log(e);
  });
}

function deleteBot(id) {
  return http.delete(`/bot/${id}/`);
}

function deleteAll() {
  return http.delete(`/bot/`);
}

function findByName(name) {
  return http.get(`/bot/?bot_name=${name}`);
}

function findByID(id){
  return http.get(`/bot/?id=${id}`);
}

export default {getAll, get, create, update, deleteBot, deleteAll, findByName, findByID};
