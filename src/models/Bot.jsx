const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};

const Platforms = {
    Windows: "Windows",
    Linux: "Linux",
    Mac: "Mac",
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
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: Platforms
            };
        },
        get_payload: (bot) => {
            return {
                name: bot.name.value,
                platform: bot.platform.value,
            };
        }
    };
};