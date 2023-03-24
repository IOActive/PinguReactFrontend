import React, { Component } from "react";
import { connect } from "react-redux";
import { createJob } from "../../actions/job";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

class AddJob extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);

    this.saveJob = this.saveJob.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      project: "",
      date: null,
      enabled: true,
      archived: false,
      platform: "",
      environment_string: "",
      template: null,
      custom_binary_path: "",
      custom_binary_filename: "",
      custom_binary_revision: "",
    };
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  saveJob(event) {
    const {
      name,
      description,
      project,
      enabled,
      archived,
      platform,
      environment_string,
      template,
      custom_binary_path,
      custom_binary_filename,
      custom_binary_revision,
    } = this.state;

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
    const current_time = new Date();
    const date_now = current_time.toISOString();
    const { history } = this.props;

    if (form.checkValidity() === true) {
      this.props
        .createJob(
          name,
          description,
          project,
          date_now,
          enabled,
          archived,
          platform,
          environment_string,
          template,
          custom_binary_path,
          custom_binary_filename,
          custom_binary_revision
        )
        .then(() => {
          history.push("/jobs");
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { user: currentUser, message } = this.props;
    const { validated } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="submit-form">
        <Form noValidate validated={validated} onSubmit={this.saveJob}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Job name</Form.Label>
            <Form.Control
              required
              id="job_name"
              name="job_name"
              placeholder="name"
              defaultValue=""
              onChange={this.onInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              id="platform"
              name="platform"
              placeholder="description"
              defaultValue=""
              onChange={this.onInputChange}
              as="textarea"
              rows={3}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Project name</Form.Label>
            <Form.Control
              required
              id="project"
              name="project"
              placeholder="project name"
              defaultValue=""
              onChange={this.onInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Select size="md">
            <option>Linux</option>
            <option>Windows</option>
            <option>Android</option>
          </Form.Select>
          <div key="inline-checkbox" className="mb-3">
            <Form.Check
              type="switch"
              id="enabled"
              name="enabled"
              label="enabled"
              defaultChecked
            />
            <Form.Check
              disabled
              type="switch"
              label="archived"
              id="archived"
              name="archived"
            />
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div>
            <Button variant="primary" type="submit">
              {" "}
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { message } = state.message;
  return {
    jobs: state.jobs,
    user,
    message,
  };
};

export default connect(mapStateToProps, { createJob })(AddJob);
