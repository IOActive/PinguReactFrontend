import React from "react";
import { retrieveBots, findBotsByName } from "../../../actions/bot";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import cx from "classnames";

import s from "./BotsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar/SearchBar";
import BotEdit from "../BotEdit/BotEdit";

const BotsList = (props) => {
  const [currentBot, setCurrentBot] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [searchBotName, setSearchBotName] = React.useState("");
  const [enableEditing, setEnableEditing] = React.useState(false);

  const { isFetching, payload } = useSelector((state) => state.bots);

  React.useEffect(() => {
    retrieveBots();
  }, [retrieveBots]);

  function onChangeSearchBotName(e) {
    const searchBotName = e.target.value;

    setSearchBotName(searchBotName);
  }

  function refreshData() {
    setCurrentBot(null);
    setCurrentIndex(-1);
  }

  function setActiveBot(bot, index) {
    setCurrentBot(bot);
    setCurrentIndex(index);
    setEnableEditing(false);
  }

  const findByName = () => {
    refreshData();
    props.findBotsByName(searchBotName);
  };

  const refreshBotsData = () => {
    props.retrieveBots();
    setEnableEditing(false);
    setCurrentBot(null);
  };

  function editBot() {
    setEnableEditing(true);
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
            <SearchBar
              searchValue={searchBotName}
              onChangeSearchValue={onChangeSearchBotName}
              findByName={findByName}
              refreshData={refreshBotsData}
            />
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

      <div responsive className={cx("mb-0", s.BotCardsGroup)}>
        {currentBot ? (
          <div class="row">
            <div class="col-md-6">
              <Card className={cx("mb-0", s.BotInformantionCard, "flex-fill")}>
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
                  <div className={cx("", s.EditButton)}>
                    <Button onClick={editBot}>Edit Bot</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md-6">
              {enableEditing ? (
                <Card className={cx("mb-0", s.BotEditCard, "flex-fill")}>
                  <Card.Header>{currentBot.bot_name}</Card.Header>
                  <Card.Body>
                    <BotEdit botData={currentBot} />
                  </Card.Body>
                </Card>
              ) : (
                <div />
              )}
            </div>
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
})(BotsList);
