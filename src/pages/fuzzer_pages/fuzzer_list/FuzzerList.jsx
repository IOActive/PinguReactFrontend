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

import React from "react";
import { retrieveFuzzers, findFuzzersByName, updateFuzzer, deleteFuzzer, getFuzzer } from "../../../actions/fuzzer";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./FuzzersList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { Fuzzer } from "../../../models/Fuzzer";
import { Buffer } from 'buffer';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FuzzersList = (props) => {

  const [currentFuzzer, setCurrentFuzzer] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);

  const selector = useSelector((state) => state.fuzzers);

  function editFuzzer() {
    // swtich state of editing
    setEnableEditing(!enableEditing);

  }

  const { errorMessage } = useSelector(
    (state) => state.fuzzers
  );

  function DownloadFuzzer() {
    let fuzzer_zip_stream_b64 = currentFuzzer["fuzzer_zip"];
    if (fuzzer_zip_stream_b64 != null) {
      fuzzer_zip_stream_b64 = fuzzer_zip_stream_b64.substring(1);
      const urlDecodedBase64 = decodeURIComponent(fuzzer_zip_stream_b64);

      const buffer = Buffer.from(urlDecodedBase64, 'base64');

      // Create a Blob object from the buffer
      const blob = new Blob([buffer], { type: 'application/zip' });

      // Create a download link for the Blob object and simulate a click on the link to download the file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = currentFuzzer["name"] + ".zip";
      link.click();
    }
  }

  //TODO: add bigquery view to see fuzzer performance with graphics etc

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Fuzzers</BreadcrumbItem>
        <BreadcrumbItem active>Fuzzers List</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Fuzzers List</h1>

      <div responsive className={cx("mb-0", s.CardsGroup)}>
        <div className={cx(s.CardRow)}>
          <div className={cx(s.CardCol)}>
            <InteractiveTable
              glyph={<FontAwesomeIcon icon={faRocket} />}
              search_fucntion={props.findFuzzersByName}
              objectName={"Fuzzers"}
              setCurrentObject={setCurrentFuzzer}
              retieve_data_function={props.retrieveFuzzers}
              selector={selector}
              colums={["name"]}
            />
          </div>
        </div>
        {currentFuzzer ? (
          <div className={cx(s.CardRow)}>
            <div class={cx(s.CardCol)}>
              <InformationTable
                object={Fuzzer(currentFuzzer)}
                objectName={"Fuzzer"}
              />

              <DropdownButton id="dropdown-basic-button" title="Actions">
                <Dropdown.Item onClick={editFuzzer}>Edit {"Fuzzer"}</Dropdown.Item>
                <Dropdown.Item>Download Fuzzer</Dropdown.Item>
              </DropdownButton>
            </div>

            <div class="col-md-6">
              {enableEditing ? (
                <EditObject
                  object={Fuzzer(currentFuzzer)}
                  updateObject={props.updateFuzzer}
                  deleteObject={props.deleteFuzzer}
                  errorMessage={errorMessage}
                  closeConstant={setEnableEditing}
                />
              ) : (
                <div />
              )}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Fuzzer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    fuzzers: state.fuzzers,
    user,
    fuzzer: state.currentFuzzer,
  };
};

export default connect(mapStateToProps, {
  retrieveFuzzers,
  findFuzzersByName,
  updateFuzzer,
  deleteFuzzer
})(FuzzersList);
