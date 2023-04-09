import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../../actions/bot";

import { Redirect, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button, Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import cx from "classnames";

import { history } from "../../../helpers/history";
import PropTypes from "prop-types";
import s from "./BotsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRobot } from "@fortawesome/free-solid-svg-icons";

class BotsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBotName = this.onChangeSearchBotName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBot = this.setActiveBot.bind(this);
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

  state = {
    isDropdownOpened: false,
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  };

  componentDidMount() {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      2000
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

  render() {
    const { searchBotName, currentBot, currentIndex } = this.state;
    const { bots } = this.props;
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Bots</BreadcrumbItem>
          <BreadcrumbItem active>Bots List</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Bots List</h1>

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
          <Table hover responsive className={cx("mb-0", s.BotsTable)}>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {bots && bots.isFetching && (
                <tr>
                  <td colSpan="100">Loading...</td>
                </tr>
              )}
              {!bots.isFetching &&
                bots &&
                bots.payload.map((bot, index) => (
                  <tr>
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
                  </tr>
                ))}
            </tbody>
          </Table>
        </Widget>

        <div responsive className={cx("mb-0", s.BotCard)}>
          {currentBot ? (
            <Card>
              <Card.Header>{currentBot.bot_name}</Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{currentBot.id}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{currentBot.bot_name}</td>
                    </tr>
                    <tr>
                      <td>Llatform</td>
                      <td>{currentBot.platform}</td>
                    </tr>
                    <tr>
                      <td>Task Payload</td>
                      <td>{currentBot.task_payload}</td>
                    </tr>
                    <tr>
                      <td>Last Beat Time</td>
                      <td>{currentBot.last_beat_time}</td>
                    </tr>
                    <tr>
                      <td>Task Status</td>
                      <td>
                        <Badge
                          className="ml-xs"
                          color={
                            currentBot.task_status === "ERROR" ||
                            currentBot.task_status === "NA"
                              ? "danger"
                              : "success"
                          }
                        >
                          {currentBot.task_status}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                  <Link
                    to={"/app/bot/" + currentBot.id}
                    className="btn btn-default"
                  >
                    Edit Bot{" "}
                  </Link>
                </div>
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
