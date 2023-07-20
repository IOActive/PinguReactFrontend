import React from "react";
import { retrieveBots, findBotsByName } from "../../../actions/bot";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button, Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import cx from "classnames";


import s from "./BotsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRobot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const BotsList = (props) => {


  const [botId, setBotId] = React.useState("");
  const [currentBot, setCurrentBot] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [searchBotName, setSearchBotName] = React.useState("");
  const [isDropdownOpened, setIsDropdownOpened] = React.useState(false);


  const {isFetching, payload } = useSelector(state => state.bots);

  // propf

  React.useEffect(() => {
    retrieveBots();
  }, [retrieveBots]);

  function handleChange(e){
    setBotId(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    findBotsByName(botId);
  };

  function onChangeSearchBotName(e){
    const searchBotName = e.target.value;

    setSearchBotName(searchBotName);
  };

  function refreshData(){
    setCurrentBot(null);
    setCurrentIndex(-1);
  };

  function setActiveBot(bot, index){
    setCurrentBot(bot);
    setCurrentIndex(index);
  };

  function findByName() {
    refreshData();

    findBotsByName(searchBotName);
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
                  onClick={findByName}
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
                  onChange={onChangeSearchBotName}
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
              {isFetching && (
                <tr>
                  <td colSpan="100">Loading...</td>
                </tr>
              )}
              {!isFetching &&
                payload.map((bot, index) => (
                  <tr>
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveBot(bot, index)}
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
