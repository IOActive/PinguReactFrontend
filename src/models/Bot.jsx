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

import Platforms from '../helpers/Platforms'
import Code from "./Code";

const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};

export const Bot = (json) => {
    return {
        id: {
            value: json.id ,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        name: {
            value: json.name,
            editable: true,
            header: "The name of the bot",
            type: String,
            required: true,
        },
        last_beat_time: {
            value: new Date(json.last_beat_time),
            editable: false,
            header: "The last time the bot sent a heartbeat",
            type: Date,
            required: false,
        },
        task_payload: {
            value: json.task_payload,
            editable: false,
            header: "The task payload that the bot is currently working on",
            type: String,
            required: false,
        },
        task_end_time: {
            value: new Date(json.task_end_time),
            editable: false,
            header: "The time when the task should be finished",
            type: Date,
            required: false,
        },
        task_status: {
            value: TASK_STATUS[json.task_status],
            editable: false,
            header: "The status of the task",
            type: Object,
            required: false,
        },
        platform: {
            value: Platforms[json.platform],
            editable: true,
            header: "The platform that the bot is running on",
            type: Object,
            required: true,
        },
        blobstore_log_path: {
            value: json.blobstore_log_path,
            editable: true,
            header: "The bucket were the bots logs are going to be stored",
            type: String,
            required: false,
        },
        bot_logs: {
            value: (json.bot_logs) ? decodeURIComponent(json.bot_logs.substring(1)): null,
            editable: false,
            header: "The platform that the bot is running on",
            type: Code,
            required: false,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: Platforms
            };
        },
        get_payload: (bot) => {
            let payload = {};
            for (let key in bot) {
                if (bot[key].editable) {
                    if (key !== "bot_logs")
                        payload[key] = bot[key].value;
                }
            }
            return payload;
        }
    };
};