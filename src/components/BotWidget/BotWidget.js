import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

const BotWidget = (props) => {
  const [currentBot, setCurrentBot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchBotName, setSearchBotName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBots());
  }, [dispatch]);

  const {isFetching, payload } = useSelector(state => state.bots);

  const onChangeSearchBotName = (e) => {
    setSearchBotName(e.target.value);
  };

  const refreshData = () => {
    setCurrentBot(null);
    setCurrentIndex(-1);

  };

  const findByName = () => {
    refreshData();
    props.findBotsByName(searchBotName);
  };

  const refreshBotsData = () => {
    props.retrieveBots();
  };

  const { bots } = props;

  return (
    <Widget
      title={
        <div>
          <div className="pull-right mt-n-xs">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={refreshBotsData}
            >Refresh</button>
          </div>
          <div className="pull-right mt-n-xs">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Bot name"
              value={searchBotName}
              onChange={onChangeSearchBotName}
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
          {isFetching && (
            <tr>
              <td colSpan="100">Loading...</td>
            </tr>
          )}
          {
            payload &&
            !isFetching &&
            payload.slice(0, 6).map((bot, index) => (
              <tr key={index}>
                <td>{bot.id}</td>
                <td>{bot.bot_name}</td>
                <td>{bot.platform}</td>
                <td>{bot.task_payload}</td>
                <td>{bot.last_beat_time}</td>
                <td>
                  <Badge
                    className="ml-xs"
                    color={
                      bot.task_status === "ERROR" || bot.task_status === "NA"
                        ? "danger"
                        : "success"
                    }
                  >
                    {bot.task_status}
                  </Badge>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Link to="/app/bot/list" className="btn btn-default">
          View all Bots{" "}
          <Badge className="ml-xs" color="danger">
            {bots.length}
          </Badge>{" "}
        </Link>
      </div>
    </Widget>
  );
};


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
