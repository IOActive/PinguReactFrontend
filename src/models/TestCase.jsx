# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

const STATUS = {
    PENDING: 'PENDING',
    ONGOING: 'ONGOING',
    UNREPRODUCIBLE: 'UNREODUCIBLE',
    DONE: 'DONE',
}

export const TestCase = (json) => {
    return {
        id: {
            value: json.id,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        bug_information: {
            value: json.bug_information,
            editable: false,
            header: "Bug Information",
            type: String,
            required: false,
        },
        test_case: {
            value: json.test_case,
            editable: true,
            header: "Test Case Source File",
            type: File,
            required: true,
        },
        fixed: {
            value: json.fixed,
            editable: true,
            header: "The crash related to this test case has been fixed",
            type: String,
            required: false,
        },
        one_time_crasher_flag: {
            value: json.one_time_crasher_flag === true,
            editable: false,
            header: "Did the bug only reproduced once ?",
            type: Boolean,
            required: false,
        },
        comments: {
            value: json.comments,
            editable: true,
            header: "Custom comments",
            type: String,
            required: false,
        },
        absolute_path: {
            value: json.absolute_path,
            editable: true,
            header: "The file on the bot that generated the testcase.",
            type: String,
            required: false,
        },
        queue: {
            value: json.queue,
            editable: true,
            header: "Queue to publish related tasks",
            type: String,
            required: false,
        },
        archived: {
            value: json.archived === true,
            editable: true,
            header: "Queue to publish related tasks",
            type: Boolean,
            required: false,
        },
        timestamp: {
            value: new Date(json.timestamp),
            editable: true,
            header: "Time when the test case was registered",
            type: Date,
            required: true,
        },
        status: {
            value: json.status,
            editable: true,
            header: "Test case status",
            type: Object,
            required: false,
        },
        triaged: {
            value: json.triaged === true,
            editable: false,
            header: "Indicating if cleanup triage needs to be done.",
            type: Boolean,
            required: false,
        },
        has_bug_flag: {
            value: json.has_bug_flag === true,
            editable: false,
            header: "Whether testcase has a bug (either bug_information or group_bug_information).",
            type: Boolean,
            required: false,
        },
        testcase_path: {
            value: json.testcase_path,
            editable: true,
            header: "store paths for various things like original testcase, minimized testcase, etc.",
            type: String,
            required: false,
        },
        additional_metadata: {
            value: json.additional_metadata,
            editable: false,
            header: "Testcase metadata",
            type: String,
            required: false,
        },
        fuzzed_keys: {
            value: json.fuzzed_keys,
            editable: false,
            header: "Blobstore keys for various things like original testcase",
            type: String,
            required: false,
        },
        minimized_keys: {
            value: json.minimized_keys,
            editable: false,
            header: "Blobstore keys for  minimized testcase, etc.",
            type: String,
            required: false,
        },
        minidump_keys: {
            value: json.minidump_keys,
            editable: false,
            header: "Blobstore keys for minidump testcase, etc.",
            type: String,
            required: false,
        },
        minimized_arguments: {
            value: json.minimized_arguments,
            editable: false,
            header: "Minimized argument list",
            type: String,
            required: false,
        },
        disable_ubsan: {
            value: json.disable_ubsan === true,
            editable: false,
            header: "Flag indicating if UBSan detection should be disabled. This is needed for" +
                "cases when ASan and UBSan are bundled in the same build configuration" +
                "and we need to disable UBSan in some runs to find the potentially more" +
                "nteresting ASan bugs.",
            type: Boolean,
            required: false,
        },
        regression: {
            value: json.regression,
            editable: false,
            header: "Regression range",
            type: String,
            required: false,
        },
        timeout_multiplier: {
            value: json.timeout_multiplier,
            editable: false,
            header: "Adjusts timeout based on multiplier value",
            type: Number,
            required: false,
        },
        redzone: {
            value: json.redzone,
            editable: false,
            header: "ASAN redzone size in bytes",
            type: Number,
            required: false,
        },
        archive_state: {
            value: json.archive_state,
            editable: false,
            header: "State representing whether the fuzzed or minimized testcases are archived.",
            type: Number,
            required: false,
        },
        job_id: {
            value: json.job_id,
            editable: true,
            header: "Job ID associated with this test case",
            type: String,
            required: true,
        },
        fuzzer_id: {
            value: json.fuzzer_id,
            editable: true,
            header: "Fuzzer ID associated with this test case",
            type: String,
            required: true,
        },

        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                status: STATUS
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