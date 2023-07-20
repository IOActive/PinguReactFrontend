import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteBot, getBot, updateBot } from "../../../actions/bot";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button, Breadcrumb, BreadcrumbItem} from "reactstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

import s from "./BotEdit.module.scss";

const BotEdit = (props) => {

  const navigate = useNavigate();


  const [currentBot, setCurrentBot] = useState({
    id: null,
    bot_name: "",
    last_beat_time: null,
    task_payload: "",
    task_end_time: null,
    task_status: "NA",
    platform: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getBot(props.match.params.id);
  }, [props.match.params.id]);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentBot((prevState) => ({
      ...prevState.currentBot,
      [name]: value,
    }));
  };

  const getBot = (id) => {
    props.getBot(id)
      .then((response) => {
        setCurrentBot(response[0]);
        console.log(response[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = (event) => {
    event.preventDefault();
    
    props
      .updateBot(currentBot.id, currentBot)
      .then((reponse) => {
        console.log(reponse);
        navigate("/app/bot/list");
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
        navigate("/app/bot/list");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Bots</BreadcrumbItem>
        <BreadcrumbItem active>Bot</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Bot</h1>
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

            <ButtonGroup className="me-5" aria-label="First group">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button onClick={removeBot} variant="danger" className="ml-2">
                Delete
              </Button>
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
  return {
  };
};

export default connect(mapStateToProps, { getBot, updateBot, deleteBot })(BotEdit);
