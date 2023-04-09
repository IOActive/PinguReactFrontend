import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../actions/bot";

import { Table, Badge } from "reactstrap";
import Widget from "../Widget/Widget";
import s from "./BotWidget.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

class BotWidget extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBotName = this.onChangeSearchBotName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.findByName = this.findByName.bind(this);

    this.state = {
      currentBot: null,
      currentIndex: -1,
      searchBotName: "",
    };
  }

  static propTypes = {
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    isFetching: false,
  };

  componentDidMount() {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      3000
    );
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

  findByName() {
    this.refreshData();

    this.props.findBotsByName(this.state.searchBotName);
  }

  render() {
    const { searchBotName } = this.state;
    const { bots } = this.props;

    return (
      <Widget
        title={
          <div>
            <div className="pull-right mt-n-xs">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
            <div className="pull-right mt-n-xs">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Bot name"
                value={searchBotName}
                onChange={this.onChangeSearchBotName}
              />
            </div>
            <h5 className="mt-0 mb-3">
              <FontAwesomeIcon icon={faRobot} /> Bots
            </h5>
          </div>
        }
      >
        <Table responsive borderless className={cx("mb-0", s.botsTable)}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Platform</th>
              <th>Payload</th>
              <th>Last beat time</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {bots && bots.isFetching && (
              <tr>
                <td colSpan="100">Loading...</td>
              </tr>
            )}
            { bots && bots.payload && !bots.isFetching &&
              bots.payload.slice(0, 6).map((bot, index) => (
                <tr>
                  <td>{bot.id}</td>
                  <td>{bot.bot_name}</td>
                  <td>{bot.platform}</td>
                  <td>{bot.task_payload}</td>
                  <td>{bot.last_beat_time}</td>
                  <td>
                  <Badge className="ml-xs" color={(bot.task_status === "ERROR" || bot.task_status === "NA") ? "danger" : "success"}>
                      {bot.task_status}
                    </Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          <Link to="/app/bots/list" className="btn btn-default">
            View all Bots{" "}
            <Badge className="ml-xs" color="danger">
              {bots.length}
            </Badge>
          </Link>
        </div>
      </Widget>
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
})(BotWidget);
