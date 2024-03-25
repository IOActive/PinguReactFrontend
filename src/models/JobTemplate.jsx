export const JobTemplate = (json) => {
    return {
        id: {
            value: json.id,
            editable: false,
            header: "UUID",
            type: String,
            required: false,
        },
        name: {
            value: json.name,
            editable: true,
            header: "The name of the job template",
            type: String,
            required: true,
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The template enviroment parameters",
            type: String,
            required: true,
        },

        validated: false,
        submitted: false,
        get_enums: () => {
            return {
            };
        },
        get_payload: (job) => {
            let payload = {};
            for (let key in job) {
                payload[key] = job[key].value;
            }
            return payload;
        }
    };
}