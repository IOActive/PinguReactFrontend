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

import { connect } from "react-redux";
import { createBot } from "actions/bot";
import { useSelector } from "react-redux";
import { Bot } from "models/Bot";
import CreateObject from "components/CreateObject/CreateObject";

function AddBot(props) {

  const newBot = Bot({
    id: null,
    name: "",
    last_beat_time: null,
    task_payload: "",
    task_end_time: null,
    task_status: "NA",
    platform: "",
    validated: false,
    submitted: false,
  });

  const { errorMessage } = useSelector(
    (state) => state.bots
  );

  return (
    <CreateObject
      object={newBot}
      createObject={props.createBot}
      errorMessage={errorMessage}
      objectName={"Bot"}
      />
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createBot })(AddBot);
