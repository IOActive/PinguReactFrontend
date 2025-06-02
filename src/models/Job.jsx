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

// Note: Job model

import Platforms from 'helpers/Platforms'

export const Job = (json) => {
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
            header: "The name of the job",
            type: String,
            required: true,
        },
        description: {
            value: json.description,
            editable: true,
            header: "The description of the job",
            type: String,
            required: true,
        },
        project_id: {
            value: json.project_id,
            editable: true,
            header: "The project that the job belongs to",
            type: String,
            required: true,
        },
        date: {
            value: new Date(json.date),
            editable: false,
            header: "The date when the job was created",
            type: Date,
            required: true,
        },
        enabled: {
            value: json.enabled === true,
            editable: true,
            header: "Whether the job is enabled or not",
            type: Boolean,
            required: false,
        },
        archived: {
            value: json.archived === true,
            editable: true,
            header: "Whether the job is archived or not",
            type: Boolean,
            required: false,
        },
        platform: {
            value: Platforms[json.platform],
            editable: true,
            header: "The platform that the job is running on",
            type: Object,
            required: true,
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The environment string that the job is running on",
            type: String,
            required: false,
        },
        custom_binary_path: {
            value: json.custom_binary_path,
            editable: true,
            header: "The path to the custom binary that the job is running on",
            type: String,
            required: false,

        },
        custom_binary_filename: {
            value: json.custom_binary_filename,
            editable: true,
            header: "The filename of the custom binary that the job is running on",
            type: String,
            required: false,

        },
        custom_binary_revision: {
            value: json.custom_binary_revision,
            editable: true,
            header: "The revision of the custom binary that the job is running on",
            type: Number,
            required: false,

        },
        custom_binary_key: {
            value: json.custom_binary_key,
            editable: true,
            header: "Blobstore key of the custom binary for this job",
            type: String,
            required: false,

        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                platform: Platforms
            };
        },
        get_payload: (job) => {
            let payload =  {};
            for (let key in job) {
                //if (job[key].editable) {
                    payload[key] = job[key].value;
                //}
            }
            return payload;
        }
    };
}