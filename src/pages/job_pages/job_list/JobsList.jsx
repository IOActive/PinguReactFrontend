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

import { retrieveJobs, findJobsByName, updateJob, deleteJob } from "actions/job";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./JobsList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "components/EditObject/EditObject";
import InteractiveTable from "components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDigging, faVial, faList } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "components/InformationTable/InformationTable";
import { Job } from "models/Job";
import React from "react";
import AddTask from "components/Tasks/CreateTask/CreateTask";
import AddTestCase from "components/TestCases/CreateTestCases/CreateTestCase";
import UploadCustomBinary from "components/Custom_Binary/Upload_Custom_Binary/UploadCustomBinary";
import UploadCorpus from "components/Corpus/Upload_Corpus/UploadCorpus"
import { retrieveJobTestCases, createTestcase, retrieveTestCaseByID } from "actions/testcase";
import { retrieveTasksByJobId, retrieveTaskByID } from "actions/task";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { PageHeader } from "components/PageHeader/PageHeader";


const JobsList = (props) => {
  const [currentJob, setCurrentJob] = React.useState(null);
  const [currentTestcase, setCurrentTestCase] = React.useState(null);
  const [currentTask, setCurrentTask] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [enableCreateTasks, setEnableCreateTasks] = React.useState(false);
  const [enableUploadTestCase, setEnableUploadTestCase] = React.useState(false);
  const [enableCreateCustomBinary, setEnableCustomBianry] = React.useState(false);
  const [enableUploadCorpus, setEnableUploadCorpus] = React.useState(false);

  const selector = useSelector((state) => state.jobs);
  const selector_testcase = useSelector((state) => state.testcases);
  const selector_task = useSelector((state) => state.tasks);

  const active_project = useSelector((state) => state.active_project);
  
  let navigate = useNavigate();

  function editJob() {
    // swtich state of editing
    setEnableEditing(!enableEditing);
  }

  function display_createTask() {
    setEnableCreateTasks(!enableCreateTasks);
  }

  function display_UploadTestCase() {
    setEnableUploadTestCase(!enableUploadTestCase);
  }

  function display_UploadCustomBinary() {
    setEnableCustomBianry(!enableCreateCustomBinary);
  }

  function display_UploadCorpus() {
    setEnableUploadCorpus(!enableCreateCustomBinary);
  }



  return (
    <div className={s.root}>
      <PageHeader title="Job List"/>
      <div responsive className={cx(s.CardsGroup)}>
        <div className={cx(s.CardRow)}>
          <div className={cx(s.CardCol)}>
            <InteractiveTable
              glyph={<FontAwesomeIcon icon={faDigging} />}
              search_fucntion={findJobsByName}
              objectName={"Jobs"}
              setCurrentObject={setCurrentJob}
              retieve_data_function={props.retrieveJobs}
              selector={selector}
              colums={["id", "name", "date"]}
              parent_object_id={active_project}
            />
          </div>
        </div>

        {currentJob ? (
          <div responsive className={cx(s.CardsGroup)}>
            <div className={cx(s.CardRow)}>
              <div className={cx(s.CardCol)}>
                <InformationTable
                  id="Job Info Table"
                  object={Job(currentJob)}
                  objectName={"Job"}
                />

                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item onClick={editJob}>Edit {"Job"}</Dropdown.Item>
                  <Dropdown.Item onClick={display_createTask}>Create {"Task"}</Dropdown.Item>
                  <Dropdown.Item onClick={display_UploadTestCase}>Upload New Testcase</Dropdown.Item>
                  <Dropdown.Item onClick={display_UploadCustomBinary}>Upload New Custom Binary</Dropdown.Item>
                  <Dropdown.Item onClick={display_UploadCorpus}>Upload Corpus Bundle</Dropdown.Item>
                </DropdownButton>

              </div>
              <div className={cx(s.CardCol)}>
                {enableEditing ? (
                  <EditObject
                    object={Job(currentJob)}
                    updateObject={props.updateJob}
                    deleteObject={props.deleteJob}
                    closeConstant={setEnableEditing}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>

            <div className={cx(s.CardRow)}>
              {enableCreateTasks ? (
                <AddTask
                  job_id={currentJob.id}
                  closeConstant={setEnableCreateTasks}
                  platform={currentJob.platform}
                />
              ) : (
                <div />
              )
              }
            </div>

            <div className={cx(s.CardRow)}>
              {
                enableUploadTestCase ? (
                  <AddTestCase
                    job_id={currentJob.id}
                    closeConstant={setEnableUploadTestCase}
                  />
                ) : (
                  <div />
                )}
            </div>

            <div className={cx(s.CardRow)}>
              {
                enableCreateCustomBinary ? (
                  <UploadCustomBinary
                    job_id={currentJob.id}
                    closeConstant={setEnableCustomBianry}
                  />
                ) : (
                  <div />
                )}
            </div>

            <div className={cx(s.CardRow)}>
              {
                enableUploadCorpus ? (
                  <UploadCorpus
                    job_id={currentJob.id}
                    closeConstant={setEnableUploadCorpus}
                  />
                ) : (
                  <div />
                )}
            </div>

            <div className={cx(s.CardRow)}>
              {

                <div class={cx(s.CardCol)}>
                  <InteractiveTable
                    glyph={<FontAwesomeIcon icon={faList} />}
                    search_fucntion={props.retrieveTaskByID}
                    objectName={"Tasks"}
                    setCurrentObject={setCurrentTask}
                    retieve_data_function={props.retrieveTasksByJobId}
                    selector={selector_task}
                    colums={["id", "status", "create_time", "argument", "command"]}
                    parent_object_id={currentJob.id}
                  />
                  {
                    currentTask ? (
                      <ButtonGroup className={cx(s.ButtonGroup)}>
                        <Button className={cx(s.DetailsButton)} onClick={() => navigate('/task/' + currentTask['id'])}> Task {currentTask['id']} Details</Button>
                      </ButtonGroup>

                    ) : (
                      <div />
                    )
                  }
                </div>

              }
            </div>


            <div className={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                <InteractiveTable
                  glyph={<FontAwesomeIcon icon={faVial} />}
                  search_fucntion={props.retrieveTestCaseByID}
                  objectName={"TestCases"}
                  setCurrentObject={setCurrentTestCase}
                  retieve_data_function={props.retrieveJobTestCases}
                  selector={selector_testcase}
                  colums={["id", "status", "has_bug_flag", "triaged", "timestamp"]}
                  parent_object_id={currentJob.id}
                />
                {
                  currentTestcase ? (
                    <ButtonGroup className={cx(s.ButtonGroup)}>
                      <Button className={cx(s.DetailsButton)} onClick={() => navigate('/testcase/' + currentTestcase['id'])}> TestCase {currentTestcase['id']} Details</Button>
                    </ButtonGroup>

                  ) : (
                    <div />
                  )
                }
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Test Case...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    jobs: state.jobs,
    testcases: state.testcases,
    user,
    job: state.currentJob,
  };
};

export default connect(mapStateToProps, {
  retrieveJobs,
  findJobsByName,
  updateJob,
  deleteJob,
  retrieveJobTestCases,
  createTestcase,
  retrieveTestCaseByID,
  retrieveTaskByID,
  retrieveTasksByJobId,
})(JobsList);
