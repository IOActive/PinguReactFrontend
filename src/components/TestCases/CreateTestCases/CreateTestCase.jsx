import { connect } from "react-redux";
import { createTestcase } from "../../../actions/testcase";
import { useSelector } from "react-redux";
import { TestCase } from "../../../models/TestCase";
import CreateObject from "../../CreateObject/CreateObject";

function AddTestCase(props) {

    const { job_id, closeConstant } = props;

    const newTestCase = TestCase({
        absolute_path: "",
        queue: "",
        timestamp: new Date().toString(),
        testcase_path: "",
        archive_state: 0,
        job_id: job_id,
        fuzzer_id: "",
        validated: false,
        submitted: false,
      });

    const { errorMessage } = useSelector(
        (state) => state.tasks
    );

    return (
        <CreateObject
            object={newTestCase}
            createObject={props.createTestCase}
            errorMessage={errorMessage}
            objectName={"TestCase"}
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

export default connect(mapStateToProps, { createTestcase })(AddTestCase);