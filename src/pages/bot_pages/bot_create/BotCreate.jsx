import React, { Component } from "react";
import { connect } from "react-redux";
import { createBot } from "../../../actions/bot";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert } from "bootstrap";

class AddBot extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);

    this.saveBot = this.saveBot.bind(this);
    this.newBot = this.newBot.bind(this);

    this.state = {
      id: null,
      bot_name: "",
      last_beat_time: null,
      task_payload: "",
      task_end_time: null,
      task_status: "NA",
      platform: "",
      validated: false,
    };
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  saveBot(event) {
    const {
      bot_name,
      last_beat_time,
      task_payload,
      task_end_time,
      task_status,
      platform,
    } = this.state;

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.setState({ validated: true });
    const current_time = new Date(); 
    const last_beat_time_now = current_time.toISOString();
    const { history } = this.props;

    if (form.checkValidity() === true){
    this.props
      .createBot(
        bot_name,
        last_beat_time_now,
        task_payload,
        task_end_time,
        task_status,
        platform
      )
      .then(() => {
        this.setState({
          submitted: true,
          
        });
        history.push("/bots");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }

  newBot() {
    this.setState({
      id: null,
      bot_name: "",
      last_beat_time: "",
      task_payload: "",
      task_end_time: "",
      task_status: "",
      platform: "",

      submitted: false,
      validated: false,
    });
  }

  render() {
    const { user: currentUser, message } = this.props;
    const { validated } = this.state

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBot}>
              Add
            </button>
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={this.saveBot}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Bot name</Form.Label>
                <Form.Control
                  required
                  id="bot_name"
                  name="bot_name"
                  type="text"
                  placeholder="name"
                  defaultValue=""
                  onChange={this.onInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Label>Platform</Form.Label>
                <Form.Control
                  required
                  id="platform"
                  name="platform"
                  type="text"
                  placeholder="linux"
                  defaultValue=""
                  onChange={this.onInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
          
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
            )}
            <div >
            <Button variant="primary" type="submit"> Submit</Button>
            </div>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createBot })(AddBot);
