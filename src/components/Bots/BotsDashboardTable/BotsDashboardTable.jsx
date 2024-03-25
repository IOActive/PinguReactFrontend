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
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../../actions/bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BotsDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.bots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBots(1))
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(retrieveBots(1))
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch])


  return (
        <DashboardTable
          objectName={"Bots"}
          glyph={<FontAwesomeIcon icon={faRobot} />}
          retrieveData={props.retrieveBots}
          findObjectByName={props.findBotsByName}
          colums={["name", "last_beat_time", "platform", "task_payload", "task_status"]}
          list_path={"/app/bot/list"}
          data={payload}
          isFetching={isFetching}
        />
  );
};


const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.bots,
    user,
  };
};

export default connect(mapStateToProps, {
  retrieveBots,
  findBotsByName,
})(BotsDashboardTable);
