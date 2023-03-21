import React, { Component } from "react";
import { connect } from "react-redux";
import { createBot } from "../../actions/bot";
import { Navigate } from 'react-router-dom';

class AddBot extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.onChangeLastBeat = this.onChangeLastBeat.bind(this);
    this.onChangeTaskEndTime = this.onChangeTaskEndTime.bind(this);
    this.onChangeBotName = this.onChangeBotName.bind(this);
    this.onChangePlatform = this.onChangePlatform.bind(this);
    this.onChangeTaskPayload = this.onChangeTaskPayload.bind(this);

    this.saveBot = this.saveBot.bind(this);
    this.newBot = this.newBot.bind(this);

    this.state =     {
        "id": null,
        "bot_name": "",
        "last_beat_time": null,
        "task_payload": "",
        "task_end_time": null,
        "task_status": "NA",
        "platform": ""
    };
  }

  onChangeTaskStatus(e) {
    this.setState({
        task_status: e.target.value,
    });
  }

  onChangeBotName(e) {
    this.setState({
        bot_name: e.target.value,
    });
  }

  onChangePlatform(e) {
    this.setState({
        platform: e.target.value,
    });
  }

  onChangeTaskPayload(e) {
    this.setState({
        task_payload: e.target.value,
    });
  }

  onChangeTaskEndTime(e) {
    this.setState({
        task_end_time: e.target.value,
    });
  }

  onChangeLastBeat(e) {
    this.setState({
        last_beat_time: e.target.value,
    });
  }

  saveBot() {
    const { bot_name, last_beat_time, task_payload, task_end_time, task_status, platform } = this.state;

    this.props
      .createBot(bot_name, last_beat_time, task_payload, task_end_time, task_status, platform)
      .then((data) => {
        this.setState({
          id: data.id,
          bot_name: data.bot_name,
          last_beat_time: data.last_beat_time,
          task_payload: data.task_payload,
          task_end_time: data.task_end_time,
          task_status: data.task_status,
          platform: data.platform,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
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
    });
  }

  render() {
    const { user: currentUser, message} = this.props;

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
          <div>
            <div className="form-group">
              <label htmlFor="title">Bot Name</label>
              <input
                type="text"
                className="form-control"
                id="bot_name"
                required
                value={this.state.bot_name}
                onChange={this.onChangeBotName}
                name="bot_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Task Payload</label>
              <input
                type="text"
                className="form-control"
                id="task_payload"
                required
                value={this.state.task_payload}
                onChange={this.onChangeTaskPayload}
                name="task_payload"
              />
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
            <button onClick={this.saveBot} className="btn btn-success">
              Submit
            </button>
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
    bots: state.bots,
    user,
    message,
  };
};

export default connect(mapStateToProps, { createBot })(AddBot);