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

export const JobTemplate = (json) => {
    return {
        id: {
            value: json.id,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        name: {
            value: json.name,
            editable: true,
            header: "The name of the job template",
            type: String,
            required: true,
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The template enviroment parameters",
            type: String,
            required: true,
        },

        validated: false,
        submitted: false,
        get_enums: () => {
            return {
            };
        },
        get_payload: (job) => {
            let payload = {};
            for (let key in job) {
                payload[key] = job[key].value;
            }
            return payload;
        }
    };
}