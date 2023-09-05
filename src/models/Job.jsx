// Note: Job model

const Job = (json) => {
    return {
        id: json.id,
        name: json.name,
        description: json.description,
        project: json.project,
        date: new Date(json.date),
        enabled: json.enabled === "true",
        archived: json.archived === "true",
        platform: json.platform,
        environment_string: json.environment_string,
        custom_binary_path: json.custom_binary_path,
        custom_binary_filename: json.custom_binary_filename,
        custom_binary_revision: json.custom_binary_revision,
        get_enums: () => {
            return {
                platform: {
                    windows: "windows",
                    linux: "linux",
                    mac: "mac",
                },
            };
        }
    };
}

export default Job;