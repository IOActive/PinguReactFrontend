import React from "react";
import { retrieveBots, findBotsByName, updateBot, deleteBot } from "../../../actions/bot";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import cx from "classnames";

import s from "./BotsList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
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
    // swtich state of editing
    setEnableEditing(!enableEditing);
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
            <InformationTable
              currentObject={currentBot}
              editObject={editBot}
              objectName={"Bot"}
            />
            </div>
            <div class="col-md-6">
              {enableEditing ? (
                <EditObject
                  object={Bot(currentBot)}
                  updateObject={props.updateBot}
                  deleteObject={props.deleteBot}
                />
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
  updateBot,
  deleteBot
})(BotsList);
