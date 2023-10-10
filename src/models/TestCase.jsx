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
            editable: false,
            header: "Test Case Source File",
            type: File,
            required: false,
        },
        fixed: {
            value: json.fixed,
            editable: true,
            header: "The crash related to this test case has been fixed",
            type: Boolean,
            required: false,
        },
        one_time_crasher_flag: {
            value: json.one_time_crasher_flag,
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
            editable: false,
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
            value: json.archived,
            editable: true,
            header: "Queue to publish related tasks",
            type: Boolean,
            required: false,
        },
        timestamp: {
            value: new Date(json.timestamp),
            editable: false,
            header: "Time when the test case was registered",
            type: Date,
            required: false,
        },
        status: {
            value: json.status,
            editable: true,
            header: "Test case status",
            type: Object,
            required: false,
        },
        triaged: {
            value: json.triaged,
            editable: false,
            header: "Indicating if cleanup triage needs to be done.",
            type: Boolean,
            required: false,
        },
        has_bug_flag: {
            value: json.has_bug_flag,
            editable: false,
            header: "Whether testcase has a bug (either bug_information or group_bug_information).",
            type: Boolean,
            required: false,
        },
        testcase_path: {
            value: json.testcase_path,
            editable: false,
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
            value: json.disable_ubsan,
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
        job_id: {
            value: json.job_id,
            editable: false,
            header: "Job ID associated with this test case",
            type: String,
            required: false,
        },
        fuzzer_id: {
            value: json.fuzzer_id,
            editable: false,
            header: "Fuzzer ID associated with this test case",
            type: String,
            required: false,
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