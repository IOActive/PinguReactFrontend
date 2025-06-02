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

import Platforms from 'helpers/Platforms'
import Code from "./Code";

const COMMAND_MAP = {
    analyze_task: 'analyze',
    corpus_pruning_task: 'corpus_pruning',
    fuzz_task: 'fuzz',
    //impact_task: 'impact',
    minimize_task: 'minimize',
    train_rnn_generator_task: 'train_rnn_generator',
    progression_task: 'progression',
    regression_task: 'regression',
    symbolize_task: 'symbolize',
    //unpack_task: 'unpack',
    upload_reports_task: 'upload_reports',
    //variant_task: 'variant',
}

const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};

export const Task = (json) => {
    return {
        id: {
            value: json.id ,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
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
            type: String,
            required: true,
        },
        argument: {
            value: json.argument,
            editable: true,
            header: "Fuzzer_engine, testid, etc",
            type: String,
            required: true,
        },
        end_time: {
            value: new Date(json.end_time),
            editable: false,
            header: "The time when the task should be finished",
            type: Date,
            required: false,
        },
        create_time: {
            value: new Date(json.create_time),
            editable: false,
            header: "The time when the task was created",
            type: Date,
            required: false,
        },
        status: {
            value: TASK_STATUS[json.status],
            editable: false,
            header: "The status of the task",
            type: Object,
            required: false,
        },
        bot_log: {
            value: (json.bot_log) ? decodeURIComponent(json.bot_log.substring(1)): null,
            editable: false,
            header: "Bot execution log",
            type: Code,
            required: false,
        },
        heartbeat_log: {
            value: (json.heartbeat_log) ? decodeURIComponent(json.heartbeat_log.substring(1)): null,
            editable: false,
            header: "Bot heartbeat log",
            type: Code,
            required: false,
        },
        run_fuzzer_log: {
            value: (json.run_fuzzer_log) ? decodeURIComponent(json.run_fuzzer_log.substring(1)): null,
            editable: false,
            header: "Bot run fuzzer process log",
            type: Code,
            required: false,
        },
        run_heartbeat_log: {
            value: (json.run_heartbeat_log) ? decodeURIComponent(json.run_heartbeat_log.substring(1)): null,
            editable: false,
            header: "Bot run heartbeat process log",
            type: Code,
            required: false,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                platform: Platforms,
                command: COMMAND_MAP,
                task_status: TASK_STATUS,
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