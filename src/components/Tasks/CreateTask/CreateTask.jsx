import { connect } from "react-redux";
import { createTask } from "../../../actions/task";
import { useSelector } from "react-redux";
import { Task } from "../../../models/Task";
import CreateObject from "../../CreateObject/CreateObject";

function AddTask(props) {

    const { job_id } = props;

    const newTask = Task({
        job_id: job_id,
        platform: "",
        command: "",
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