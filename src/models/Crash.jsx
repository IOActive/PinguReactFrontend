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

import Code from "./Code";

export const Crash = (json) => {
    return {
        id: {
            value: json.id,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        testcase_id: {
            value: json.testcase_id,
            editable: false,
            header: "Test Case UUID",
            type: String,
            required: false,
        },
        crash_signal: {
            value: json.crash_signal,
            editable: false,
            header: "Crash Signal",
            type: Number,
            required: false,
        },
        exploitability: {
            value: json.exploitability,
            editable: false,
            header: "Exploitability",
            type: String,
            required: false,
        },
        crash_time: {
            value: json.crash_time,
            editable: false,
            header: "Crash Time",
            type: Number,
            required: false,
        },
        crash_hash: {
            value: json.crash_hash,
            editable: false,
            header: "Crash Hash",
            type: String,
            required: false,
        },
        verified: {
            value: json.verified === true,
            editable: false,
            header: "Verified",
            type: Boolean,
            required: false,
        },
        additional: {
            value: json.additional,
            editable: false,
            header: "Additional Information", 
            type: String,
            required: false,
        },
        iteration: {
            value: json.iteration,
            editable: false,
            header: "Fuzzy iteration", 
            type: Number,
            required: false,
        },
        crash_type: {
            value: json.crash_type,
            editable: false,
            header: "Crash Type", 
            type: String,
            required: false,
        },
        crash_address: {
            value: json.crash_address,
            editable: false,
            header: "Crash Address", 
            type: String,
            required: false,
        },
        crash_state: {
            value: json.crash_state,
            editable: false,
            header: "Crash State", 
            type: String,
            required: false,
        },
        crash_stacktrace: {
            value: json.crash_stacktrace,
            editable: false,
            header: "Crash Stacktrace", 
            type: Code,
            required: false,
        },
        regression: {
            value: json.regression,
            editable: false,
            header: "Regression", 
            type: String,
            required: false,
        },
        security_severity: {
            value: json.security_severity,
            editable: false,
            header: "Security severity", 
            type: Number,
            required: false,
        },
        absolute_path: {
            value: json.absolute_path,
            editable: false,
            header: "Path to crash input", 
            type: String,
            required: false,
        },
        security_flag: {
            value: json.security_flag === true,
            editable: false,
            header: "Security flag", 
            type: Boolean,
            required: false,
        },
        reproducible_flag: {
            value: json.reproducible_flag === true,
            editable: false,
            header: "Reproducible flag", 
            type: Boolean,
            required: false,
        },
        return_code: {
            value: json.return_code,
            editable: false,
            header: "Return code", 
            type: Number,
            required: false,
        },
        gestures: {
            value: json.gestures,
            editable: false,
            header: "Gestures", 
            type: Object,
            required: false,
        },
        resource_list: {
            value: json.resource_list,
            editable: false,
            header: "Resource List", 
            type: Object,
            required: false,
        },
        fuzzing_strategy: {
            value: json.fuzzing_strategy,
            editable: false,
            header: "Fuzzing strategy", 
            type: Object,
            required: false,
        },
        should_be_ignored: {
            value: json.should_be_ignored === true,
            editable: false,
            header: "Should be ignored", 
            type: Boolean,
            required: false,
        },
        application_command_line: {
            value: json.application_command_line,
            editable: false,
            header: "Application command line", 
            type: String,
            required: false,
        },
        unsymbolized_crash_stacktrace: {
            value: json.unsymbolized_crash_stacktrace,
            editable: false,
            header: "Unsymbolized crash stacktrace", 
            type: Code,
            required: false,
        },
        crash_frame: {
            value: json.crash_frame,
            editable: false,
            header: "Crash Frame", 
            type: Object,
            required: false,
        },
        crash_revision: {
            value: json.crash_revision,
            editable: false,
            header: "Crash Revision", 
            type: Number,
            required: false,
        },
        crash_info: {
            value: json.crash_info,
            editable: false,
            header: "Crash Frame", 
            type: String,
            required: false,
        },

        validated: false,
        submitted: false,
        get_enums: () => {
            return {
            };
        },
        get_payload: (task) => {
            let payload = {};
            for (let key in task) {
                if (task[key].editable) {
                    payload[key] = task[key].value;
                }
            }
            return payload;
        }
    };
}