/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import { updateProject } from "actions/project";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import cx from "classnames";
import s from "./project_config.module.scss";
import Card from "react-bootstrap/Card";
import { CodeEditor } from "components/CodeEditor/code_editor";
import { CloseButton } from "components/CloseButton/CloseButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button, Alert } from "reactstrap";
import { connect } from "react-redux";


const ProjectConfig = (props) => {

  const { currentProject, errorMessage, closeConstant } = props;

  const dispatch = useDispatch();

  function updata_config_data(value) {
    currentProject['configuration'].value = value;
  }

  // Function to save the configuration
  const save_config = () => {
    dispatch(updateProject(currentProject.id.value, currentProject.get_payload(currentProject)));
  };

  return (
    <Card className={cx("mb-0", s.Card)}>
      <Card.Header>
        Project Config
        <CloseButton closeConstant={closeConstant} />
      </Card.Header>
      <Card.Body>

        {currentProject ? (
          <div className="PanelsBox">
            <CodeEditor
              setCode={updata_config_data}
              code={currentProject['configuration'].value}
            />
          </div>

        ) : (
          "Loading..."
        )}
      </Card.Body>
      <ButtonGroup className={cx(s.buttons_container)}>
        <Button className={cx(s.Button_bg_blue)} onClick={save_config}>Submit Config</Button>
      </ButtonGroup>
      
      {errorMessage && (
        <Alert size="sm" color="danger" className={cx(s.alert)}>
          {errorMessage}
        </Alert>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.bot_configs,
    user,
    bot_config: state.currentBotConfig,
  };
};

export default connect(mapStateToProps, {
  updateProject
})(ProjectConfig);