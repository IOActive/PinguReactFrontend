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

// Task model

import Platforms from '../helpers/Platforms'

const COMMAND_MAP = {
    analyze_task: 'analyze',
    blame_task: 'blame',
    corpus_pruning_task: 'corpus_pruning',
    fuzz_task: 'fuzz',
    impact_task: 'impact',
    minimize_task: 'minimize',
    train_rnn_generator_task: 'train_rnn_generator',
    progression_task: 'progression',
    regression_task: 'regression',
    symbolize_task: 'symbolize',
    unpack_task: 'unpack',
    upload_reports_task: 'upload_reports',
    variant_task: 'variant',
}

export const Task = (json) => {
    return {
        job_id: {
            value: json.job_id,
            editable: true,
            header: "UUID",
            type: String,
            required: true,
        },
        platform: {
            value: json.platform,
            editable: true,
            header: "Platform",
            type: Object,
            required: true,
        },
        command: {
            value: json.command,
            editable: true,
            header: "Command to execute",
            type: Object,
            required: true,
        },
        argument: {
            value: json.argument,
            editable: true,
            header: "Fuzzer_engine, testid, etc",
            type: String,
            required: true,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                platform: Platforms,
                command: COMMAND_MAP,
            };
        },
        get_payload: (task) => {
            let payload =  {};
            for (let key in task) {
                if (task[key].editable) {
                    payload[key] = task[key].value;
                }
            }
            return payload;
        }
    };
}