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

import Platforms from 'helpers/Platforms'

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
        platform: {
            value: Platforms[json.platform],
            editable: true,
            header: "The platform that the bot is running on",
            type: Object,
            required: true,
        },
        current_task_id: {
            value: json.current_task_id,
            editable: false,
            header: "Current Task",
            type: String,
            required: true,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
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