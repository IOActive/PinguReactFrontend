import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveBots,
  findBotsByName,
  deleteAllBots,
} from "../../actions/bot";
import { Link } from "react-router-dom";
import BotDataService from "../../services/bot_service"

class BotsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBotName = this.onChangeSearchBotName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBot = this.setActiveBot.bind(this);
    this.findByName= this.findByName.bind(this);
    this.removeAllBots = this.removeAllBots.bind(this);

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

  removeAllBots() {
    this.props
      .deleteAllBots()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();

    this.props.findBotsByName(this.state.searchBotName);
  }

  render() {
    const { searchBotName, currentBot, currentIndex } = this.state;
    const { bots } = this.props;

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

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBots}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBot ? (
            <div>
              <h4>Bot</h4>
              <div>
                <label>
                  <strong>Bot name:</strong>
                </label>{" "}
                {currentBot.bot_name}
              </div>
              <div>
                <label>
                  <strong>Task Payload:</strong>
                </label>{" "}
                {currentBot.task_payload}
              </div>
              <div>
                <label>
                  <strong>Task Status:</strong>
                </label>{" "}
                {currentBot.task_status ? "NA" : "Pending"}
              </div>

              <Link
                to={"/bot/" + currentBot.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
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
  return {
    bots: state.bots,
  };
};

export default connect(mapStateToProps, {
  retrieveBots,
  findBotsByName,
  deleteAllBots,
})(BotsList);