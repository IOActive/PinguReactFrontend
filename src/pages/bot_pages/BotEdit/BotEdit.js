import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteBot, updateBot } from "../../../actions/bot";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button } from "reactstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import s from "./BotEdit.module.scss";

const BotEdit = (props) => {
  const { botData } = props;

  const navigate = useNavigate();

  const [currentBot, setCurrentBot] = useState({
    id: botData.id,
    bot_name: botData.bot_name,
    last_beat_time: botData.last_beat_time,
    task_payload: botData.task_payload,
    task_end_time: botData.task_end_time,
    task_status: botData.task_status,
    platform: botData.platform,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBot({
      ...botData,
      [name]: value,
    });
  };

  const updateContent = (event) => {
    event.preventDefault();

    props
      .updateBot(currentBot.id, currentBot)
      .then((reponse) => {
        console.log(reponse);
        navigate("/app/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeBot = (event) => {
    event.preventDefault();
    props
      .deleteBot(currentBot.id)
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
        {currentBot.id != null ? (
          <Form onSubmit={updateContent}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Bot Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentBot.bot_name}
                id="title"
                name="bot_name"
                value={currentBot.bot_name}
                onChange={onInputChange}
              />
              <Form.Text
                className="text-muted"
                id="bot_name"
                value={currentBot.bot_name}
              >
                {currentBot.bot_name}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Platform</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentBot.bot_name}
                id="title"
                name="platform"
                value={currentBot.platform}
                onChange={onInputChange}
              />
              <Form.Text
                className="text-muted"
                id="bot_name"
                value={currentBot.bot_name}
              >
                {currentBot.bot_name}
              </Form.Text>
            </Form.Group>

            <ButtonGroup className={cx(s.ButtonGroupEditBot, 'btn-group')}>
              <Button onClick={updateContent}>Update</Button>
              <Button onClick={removeBot}>Delete</Button>
            </ButtonGroup>
          </Form>
        ) : (
          <div>
            <br />
            <p>Loading Bot data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { updateBot, deleteBot })(
  BotEdit
);
