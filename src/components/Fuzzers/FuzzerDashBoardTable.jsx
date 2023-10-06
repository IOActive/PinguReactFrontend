import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveFuzzers, findFuzzersByName } from "../../actions/fuzzer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {DashboardTable} from "../DashBoardTable/DashBoardTable"
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
    <div>
      {payload && (
        <DashboardTable
          objectName={"Fuzzers"}
          glyph={<FontAwesomeIcon icon={faRocket} />}
          retrieveData={retrieveFuzzers}
          findObjectByName={findFuzzersByName}
          colums={["ID", "Name", "Revision", "Supported_Platforms"]}
          list_path={"/app/fuzzer/list"}
          data={payload.results}
          isFetching={isFetching}
        />
      )}
    </div>
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
  retrieveFuzzers,
  findFuzzersByName,
})(FuzzersDashboardTable);
