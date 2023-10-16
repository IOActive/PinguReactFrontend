import http from "../helpers/http-common";

class TestCaseDataService {

  getPage(page_number) {
    return  http.get(`/testcase/?page=${page_number}`);
  }

  getPageByJobID(job_id, page_number) {
    return  http.get(`/testcase/?page=${page_number}&job_id=${job_id}`);
  }

  findByID(id){
    return http.get(`/testcase/?id=${id}`);
  }

}

export default new TestCaseDataService();