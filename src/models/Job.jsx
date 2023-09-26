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
        },
        name: {
            value: json.name,
            editable: true,
            header: "The name of the job",
            type: String,
        },
        description: {
            value: json.description,
            editable: true,
            header: "The description of the job",
            type: String,
        },
        project: {
            value: json.project,
            editable: true,
            header: "The project that the job belongs to",
            type: String,
        },
        date: {
            value: new Date(json.date),
            editable: false,
            header: "The date when the job was created",
            type: Date,
        },
        enabled: {
            value: json.enabled === "true",
            editable: true,
            header: "Whether the job is enabled or not",
            type: Boolean,
        },
        archived: {
            value: json.archived === "true",
            editable: true,
            header: "Whether the job is archived or not",
            type: Boolean,
        },
        platform: {
            value: Platforms[json.platform],
            editable: true,
            header: "The platform that the job is running on",
            type: Object,
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The environment string that the job is running on",
            type: String,
        },
        custom_binary_path: {
            value: json.custom_binary_path,
            editable: true,
            header: "The path to the custom binary that the job is running on",
            type: String,
        },
        custom_binary_filename: {
            value: json.custom_binary_filename,
            editable: true,
            header: "The filename of the custom binary that the job is running on",
            type: String,
        },
        custom_binary_revision: {
            value: json.custom_binary_revision,
            editable: true,
            header: "The revision of the custom binary that the job is running on",
            type: Number,
        },
        validated: false,
        submitted: false,
        get_enums: () => {
            return {
                platform: Platforms
            };
        },
    };
}