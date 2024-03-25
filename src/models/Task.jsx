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