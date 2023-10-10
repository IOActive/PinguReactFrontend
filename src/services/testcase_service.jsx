import http from "../helpers/http-common";

class TestCaseDataService {

  getPage(page_number) {
    return  http.get(`/testcase/?page=${page_number}`);
  }
}

export default new TestCaseDataService();