import { retrieveJobs, findJobsByName, updateJob, deleteJob } from "../../../actions/job";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./JobsList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDigging, faVial } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { Job } from "../../../models/Job";
import React from "react";
import AddTask from "../../../components/Tasks/CreateTask/CreateTask";
import { retrieveJobTestCases } from "../../../actions/testcase"
import { TestCase } from "../../../models/TestCase";
import { useNavigate } from "react-router-dom";


const JobsList = (props) => {
  const [currentJob, setCurrentJob] = React.useState(null);
  const [currentTestcase, setCurrentTestCase] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [enableCreateTasks, setEnableCreateTasks] = React.useState(false);
  const [enableUploadFuzzTarget, setEnableUploadFuzzTarget] = React.useState(false);

  const selector = useSelector((state) => state.jobs);
  const selector_testcase = useSelector((state) => state.testcases);

  let navigate = useNavigate();

  function editJob() {
    // swtich state of editing
    setEnableEditing(!enableEditing);
  }

  function createTask() {
    setEnableCreateTasks(!enableCreateTasks);
  }

  function UploadFuzzTarget() {
    setEnableUploadFuzzTarget(!enableCreateTasks);
  }

  //TODO: add logs view for each job based in the logs bucket
  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Jobs</BreadcrumbItem>
        <BreadcrumbItem active>Jobs List</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Jobs List</h1>


      <InteractiveTable
        glyph={<FontAwesomeIcon icon={faDigging} />}
        search_fucntion={findJobsByName}
        objectName={"Jobs"}
        setCurrentObject={setCurrentJob}
        retieve_data_function={props.retrieveJobs}
        selector={selector}
        colums={["id", "name", "date"]}
      />

      <div responsive className={cx("mb-0", s.JobCardsGroup)}>
        {currentJob ? (
          <div responsive className={cx("mb-0", s.JobCardsGroup)}>
            <div className={cx(s.JobRow)}>
              <div class="col-md-6">
                <InformationTable
                  id="Job Info Table"
                  object={Job(currentJob)}
                  objectName={"Job"}
                />
                <ButtonGroup className={cx(s.JobButtonGroup)}>
                  <Button className={cx(enableEditing ? s.JobEditButton_red_bg : s.JobEditButton_blue_bg)} onClick={editJob}>Edit {"Job"}</Button>
                  <Button className={cx(enableCreateTasks ? s.CreateTaskButton_red_bg : s.CreateTaskButton_blue_bg)} onClick={createTask}>Create {"Task"}</Button>
                  <Button className={cx(enableUploadFuzzTarget ? s.UploadFuzzTarget_red_bg: s.UploadFuzzTarget_blue_bg)} onClick={UploadFuzzTarget}>Upload FuzzTarget</Button>
                </ButtonGroup>
              </div>
              <div class="col-md-6">
                {enableEditing ? (
                  <EditObject
                    object={Job(currentJob)}
                    updateObject={props.updateJob}
                    deleteObject={props.deleteJob}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className={cx(s.JobRow)}>
              {enableCreateTasks ? (
                <AddTask
                  job_id={currentJob.id}
                />
              ) : (
                <div />
              )
              }
            </div>
            <div responsive className={cx("mb-0", s.JobCardsGroup)}>
              <div className={cx(s.JobRow)}>
                <div class={cx(s.JobCol)}>
                  <InteractiveTable
                    glyph={<FontAwesomeIcon icon={faVial} />}
                    search_fucntion={null}
                    objectName={"TestCases"}
                    setCurrentObject={setCurrentTestCase}
                    retieve_data_function={props.retrieveJobTestCases}
                    selector={selector_testcase}
                    colums={["id", "status", "has_bug_flag", "triaged", "timestamp"]}
                    parent_object_id={currentJob.id}
                  />
                  {
                    currentTestcase ? (
                      <ButtonGroup className={cx(s.JobButtonGroup)}>
                        <Button className={cx(s.TestCaseDetailsButton)} onClick={() => navigate('/app/testcase/' + currentTestcase['id'])}> TestCase {currentTestcase['id']} Details</Button>
                      </ButtonGroup>

                    ) : (
                      <div />
                    )
                  }
                </div>
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
})(JobsList);
