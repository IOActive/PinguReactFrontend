import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteBot, getBot, updateBot } from "../../../actions/bot";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button, Breadcrumb, BreadcrumbItem} from "reactstrap";
import Form from "react-bootstrap/Form";

import s from "./BotEdit.module.scss";



class BotEdit extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);

    this.getBot = this.getBot.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeBot = this.removeBot.bind(this);

    this.state = {
      currentBot: {
        id: null,
        bot_name: "",
        last_beat_time: null,
        task_payload: "",
        task_end_time: null,
        task_status: "NA",
        platform: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBot(this.props.match.params.id);
  }

  onInputChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      currentBot: {
        ...prevState.currentBot,
        [name]: value,
      },
    }));
  }

  getBot(id) {
    this.props.getBot(id)
      .then((response) => {
        this.setState({
          currentBot: response[0],
        });
        console.log(response[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent(event) {
    event.preventDefault();
    const { history } = this.props;
    this.props
      .updateBot(this.state.currentBot.id, this.state.currentBot)
      .then((reponse) => {
        console.log(reponse);
        history.push("/app/bots/list");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeBot(event) {
    event.preventDefault();
    const { history } = this.props;
    this.props
      .deleteBot(this.state.currentBot.id)
      .then((reponse) => {
        console.log(reponse);
        history.push("/app/bots/list");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBot, message } = this.state;

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
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bot Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={currentBot.bot_name}
                  id="title"
                  name="bot_name"
                  value={currentBot.bot_name}
                  onChange={this.onInputChange}
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
                  onChange={this.onInputChange}
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
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.updateContent}
                >
                  Update
                </Button>
              </ButtonGroup>

              <ButtonGroup className="me-5" aria-label="Second group">
                <Button variant="danger" type="submit" onClick={this.removeBot}>
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
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, {
  updateBot,
  deleteBot,
  getBot
})(BotEdit);


