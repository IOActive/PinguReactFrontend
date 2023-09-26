// Note: Job model

const Platforms = {
    Windows: "Windows",
    Linux: "Linux",
    Mac: "Mac",
};

export const Job = (json) => {
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
            header: "The name of the job",
            type: String,
            required: true,
        },
        description: {
            value: json.description,
            editable: true,
            header: "The description of the job",
            type: String,
            required: true,
        },
        project: {
            value: json.project,
            editable: true,
            header: "The project that the job belongs to",
            type: String,
            required: true,
        },
        date: {
            value: new Date(json.date),
            editable: false,
            header: "The date when the job was created",
            type: Date,
            required: false,
        },
        enabled: {
            value: json.enabled === "true",
            editable: true,
            header: "Whether the job is enabled or not",
            type: Boolean,
            required: false,
        },
        archived: {
            value: json.archived === "true",
            editable: true,
            header: "Whether the job is archived or not",
            type: Boolean,
            required: false,
        },
        platform: {
            value: Platforms[json.platform],
            editable: true,
            header: "The platform that the job is running on",
            type: Object,
            required: true,
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The environment string that the job is running on",
            type: String,
            required: false,
        },
        custom_binary_path: {
            value: json.custom_binary_path,
            editable: true,
            header: "The path to the custom binary that the job is running on",
            type: String,
            required: false,

        },
        custom_binary_filename: {
            value: json.custom_binary_filename,
            editable: true,
            header: "The filename of the custom binary that the job is running on",
            type: String,
            required: false,

        },
        custom_binary_revision: {
            value: json.custom_binary_revision,
            editable: true,
            header: "The revision of the custom binary that the job is running on",
            type: Number,
            required: false,

        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                platform: Platforms
            };
        },
        get_payload: (job) => {
            let payload =  {};
            for (let key in job) {
                if (job[key].editable) {
                    payload[key] = job[key].value;
                }
            }
            return payload;
        }
    };
}