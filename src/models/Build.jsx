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

export const BUILD_TYPES = {
    RELEASE: 'Release',
    SYM_RELEASE: 'SYM_Release',
    SYM_DEBUG: 'SYM_Debug',
    STABLE: 'Stable',
    BETA: 'Beta',
    NA: 'NA',
}
export const Build = (json) => {
    return {
        id: {
            value: json.id,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        timestamp: {
            value: new Date(json.timestamp),
            editable: false,
            header: "Last update time",
            type: Date,
        },
        type: {
            value: BUILD_TYPES[json.type],
            editable: true,
            header: "Build Type (release, symRelease, symDebug, stable or beta",
            type: Object,
            required: true,
        },
        build_zip: {
            value: (json.build_zip != null) ? json.build_zip.substring(1) : null,
            editable: true,
            header: "The build archive that the user uploaded",
            type: File,
            required: true,
        },
        filename: {
            value: json.filename,
            editable: true,
            header: "The name of the archive that the user uploaded",
            type: String,
            required: false,
        },
        name: {
            value: "build",
            editable: false,
            header: "The name of the archive that the user uploaded",
            type: String,
            required: false,
        },
        file_size: {
            value: json.file_size,
            editable: false,
            header: "The size of the archive that the user uploaded",
            type: Number,
            required: false,
        },
        blobstore_path: {
            value: json.blobstore_path,
            editable: true,
            header: "The path to the archive in the blobstore",
            type: String,
            required: false,
        },
        project_id: {
            value: json.project_id,
            editable: true,
            header: "The project that the archive belongs to",
            type: String,
            required: true,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                type: BUILD_TYPES
            };
        },
        get_payload: (build) => {
            let payload = {};
            for (let key in build) {
                if (build[key].editable) {
                    payload[key] = build[key].value;
                }
            }
            return payload;
        }
    };
};