import http from "../http-common";

class JobDataService {
  getAll() {
    return http.get("/job/");
  }

  get(id) {
    return http.get(`/job/?id=${id}`);
  }

  create(data) {
    return http.post("/job/", data);
  }

  update(id, data) {
    return http.patch(`/job/${id}/`, data).catch((e) => {
      console.log(e);
    });
  }

  delete(id) {
    return http.delete(`/job/${id}/`);
  }

  deleteAll() {
    return http.delete(`/job/`);
  }

  findByName(name) {
    return http.get(`/job/?name=${name}`);
  }

  findByID(id){
    return http.get(`/job/?id=${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new JobDataService();