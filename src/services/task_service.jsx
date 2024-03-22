import http from "../helpers/http-common";

class TaskDataService {
  create(data) {
    return http.post("/task/", data);
  }

  read(platform) {
    return http.get(`/task/?platform=${platform}`);
  }

  readAll() {
    return http.get("/task/");
  }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskDataService();