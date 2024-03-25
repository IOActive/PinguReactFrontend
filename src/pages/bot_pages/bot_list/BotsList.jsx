# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import React, { useEffect } from "react";
import { retrieveBots, findBotsByName, updateBot, deleteBot, getBot } from "../../../actions/bot";
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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CloseButton } from "../../../components/CloseButton/CloseButton";
import { useDispatch } from "react-redux";


const BotLog = (props) => {
  const {monitoredBotId, setEnableBotLog, currentLogs} = props;

  const [currentBotLog, setCurrentBotLog] = React.useState(decode_base64(currentLogs));

  function clearLogs() {

  };

  const dispatch = useDispatch();

  const { isFetching, payload } = useSelector((state) => state.bots);

  useEffect(() => {
    const interval = setInterval(() => {
      if (monitoredBotId) {
        dispatch(getBot(monitoredBotId))
        if (payload) {
          setCurrentBotLog(decode_base64(Bot(payload.results[0]).bot_logs.value));
        }
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [])

  return (
    <Card>
      <Card.Header>Bot Logs
        <CloseButton
          closeConstant={setEnableBotLog}
        />
      </Card.Header>
      <Card.Body>
        <Highlighter>
          {currentBotLog}
        </Highlighter>
      </Card.Body>
      <ButtonGroup className={cx(s.CardButtonGroup)}>
        <Button className={cx(s.Button_bg_blue)} onClick={clearLogs}>Clear Logs</Button>
      </ButtonGroup>
    </Card>
  );
}
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

                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item onClick={editBot}>Edit {"Bot"}</Dropdown.Item>
                  <Dropdown.Item onClick={botLog}>Log {"Bot"}</Dropdown.Item>
                </DropdownButton>

              </div>
              <div class={cx(s.CardCol)}>
                {enableEditing ? (
                  <EditObject
                    object={Bot(currentBot)}
                    updateObject={props.updateBot}
                    deleteObject={props.deleteBot}
                    errorMessage={errorMessage}
                    closeConstant={setEnableEditing}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                {enableBotLog ? (
                  <BotLog
                  monitoredBotId={currentBot.id}
                  setEnableBotLog={setEnableBotLog}
                  currentLogs={Bot(currentBot).bot_logs.value}
                  />
                ): (
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
  deleteBot,
  getBot,
})(BotsList);
