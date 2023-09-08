const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};


const Bot = (json) => {
    return {
        id: json.id || null,
        bot_name: json.bot_name || "",
        last_beat_time: new Date(json.last_beat_time || new Date()),
        task_payload:json.task_payload || "",
        task_end_time: new Date(json.task_end_time || new Date()),
        task_status: TASK_STATUS[json.task_status || "NA"],
        platform: json.platform || "",
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: {
                    windows: "windows",
                    linux: "linux",
                    mac: "mac",
                },
            };
        },
        get_json: () => {
            return {
                id: json.id || null,
                bot_name: json.bot_name || "",
                last_beat_time: json.last_beat_time || new Date(),
                task_payload:json.task_payload || "",
                task_end_time: json.task_end_time || new Date(),
                task_status: json.task_status || "NA",
                platform: json.platform || "",
            };
        }
    };
};

export { Bot };