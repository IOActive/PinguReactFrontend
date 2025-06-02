/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { connect } from "react-redux";
import { createFuzzer } from "actions/fuzzer";
import { useSelector } from "react-redux";
import { Fuzzer } from "models/Fuzzer";
import CreateObject from "components/CreateObject/CreateObject";

function AddFuzzer(props) {

    const active_project = useSelector((state) => state.active_project);
    
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
        stats_columns: "{}",
        stats_column_descriptions: "{}",
        builtin: false,
        differential: false,
        has_large_testcases: false,
        data_bundle_name: "",
        project: active_project
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
