import React from "react";
import { retrieveFuzzers, findFuzzersByName, updateFuzzer, deleteFuzzer } from "../../../actions/fuzzer";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import cx from "classnames";

import s from "./FuzzersList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "../../../components/EditObject/EditObject";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { Fuzzer } from "../../../models/Fuzzer";

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

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Fuzzers</BreadcrumbItem>
        <BreadcrumbItem active>Fuzzers List</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Fuzzers List</h1>


      <InteractiveTable
        glyph={<FontAwesomeIcon icon={faRocket} />}
        search_fucntion={props.findFuzzersByName}
        objectName={"Fuzzers"}
        setCurrentObject={setCurrentFuzzer}
        retieve_data_function={props.retrieveFuzzers}
        selector={selector}
        setEnableEditing={setEnableEditing}
      />

      <div responsive className={cx("mb-0", s.FuzzerCardsGroup)}>
        {currentFuzzer ? (
          <div class="row">
            <div class="col-md-6">
              <InformationTable
                currentObject={currentFuzzer}
                editObject={editFuzzer}
                objectName={"Fuzzer"}
              />
            </div>
            <div class="col-md-6">
              {enableEditing ? (
                <EditObject
                  object={Fuzzer(currentFuzzer)}
                  updateObject={props.updateFuzzer}
                  deleteObject={props.deleteFuzzer}
                  errorMessage={errorMessage}
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
