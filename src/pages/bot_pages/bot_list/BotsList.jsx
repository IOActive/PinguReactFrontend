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
import { Highlighter } from "../../../components/Highlighter/Highlighter"
import { decode_base64 } from "../../../helpers/utils";
import Card from "react-bootstrap/Card";



const BotsList = (props) => {
  const [currentBot, setCurrentBot] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [enableBotLog, setEnableBotLog] = React.useState(false);

  const selector = useSelector((state) => state.bots);

  function editBot() {
    // swtich state of editing
    setEnableEditing(!enableEditing);

  }

  function botLog() {
    setEnableBotLog(!enableBotLog);
  }

  function clearLogs() {

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


      <div responsive className={cx("mb-0", s.CardsGroup)}>
        <div className={cx(s.CardRow)}>
          <div class={cx(s.CardCol)}>
            <InteractiveTable
              glyph={<FontAwesomeIcon icon={faRobot} />}
              search_fucntion={props.findBotsByName}
              objectName={"Bots"}
              setCurrentObject={setCurrentBot}
              retieve_data_function={props.retrieveBots}
              selector={selector}
              colums={["name"]}
            />
          </div>
        </div>
        {currentBot ? (
          <div responsive className={cx("mb-0", s.CardsGroup)}>
            <div className={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                <InformationTable
                  object={Bot(currentBot)}
                  objectName={"Bot"}
                  ignored_fields={['bot_logs']}
                />
                <ButtonGroup className={cx(s.CardButtonGroup)}>
                  <Button className={cx(enableEditing ? s.Button_bg_red : s.Button_bg_blue)} onClick={editBot}>Edit {"Bot"}</Button>
                  <Button className={cx(enableBotLog ? s.Button_bg_red : s.Button_bg_blue)} onClick={botLog}>Log {"Bot"}</Button>
                </ButtonGroup>
              </div>
              <div class={cx(s.CardCol)}>
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
            <div className={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                {enableBotLog ? (
                  <Card>
                    <Card.Header>Bot Logs</Card.Header>
                    <Card.Body>
                      <Highlighter>
                        {decode_base64(Bot(currentBot)["bot_logs"]["value"])}
                      </Highlighter>
                    </Card.Body>
                    <ButtonGroup className={cx(s.CardButtonGroup)}>
                      <Button className={cx(s.Button_bg_blue)} onClick={clearLogs}>Clear Logs</Button>
                    </ButtonGroup>
                  </Card>


                ) : (
                  <div />
                )}
              </div>
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
