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
import { connect, useSelector, useDispatch } from "react-redux";
import { readAllTasks } from "../../../actions/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../../DashBoardTable/DashBoardTable";


const TasksDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(readAllTasks())
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(readAllTasks())
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch])



  return (
        <DashboardTable
          objectName={"Tasks"}
          glyph={<FontAwesomeIcon icon={faTasks} />}
          retrieveData={props.readAllTasks}
          findObjectByName={props.readAllTasks}
          colums={["job_id", "platform", "command", "argument"]}
          list_path={null}
          data={payload}
          isFetching={isFetching}
        />
  );
};


const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.tasks,
    user,
  };
};

export default connect(mapStateToProps, {
  readAllTasks,
})(TasksDashboardTable);
