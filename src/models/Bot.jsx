const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};

const Platforms = {
    windows: "Windows",
    linux: "Linux",
    mac: "Mac",
};


const Bot = (json) => {
    return {
        id: json.id ,
        bot_name: json.bot_name,
        last_beat_time: new Date(json.last_beat_time),
        task_payload:json.task_payload,
        task_end_time: new Date(json.task_end_time),
        task_status: TASK_STATUS[json.task_status],
        platform: json.platform,
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: Platforms
            };
        },
        get_json: () => {
            return {
                id: json.id,
                bot_name: json.bot_name,
                last_beat_time: json.last_beat_time,
                task_payload:json.task_payload,
                task_end_time: json.task_end_time,
                task_status: json.task_status,
                platform: json.platform,
            };
        }
    };
};

export { Bot };