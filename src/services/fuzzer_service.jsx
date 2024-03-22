import http from "../helpers/http-common";

class FuzzerDataService {
  getAll() {
    return http.get("/fuzzer/");
  }

  get(id) {
    return http.get(`/fuzzer/?id=${id}`);
  }

  create(data) {
    return http.post("/fuzzer/", data);
  }

  update(id, data) {
    return http.patch(`/fuzzer/${id}/`, data).catch((e) => {
      console.log(e);
    });
  }

  delete(id) {
    return http.delete(`/fuzzer/${id}/`);
  }

  deleteAll() {
    return http.delete(`/fuzzer/`);
  }

  findByName(name) {
    return http.get(`/fuzzer/?name=${name}`);
  }

  findByID(id){
    return http.get(`/fuzzer/?id=${id}`);
  }

  getPage(page_number) {
    return  http.get(`/fuzzer/?page=${page_number}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FuzzerDataService();