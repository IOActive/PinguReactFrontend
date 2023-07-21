import React, { useState } from "react";
import { connect } from "react-redux";
import { createBot } from "../../../actions/bot";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cx from "classnames";
import s from "./BotCreate.module.scss";
import Card from "react-bootstrap/Card";

function AddBot(props) {
  const [botData, setBotData] = useState({
    id: null,
    bot_name: "",
    last_beat_time: null,
    task_payload: "",
    task_end_time: null,
    task_status: "NA",
    platform: "",
    validated: false,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setBotData({
      ...botData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const saveBot = (event) => {
    const {
      bot_name,
      last_beat_time,
      task_payload,
      task_end_time,
      task_status,
      platform,
    } = botData;

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setBotData({ ...botData, validated: true });
    const current_time = new Date(); 
    const last_beat_time_now = current_time.toISOString();
    const { history } = props;

    if (form.checkValidity() === true){
      props
        .createBot(
          bot_name,
          last_beat_time_now,
          task_payload,
          task_end_time,
          task_status,
          platform
        )
        .then(() => {
          setBotData({
            ...botData,
            submitted: true,
            
          });
          navigate("/app/bot/list");
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
      }
  };

  const newBot = () => {
    setBotData({
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
  };

  return (
    <Card className={cx("mb-0", s.BotInformantionCard, "flex-fill")}>
    <Card.Header>Create New Bot</Card.Header>
    <Card.Body>
    <div responsive className={cx("mb-0", s.BotCard)}>
      {botData.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBot}>
            Add
          </button>
        </div>
      ) : (
        <Form noValidate validated={botData.validated} onSubmit={saveBot}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Bot name</Form.Label>
              <Form.Control
                required
                id="bot_name"
                name="bot_name"
                type="text"
                placeholder="name"
                defaultValue=""
                onChange={onInputChange}
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
                onChange={onInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
            {props.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {props.message}
              </div>
            </div>
            )}
            <div >
            <Button variant="primary" type="submit"> Submit</Button>
            </div>
          </Form>
        )}
      </div>
      </Card.Body>
      </Card>
    );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createBot })(AddBot);
