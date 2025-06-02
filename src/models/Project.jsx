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

import Code from "./Code"

export const Project = (json) => {
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
            header: "The name of the Project",
            type: String,
            required: true,
        },
        description: {
            value: json.description,
            editable: true,
            header: "The description of the Project",
            type: String,
            required: true,
        },
        timestamp: {
            value: new Date(json.timestamp),
            editable: false,
            header: "Timestamp",
            type: Date,
            required: false,
        },
        configuration: {
            value: json.configuration,
            editable: true,
            header: "Configuration",
            type: String,
            required: false,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
            };
        },
        get_payload: (project) => {
            let payload = {};
            for (let key in project) {
                if (project[key].editable) {
                   payload[key] = project[key].value;
                }
            }
            return payload;
        }
    };
};