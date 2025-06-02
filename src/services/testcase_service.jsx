/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { getHttpInstance } from "helpers/http-common"; // Use the HTTP instance getter



class TestCaseDataService {

  getPage(page_number) {
    return  getHttpInstance().get(`/testcase?page=${page_number}`);
  }

  getPageByJobID(job_id, page_number) {
    return  getHttpInstance().get(`/testcase?page=${page_number}&job=${job_id}`);
  }

  findByID(id){
    return getHttpInstance().get(`/testcase?id=${id}`);
  }

  create(data) {
    return getHttpInstance().post("/testcase/", data);
  }

}

export default new TestCaseDataService();