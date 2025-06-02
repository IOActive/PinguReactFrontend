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
import { createTask } from "actions/task";
import { useSelector } from "react-redux";
import { Task } from "models/Task";
import CreateObject from "components/CreateObject/CreateObject";

function AddTask(props) {

    const { job_id, closeConstant, platform, command = "fuzz" } = props;

    const newTask = Task({
        job_id: job_id,
        platform: platform,
        command: command,
        argument: "",
        validated: false,
        submitted: false,
    });

    const { errorMessage } = useSelector(
        (state) => state.tasks
    );

    return (
        <CreateObject
            object={newTask}
            createObject={props.createTask}
            errorMessage={errorMessage}
            objectName={"Task"}
            closeConstant={closeConstant}
            helpText={helpText}
            display_header={false}
        />
    );
}

const helpText = "There are differet types of tasks that can be created for a job.\n\
Please note that some tasks may require additional arguments to be specified.\n\
- Fuzz task need the name of the fuzzer as argument.\n\
    For example, to create a fuzz task for the 'libFuzzer' fuzzer, you would enter 'libFuzzer' as the argument.\
- Analyze task need the testcase id to analyze.\n\
- Corpus pruning needs the name of the fuzzer as argument.\n\
- Regression task need the testcase id.\n\
- Progression task need the testcase id.\n\
- Minimization task need the testcase id.\n\
- Symbolize task need the testcase id.\n\
";

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps, { createTask })(AddTask);