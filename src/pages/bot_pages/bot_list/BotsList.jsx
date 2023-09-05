import React from "react";
import { retrieveBots, findBotsByName } from "../../../actions/bot";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import cx from "classnames";

import s from "./BotsList.module.scss";
import { useSelector } from "react-redux";
import BotEdit from "../BotEdit/BotEdit";
import InteractiveList from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import Bot from "../../../models/Bot";

const BotsList = (props) => {
  const [currentBot, setCurrentBot] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);

  const { isFetching, payload } = useSelector((state) => state.bots);

  React.useEffect(() => {
    retrieveBots();
  }, [retrieveBots]);

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

      <InteractiveList
                refreshData={refreshBotsData}
                glyph={<FontAwesomeIcon icon={faRobot} />}
                search_fucntion={props.findBotsByName}
                objectName={"Bots"}
                isFetching={isFetching}
                payload={payload}
                setCurrentObject={setCurrentBot}
                value_key_name={"bot_name"}
            />

      <div responsive className={cx("mb-0", s.BotCardsGroup)}>
        {currentBot ? (
          <div class="row">
            <div class="col-md-6">
              {InformationTable(currentBot, editBot, currentBot.bot_name)}
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
