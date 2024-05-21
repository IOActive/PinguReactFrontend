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

// Corpus model

export const Corpus = (json) => {
    return {
        job_id: {
            value: json.job_id,
            editable: true,
            header: "Job UUID",
            type: String,
            required: true,
        },
        corpus_binary: {
            value: json.corpus_binary,
            editable: true,
            header: "Corpus File",
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
        fuzztarget_name: {
            value: json.fuzztarget_name,
            editable: true,
            header: "Fuzz Target name",
            type: String,
            required: true,
        },
        engine_id: {
            value: json.engine_id,
            editable: true,
            header: "Engine UUID",
            type: String,
            required: true,
        },

        get_payload: (corpus) => {
            let payload = {};
            for (let key in corpus) {
                if (corpus[key].editable) {
                    payload[key] = corpus[key].value;
                }
            }
            return payload;
        }
    }
    
};