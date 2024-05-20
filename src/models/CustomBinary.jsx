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

// Custom Binary model

export const CustomBinary = (json) => {
    return {
        job_id: {
            value: json.job_id,
            editable: true,
            header: "UUID",
            type: String,
            required: true,
        },
        custom_binary: {
            value: json.custom_binary,
            editable: true,
            header: "Custom Binary File",
            type: File,
            required: true,
        },
        filename: {
            value: json.filename,
            editable: true,
            header: "File name",
            type: String,
            required: true,
        },
        get_payload: (custom_binary) => {
            let payload = {};
            for (let key in custom_binary) {
                if (custom_binary[key].editable) {
                    payload[key] = custom_binary[key].value;
                }
            }
            return payload;
        }
    }
    
};