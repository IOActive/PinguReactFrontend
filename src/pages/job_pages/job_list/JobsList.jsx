import { retrieveJobs, findJobsByName, updateJob, deleteJob } from "../../../actions/job";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./JobsList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDigging } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { Job } from "../../../models/Job";
import React from "react";
import AddTask from "../../../components/Tasks/CreateTask/CreateTask";

const JobsList = (props) => {
  const [currentJob, setCurrentJob] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [enableCreateTasks, setEnableCreateTasks] = React.useState(false);

  const selector = useSelector((state) => state.jobs);

  function editJob() {
    // swtich state of editing
    setEnableEditing(!enableEditing);
  }

  function createTask() {
    setEnableCreateTasks(!enableCreateTasks);
  }

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
        setEnableEditing={setEnableEditing}
      />

      <div responsive className={cx("mb-0", s.JobCardsGroup)}>
        {currentJob ? (
          <div responsive className={cx("mb-0", s.JobCardsGroup)}>
            <div className={cx(s.JobRow)}>
              <div class="col-md-6">
                <InformationTable
                  object={Job(currentJob)}
                  objectName={"Job"}
                />
                <ButtonGroup className={cx(s.JobButtonGroup)}>
                  <Button className={cx(enableEditing ? s.JobEditButton_red_bg : s.JobEditButton_blue_bg)} onClick={editJob}>Edit {"Job"}</Button>
                  <Button className={cx(enableCreateTasks ? s.CreateTaskButton_red_bg : s.CreateTaskButton_blue_bg)} onClick={createTask}>Create {"Task"}</Button>
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
              {enableCreateTasks ?(
              <AddTask
                job_id={currentJob.id}
              />
              ) : (
                <div />
              )
            }
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Bot...</p>
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
  deleteJob
})(JobsList);
