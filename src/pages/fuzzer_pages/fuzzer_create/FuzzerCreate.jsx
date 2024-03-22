import { connect } from "react-redux";
import { createFuzzer } from "../../../actions/fuzzer";
import { useSelector } from "react-redux";
import { Fuzzer } from "../../../models/Fuzzer";
import CreateObject from "../../../components/CreateObject/CreateObject";

function AddFuzzer(props) {

    const newFuzzer = Fuzzer({
        id: "",
        timestamp: new Date(),
        name: "",
        fuzzer_zip: "",
        filename: "",
        file_size: 0,
        blobstore_path: "",
        executable_path: "",
        revision: 1,
        timeout: 0,
        supported_platforms: "",
        launcher_script: "",
        result: "",
        result_timestamp: new Date(),
        console_output: "",
        return_code: "",
        sample_testcase: "",
        max_testcases: 0,
        additional_environment_string: "",
        stats_columns: {},
        stats_column_descriptions: {},
        builtin: true,
        differential: false,
        has_large_testcases: false,
        data_bundle_name: "",
    });

    const { errorMessage } = useSelector(
        (state) => state.fuzzers
    );

    return (
        <CreateObject
            object={newFuzzer}
            createObject={props.createFuzzer}
            errorMessage={errorMessage}
            objectName={"Fuzzer"}
        />
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps, { createFuzzer })(AddFuzzer);
