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
import { createJob } from "actions/job";
import { useSelector } from "react-redux";
import { Job } from "models/Job";
import CreateObject from "components/CreateObject/CreateObject";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { retrieveJobTemplates } from "actions/jobTemplate";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import s from './JobCreate.module.scss'
import cx from "classnames";


function AddJob(props) {

  const active_project = useSelector((state) => state.active_project);

  const newJob = Job({
    id: null,
    name: "",
    description: "",
    project: active_project,
    date: new Date(),
    enabled: true,
    archived: false,
    platform: "",
    environment_string: "",
    custom_binary_path: "",
    custom_binary_filename: "",
    custom_binary_revision: 1,
    project_id: "",
    validated: false,
    submitted: false,
  });

  const { errorMessage } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    newJob.project_id.value = active_project
  }, [active_project]);

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
      newJob.environment_string.value = [current_value, template_parameters].join("\n");
    }

  }

  return (
    <div className={cx(s.root)}>
      <div className={cx(s.creation_form)}>
        <CreateObject
          object={newJob}
          createObject={props.createJob}
          errorMessage={errorMessage}
          objectName={"Job"}
        />
      </div>
      <div className={cx(s.template)}>
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
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createJob, retrieveJobTemplates })(AddJob);
