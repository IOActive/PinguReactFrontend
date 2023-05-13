import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveBots,
  findBotsByName,
} from "../../actions/bot";

import { Navigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { history } from '../../helpers/history';


class BotsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBotName = this.onChangeSearchBotName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBot = this.setActiveBot.bind(this);
    this.findByName= this.findByName.bind(this);
    this.editBot = this.editBot.bind(this);

    this.state = {
      currentBot: null,
      currentIndex: -1,
      searchBotName: "",
    };
  }

  componentDidMount() {
    this.props.retrieveBots();
  }

  onChangeSearchBotName(e) {
    const searchBotName = e.target.value;

    this.setState({
        searchBotName: searchBotName,
    });
  }

  refreshData() {
    this.setState({
        currentBot: null,
        currentIndex: -1,
    });
  }

  setActiveBot(bot, index) {
    this.setState({
      currentBot: bot,
      currentIndex: index,
    });
  }

  findByName() {
    this.refreshData();

    this.props.findBotsByName(this.state.searchBotName);
  }

  editBot(id) {
    history.push({pathname:"/bot/" + this.state.currentBot.id, state: {bot: this.state.currentBot}});
    window.location.reload();
  }

  render() {
    const { searchBotName, currentBot, currentIndex } = this.state;
    const { bots } = this.props;
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Bot name"
              value={searchBotName}
              onChange={this.onChangeSearchBotName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Bots List</h4>

          <ul className="list-group">
            {bots &&
              bots.map((bot, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBot(bot, index)}
                  key={index}
                >
                  {bot.bot_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentBot ? (
            <Card>
              <Card.Header>{currentBot.bot_name}</Card.Header>
              <Card.Body>
                <Card.Text>Payload: {currentBot.task_payload}</Card.Text>
                <Card.Text>Last beat time: {currentBot.last_beat_time}</Card.Text>
                <Card.Text>Task end time: {currentBot.task_end_time}</Card.Text>
                <Card.Text>Task status: {currentBot.task_status}</Card.Text>
                <Button onClick={this.editBot}>Edit</Button>
              </Card.Body>
            </Card>
          ) : (
            <div>
              <br />
              <p>Please click on a Bot...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.bots,
    user,
    bot: state.currentBot,
  };
};

export default connect(mapStateToProps, {
  retrieveBots,
  findBotsByName,
})(BotsList);