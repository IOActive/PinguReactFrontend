import { connect } from "react-redux";
import { createJob } from "../../../actions/job";
import { useSelector } from "react-redux";
import { Job } from "../../../models/Job";
import CreateObject from "../../../components/CreateObject/CreateObject";

function AddJob(props) {

  const newJob = Job({
    id: null,
    name: "",
    description: "",
    project: "",
    date: new Date(),
    enabled: true,
    archived: false,
    platform: "",
    environment_string: "",
    custom_binary_path: "",
    custom_binary_filename: "",
    custom_binary_revision: 1,
    validated: false,
    submitted: false,
  });

  const { errorMessage } = useSelector(
    (state) => state.jobs
  );

  return (
    <CreateObject
      object={newJob}
      createObject={props.createJob}
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

export default connect(mapStateToProps, { createJob })(AddJob);
