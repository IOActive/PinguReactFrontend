// Define the Bot model, the bot has the following parameters:
// const bot_fields = ["ID", "Bot Name", "Last Beat Time", "Task Payload", "Task End Time", "Task Status", "Platform"];
//

class Bot {

    constructor() {
        this.id = "";
        this.bot_name = "";
        this.last_beat_time = new Date();
        this.task_payload = "";
        this.task_end_time = new Date();
        this.task_status = "NA";
        this.platform = "NA";
    }

    fromJson(json) {
        const bot = new Bot();
        bot.id = json.id;
        bot.bot_name = json.bot_name;
        bot.last_beat_time = json.last_beat_time;
        bot.task_payload = json.task_payload;
        bot.task_end_time = json.task_end_time;
        bot.task_status = json.task_status;
        bot.platform = json.platform;
        return bot;
    }

    getBotFields() {
        return ["ID", "Bot Name", "Last Beat Time", "Task Payload", "Task End Time", "Task Status", "Platform"];
    }

}

export default Bot;