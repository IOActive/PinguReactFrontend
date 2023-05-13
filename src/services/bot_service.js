import http from "../helpers/http-common";

class BotDataService {
  getAll() {
    return http.get("/bot/");
  }

  get(id) {
    return http.get(`/bot/?id=${id}`);
  }

  create(data) {
    return http.post("/bot/", data);
  }

  update(id, data) {
    return http.patch(`/bot/${id}/`, data).catch((e) => {
      console.log(e);
    });
  }

  delete(id) {
    return http.delete(`/bot/${id}/`);
  }

  deleteAll() {
    return http.delete(`/bot/`);
  }

  findByName(name) {
    return http.get(`/bot/?bot_name=${name}`);
  }

  findByID(id){
    return http.get(`/bot/?id=${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BotDataService();