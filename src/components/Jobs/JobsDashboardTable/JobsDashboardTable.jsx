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

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveJobs, findJobsByName } from "actions/job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardTable from "components/DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";

const JobsDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.jobs);

  const active_project = useSelector((state) => state.active_project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveJobs(1, active_project))
  }, [dispatch]);


  return (
        <DashboardTable
          objectName={"Jobs"}
          glyph={<FontAwesomeIcon icon={faPersonDigging} />}
          retrieveData={props.retrieveJobs}
          findObjectByName={props.findJobsByName}
          colums={["id", "name", "platform", "enabled"]}
          list_path={"/job/list"}
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
  retrieveJobs,
  findJobsByName,
})(JobsDashboardTable);
