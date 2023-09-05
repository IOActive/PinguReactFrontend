// Note: Bot Model

const TASK_STATUS = {
    STARTED: "STARTED",
    WIP: "WIP",
    FINISHED: "FINISHED",
    ERROR: "ERROR",
    NA: "NA",
};

/*class Bot {

    constructor(json) {
        this.id = json.id;
        this.bot_name = json.bot_name;
        this.last_beat_time = new Date(json.last_beat_time);
        this.task_payload = json.task_payload;
        this.task_end_time = new Date(json.task_end_time);
        this.task_status = TASK_STATUS[json.task_status];
        this.platform = json.platform;
    }

}*/

const Bot = (json) => {
    return {
        id: json.id,
        bot_name: json.bot_name,
        last_beat_time: new Date(json.last_beat_time),
        task_payload: json.task_payload,
        task_end_time: new Date(json.task_end_time),
        task_status: TASK_STATUS[json.task_status],
        platform: json.platform,
        get_enums: () => {
            return {
                task_status: TASK_STATUS,
                platform: {
                    windows: "windows",
                    linux: "linux",
                    mac: "mac",
                },
            };
        }
    };
};

export default Bot;