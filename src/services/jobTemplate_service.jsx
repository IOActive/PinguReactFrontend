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