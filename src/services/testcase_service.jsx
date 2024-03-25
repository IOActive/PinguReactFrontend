# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import http from "../helpers/http-common";

class TestCaseDataService {

  getPage(page_number) {
    return  http.get(`/testcase?page=${page_number}`);
  }

  getPageByJobID(job_id, page_number) {
    return  http.get(`/testcase?page=${page_number}&job_id=${job_id}`);
  }

  findByID(id){
    return http.get(`/testcase?id=${id}`);
  }

  create(data) {
    return http.post("/testcase/", data);
  }

}

export default new TestCaseDataService();