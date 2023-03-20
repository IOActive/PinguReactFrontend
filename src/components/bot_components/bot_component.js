import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBot, deleteBot } from "../../actions/bot";
import BotDataService from "../../services/bot_service";

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
    this.getBot(this.props.match.params.id);
  }

  onChangeTaskPayload(e) {
    const task_payload = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBot: {
          ...prevState.currentBot,
          task_payload: task_payload,
        },
      };
    });
  }

  onChangeBotName(e) {
    const bot_name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBot: {
          ...prevState.currentBot,
          bot_name: bot_name,
        },
      };
    });
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
            currentBot: response.data,
        });
        console.log(response.data);
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

    return (
      <div>
        {currentBot ? (
          <div className="edit-form">
            <h4>Bot</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Bot Name">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="bot_name"
                  value={currentBot.bot_name}
                  onChange={this.onChangeBotName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Task Payload</label>
                <input
                  type="text"
                  className="form-control"
                  id="task_payload"
                  value={currentBot.task_payload}
                  onChange={this.onChangeTaskPayload}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeBot}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
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

export default connect(null, { updateBot, deleteBot })(Bot);