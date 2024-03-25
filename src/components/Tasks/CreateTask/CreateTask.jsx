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
import { createTask } from "../../../actions/task";
import { useSelector } from "react-redux";
import { Task } from "../../../models/Task";
import CreateObject from "../../CreateObject/CreateObject";

function AddTask(props) {

    const { job_id, closeConstant, platform, command="analyze" } = props;

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
        />
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps, { createTask })(AddTask);