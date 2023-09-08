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
        id: json.id ,
        bot_name: json.bot_name,
        last_beat_time: new Date(json.last_beat_time),
        task_payload:json.task_payload,
        task_end_time: new Date(json.task_end_time),
        task_status: TASK_STATUS[json.task_status],
        platform: json.platform,
        validated: false,
        submited: false,
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: Platforms
            };
        },
    };
};