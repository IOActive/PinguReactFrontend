import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBot } from "../../actions/bot";
import BotDataService from "../../services/bot_service";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form"
import { Navigate } from 'react-router-dom';

class Bot extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.onChangeLastBeat = this.onChangeLastBeat.bind(this);
    this.onChangeTaskEndTime = this.onChangeTaskEndTime.bind(this);
    this.onChangeBotName = this.onChangeBotName.bind(this);
    this.onChangePlatform = this.onChangePlatform.bind(this);
    this.onChangeTaskPayload = this.onChangeTaskPayload.bind(this);

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
    this.getBot(this.props.bot.id);
  }

  onChangeTaskPayload(e) {
    const task_payload = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        task_payload: task_payload,
      },
    }));
  }

  onChangeBotName(e) {
    const bot_name = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        bot_name: bot_name,
      },
    }));
  }

  onChangeTaskStatus(e) {
    const task_status = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        task_status: task_status,
      },
    }));
  }

  onChangeLastBeat(e) {
    const last_beat_time = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        last_beat_time: last_beat_time,
      },
    }));
  }


  onChangeTaskEndTime(e) {
    const task_end_time = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        task_end_time: task_end_time,
      },
    }));
  }

  onChangePlatform(e) {
    const platform = e.target.value;

    this.setState((prevState) => ({
        currentBot: {
        ...prevState.currentBot,
        platform: platform,
      },
    }));
  }

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

  updateContent() {
    this.props
    .updateBot(this.state.currentBot.id, this.state.currentBot)
    .then((reponse) => {
      console.log(reponse);
      
      this.setState({ message: "The bot was updated successfully!" });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  removeBot() {
    this.props
      .deleteBot(this.state.currentBot.id)
      .then(() => {
        this.props.history.push("/bots");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBot } = this.state;
    const { user: currentUser, message } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return (
      <div>
        {currentBot ? (
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bot Name</Form.Label>
            <Form.Control type="text" placeholder={currentBot.bot_name} id="title"
                  name="bot_name"
                  value={currentBot.bot_name}
                  onChange={this.onChangeBotName}/>
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
            
          <Button variant="primary" type="submit" onClick={this.updateContent}>
            Update
          </Button>
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
    bot: state.bots[0],
    user,
    message,
  };
};

export default connect(mapStateToProps, {
  updateBot,
})(Bot);