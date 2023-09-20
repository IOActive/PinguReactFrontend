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
        },
        name: {
            value: json.name,
            editable: true,
            header: "The name of the job",
        },
        description: {
            value: json.description,
            editable: true,
            header: "The description of the job",
        },
        project: {
            value: json.project,
            editable: true,
            header: "The project that the job belongs to",
        },
        date: {
            value: new Date(json.date),
            editable: false,
            header: "The date when the job was created",
        },
        enabled: {
            value: json.enabled === "true",
            editable: true,
            header: "Whether the job is enabled or not",
        },
        archived: {
            value: json.archived === "true",
            editable: true,
            header: "Whether the job is archived or not",
        },
        platform: {
            value: json.platform,
            editable: true,
            header: "The platform that the job is running on",
        },
        environment_string: {
            value: json.environment_string,
            editable: true,
            header: "The environment string that the job is running on",
        },
        custom_binary_path: {
            value: json.custom_binary_path,
            editable: true,
            header: "The path to the custom binary that the job is running on",
        },
        custom_binary_filename: {
            value: json.custom_binary_filename,
            editable: true,
            header: "The filename of the custom binary that the job is running on",
        },
        custom_binary_revision: {
            value: json.custom_binary_revision,
            editable: true,
            header: "The revision of the custom binary that the job is running on",
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