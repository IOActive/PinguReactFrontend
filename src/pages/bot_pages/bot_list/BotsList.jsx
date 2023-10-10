import React from "react";
import { retrieveBots, findBotsByName, updateBot, deleteBot } from "../../../actions/bot";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./BotsList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { Bot } from "../../../models/Bot";

const BotsList = (props) => {
  const [currentBot, setCurrentBot] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);

  const selector = useSelector((state) => state.bots);

  function editBot() {
    // swtich state of editing
    setEnableEditing(!enableEditing);
    
  }
  
  const { errorMessage } = useSelector(
    (state) => state.bots
  );

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Bots</BreadcrumbItem>
        <BreadcrumbItem active>Bots List</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Bots List</h1>
      Fuzzer

      <InteractiveTable
        glyph={<FontAwesomeIcon icon={faRobot} />}
        search_fucntion={props.findBotsByName}
        objectName={"Bots"}
        setCurrentObject={setCurrentBot}
        retieve_data_function={props.retrieveBots}
        selector={selector}
        setEnableEditing={setEnableEditing}
      />

      <div responsive className={cx("mb-0", s.BotCardsGroup)}>
        {currentBot ? (
          <div className={cx(s.BotRow)}>
            <div class="col-md-6">
              <InformationTable
                object={Bot(currentBot)}
                objectName={"Bot"}
              />
              <ButtonGroup className={cx(s.BotButtonGroup)}>
                <Button className={cx(enableEditing ? s.BotEditButton_bg_red: s.BotEditButton_bg_blue)} onClick={editBot}>Edit {"Bot"}</Button>
              </ButtonGroup>
            </div>
            <div class="col-md-6">
              {enableEditing ? (
                <EditObject
                  object={Bot(currentBot)}
                  updateObject={props.updateBot}
                  deleteObject={props.deleteBot}
                  errorMessage={errorMessage}
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
