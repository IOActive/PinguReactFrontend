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
import { get_bot_config, update_bot_config, get_default_bot_config, create_bot_config } from "actions/bot_config";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import cx from "classnames";
import s from "./bot_config.module.scss";
import Card from "react-bootstrap/Card";
import { CodeEditor } from "components/CodeEditor/code_editor";
import { CloseButton } from "components/CloseButton/CloseButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button, Alert } from "reactstrap";
import { connect } from "react-redux";

const BotConfig = (props) => {
  const { monitoredBotId, setEnableBotConfig } = props;

  const [currentBotConfig, setCurrentBotConfig] = React.useState(null);
  const [defaultBotConfig, setDefaultBotConfig] = React.useState(null);
  const [getDefaultConfig, setGetDefaultBotConfig] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const dispatch = useDispatch();

  const { errorMessage, isFetching, payload } = useSelector((state) => state.bot_configs);

  useEffect(() => {
    if (monitoredBotId) {
      dispatch(get_bot_config(monitoredBotId))
        .catch((error) => console.error('Failed to fetch bot config:', error));
    }
  }, [dispatch, monitoredBotId]);

  useEffect(() => {
    if (payload && payload.results && payload.results[0] && payload.count > 0) {
      setCurrentBotConfig(payload.results[0]);
    } else if (payload && payload.count === 0 && !isFetching) {
      setGetDefaultBotConfig(true);
      dispatch(get_default_bot_config(monitoredBotId))
        .catch((error) => console.error('Failed to fetch default bot config:', error));
    } else if (payload && payload.count === 0 && !isFetching) {
      // Additional handling for cases where count is zero but not fetching
    }
  }, [payload]);

  useEffect(() => {
    if (payload) {
      setDefaultBotConfig(payload);
    }
  }, [getDefaultConfig]);

  useEffect(() => {
    if (defaultBotConfig) {
      // Parse and convert the YAML to JSON
      const defaultBotConfigFormatted = JSON.stringify(defaultBotConfig['config_data'], null, 2);
      defaultBotConfig['config_data'] = defaultBotConfigFormatted;
      setCurrentBotConfig(defaultBotConfig);
    }
  }, [defaultBotConfig]);

  useEffect(() => {
    if (errorMessage)
      setShowError(!showError);
  }, [errorMessage]);

  function updata_config_data(value) {
    currentBotConfig['config_data'] = value;
  }


  // Function to save the configuration
  const save_config = () => {
    if (currentBotConfig) {
      if (!currentBotConfig.id) {
        const payload = { config_data: currentBotConfig['config_data'], bot_id: monitoredBotId };
        dispatch(create_bot_config(payload))
          .catch((error) => console.error('Failed to Update bot config:', error));
      }
      else {
        const payload = { config_data: currentBotConfig['config_data'] };
        dispatch(update_bot_config(currentBotConfig.id, payload))
          .catch((error) => console.error('Failed to Update bot config:', error));
      }


      // setEnableBotConfig(false); // Optionally close the config panel after saving
    } else {
      console.error("No configuration to save.");
    }
  };

  return (
    <Card className={cx("mb-0", s.Card)}>
      <Card.Header>
        Bot Config
        <CloseButton closeConstant={setEnableBotConfig} />
      </Card.Header>
      <Card.Body>

        {!isFetching && currentBotConfig ? (
          <div className="PanelsBox">
            <CodeEditor
              setCode={updata_config_data}
              code={currentBotConfig['config_data']}
            />
          </div>

        ) : (
          "Loading..."
        )}
      </Card.Body>
      <ButtonGroup className={cx(s.buttons_container)}>
        <Button className={cx(s.Button_bg_blue)} onClick={save_config}>Submit Config</Button>
      </ButtonGroup>
      
      {showError && (
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
  get_bot_config,
  update_bot_config,
  get_default_bot_config,
  create_bot_config
})(BotConfig);