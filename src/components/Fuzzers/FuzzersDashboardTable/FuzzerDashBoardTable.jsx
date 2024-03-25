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
import { retrieveFuzzers, findFuzzersByName } from "../../../actions/fuzzer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardTable from "../../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const FuzzersDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.fuzzers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveFuzzers(1))
  }, [dispatch]);


  return (
        <DashboardTable
          objectName={"Fuzzers"}
          glyph={<FontAwesomeIcon icon={faRocket} />}
          retrieveData={props.retrieveFuzzers}
          findObjectByName={props.findFuzzersByName}
          colums={["name", "revision", "supported_platforms"]}
          list_path={"/app/fuzzer/list"}
          data={payload}
          isFetching={isFetching}
        />
  );
};


const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    fuzzers: state.fuzzers,
    user,
  };
};

export default connect(mapStateToProps, {
  retrieveFuzzers,
  findFuzzersByName,
})(FuzzersDashboardTable);
