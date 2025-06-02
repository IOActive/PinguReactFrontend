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

export const BotConfig = (json) => {
    return {
        id: {
            value: json.id ,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        config_data: {
            value: json.name,
            editable: true,
            header: "Bot YAML Configuration",
            type: String,
            required: true,
        },
        bot_id: {
            value: json.bot_id,
            editable: false,
            header: "Bot UUID",
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
        get_payload: (bot_cofig) => {
            let payload = {};
            for (let key in bot_cofig) {
                if (bot_cofig[key].editable) {
                    if (key !== "config_data")
                        payload[key] = bot_cofig[key].value;
                }
            }
            return payload;
        }
    };
};