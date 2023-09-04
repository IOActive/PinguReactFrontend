import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteJob, updateJob } from "../../../actions/job";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button } from "reactstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import s from "./JobEdit.module.scss";
import { useSelector } from "react-redux";


const JobEdit = (props) => {
  const { jobData } = props;

  const navigate = useNavigate();

  const { errorMessage } = useSelector(
    (state) => state.jobs
  );

  const [currentJob, setCurrentJob] = useState({
    id: jobData.id,
    job_name: jobData.job_name,
    last_beat_time: jobData.last_beat_time,
    task_payload: jobData.task_payload,
    task_end_time: jobData.task_end_time,
    task_status: jobData.task_status,
    platform: jobData.platform,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentJob({
      ...jobData,
      [name]: value,
    });
  };

  const updateContent = (event) => {
    event.preventDefault();

    props
      .updateJob(currentJob.id, currentJob)
      .then((reponse) => {
        console.log(reponse);
        navigate("/app/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeJob = (event) => {
    event.preventDefault();
    props
      .deleteJob(currentJob.id)
      .then((reponse) => {
        console.log(reponse);
        navigate("/app/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={s.root}>
      <div className="submit-form">
        {currentJob.id != null ? (
          <Form onSubmit={updateContent}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentJob.job_name}
                id="title"
                name="job_name"
                value={currentJob.job_name}
                onChange={onInputChange}
              />
              <Form.Text
                className="text-muted"
                id="job_name"
                value={currentJob.job_name}
              >
                {currentJob.job_name}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Platform</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentJob.job_name}
                id="title"
                name="platform"
                value={currentJob.platform}
                onChange={onInputChange}
              />
              <Form.Text
                className="text-muted"
                id="job_name"
                value={currentJob.job_name}
              >
                {currentJob.job_name}
              </Form.Text>
            </Form.Group>

            {errorMessage && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </div>
            )}

            <ButtonGroup className={cx(s.ButtonGroupEditJob, 'btn-group')}>
              <Button onClick={updateContent}>Update</Button>
              <Button onClick={removeJob}>Delete</Button>
            </ButtonGroup>
          </Form>
        ) : (
          <div>
            <br />
            <p>Loading Job data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { updateJob, deleteJob })(
  JobEdit
);
