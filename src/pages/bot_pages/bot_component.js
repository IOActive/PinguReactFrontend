import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBot } from "../../actions/bot";
import { deleteBot } from "../../actions/bot";
import BotDataService from "../../services/bot_service";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form"
import { Redirect } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Bot extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);

    this.getBot = this.getBot.bind(this);
    this.updateContent= this.updateContent.bind(this);
    this.removeBot = this.removeBot.bind(this);

    this.state = {
      currentBot: {
        "id": null,
        "bot_name": "",
        "last_beat_time": null,
        "task_payload": "",
        "task_end_time": null,
        "task_status": "NA",
        "platform": ""
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
      [name]: value 
    },
    }));
  };

  getBot(id) {
    BotDataService.get(id)
      .then((response) => {
        this.setState({
          currentBot: response.data[0],
        });
        console.log(response.data[0]);
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
      history.push("/bots");
      window.location.reload();   
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
        history.push("/bots");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBot } = this.state;
    const { user: currentUser, message } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="submit-form">
        {currentBot ? (
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bot Name</Form.Label>
            <Form.Control type="text" placeholder={currentBot.bot_name} id="title"
                  name="bot_name"
                  value={currentBot.bot_name}
                  onChange={this.onInputChange}/>
            <Form.Text className="text-muted" id="bot_name" value={currentBot.bot_name}>
            {currentBot.bot_name}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Platform</Form.Label>
            <Form.Control type="text" placeholder={currentBot.bot_name} id="title"
                  name="platform"
                  value={currentBot.platform}
                  onChange={this.onInputChange}/>
            <Form.Text className="text-muted" id="bot_name" value={currentBot.bot_name}>
            {currentBot.bot_name}
            </Form.Text>
          </Form.Group>

          {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

          <ButtonGroup className="me-5" aria-label="First group">
              <Button variant="primary" type="submit" onClick={this.updateContent}>
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
            <p>Please click on a Bot...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { message } = state.message;

  return {
    //bot: state.bots[0],
    user,
    message,
  };
};

export default connect(mapStateToProps, {
  updateBot,
  deleteBot,
})(Bot);