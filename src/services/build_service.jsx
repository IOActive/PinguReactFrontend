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


class BuildDataService {
  getAll(project) {
    return getHttpInstance().get(`/build/?project=${project}`);
  }

  get(id) {
    return getHttpInstance().get(`/build/?id=${id}`);
  }

  create(data) {
    return getHttpInstance().post("/build/", data, {
      headers: {
        "Content-Type": "multipart/form-data",  // ✅ Override for file uploads
      },
    });
  }

  update(id, data) {
    return getHttpInstance().patch(`/build/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",  // ✅ Override for file uploads
      },
    });
  }

  delete(id) {
    return getHttpInstance().delete(`/build/${id}/`);
  }

  deleteAll() {
    return getHttpInstance().delete(`/build/`);
  }

  findByName(name, project) {
    return getHttpInstance().get(`/build/?name=${name}&project=${project}`);
  }

  findByID(id) {
    return getHttpInstance().get(`/build/?id=${id}`);
  }

  getPage(page_number, project) {
    return getHttpInstance().get(`/build/?page=${page_number}&project=${project}`);
  }

  download_build(id) {
    return getHttpInstance().get(`/build/${id}/download/`, {
      responseType: "blob",
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BuildDataService();