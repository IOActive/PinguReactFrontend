// Note: Bot Model

const Bot = {
    id: null,
    bot_name: "",
    platform: "",
    task_payload: "",
    last_beat_time: "",
    task_end_time: "",
    task_status: "",
    getFields: function () {
        return Object.keys(this);
    },
};

export default Bot;