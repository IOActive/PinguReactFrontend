import http from "../helpers/http-common";

class CrashDataService {

  getPage(page_number) {
    return  http.get(`/crash?page=${page_number}`);
  }

  getPageByTestCaseID(testcase_id, page_number) {
    return  http.get(`/crash?page=${page_number}&testcase_id=${testcase_id}`);
  }

  findByID(id){
    return http.get(`/crash?id=${id}`);
  }

}

export default new CrashDataService();