import { connect } from "react-redux";
import { createJob } from "../../../actions/job";
import { useSelector } from "react-redux";
import { Job } from "../../../models/Job";
import CreateObject from "../../../components/CreateObject/CreateObject";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { retrieveJobTemplates } from "../../../actions/jobTemplate";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import s from './JobCreate.module.scss'

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

  const { isFetching, payload } = useSelector(state => state.jobTemplates);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveJobTemplates())
  }, [dispatch]);

  function apply_template(template_parameters) {
    const environment_string = document.getElementById("environment_string");
    if (environment_string) {
      let current_value = environment_string.value;
      environment_string.value = [current_value, template_parameters].join("\n");
    }

  }

  return (


    <div>
      <DropdownButton id="dropdown-basic-button" title="Job Templates">
        {
          isFetching && (
            <tr>
              <td colSpan="100">Loading...</td>
            </tr>
          )
        }
        {
          payload &&
          !isFetching &&

          payload.map((object, index) => (

            <Dropdown.Item onClick={(e) => apply_template(object.environment_string)}>{object.name}</Dropdown.Item>

          ))
        }
      </DropdownButton>

      <CreateObject
        object={newJob}
        createObject={props.createJob}
        errorMessage={errorMessage}
        objectName={"Job"}
      />



    </div>


  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createJob, retrieveJobTemplates })(AddJob);
