import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../../actions/job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardTable from "../../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";

const JobsDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.jobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveJobs(1))
  }, [dispatch]);


  return (
        <DashboardTable
          objectName={"Jobs"}
          glyph={<FontAwesomeIcon icon={faPersonDigging} />}
          retrieveData={props.retrieveJobs}
          findObjectByName={props.findJobsByName}
          colums={["name", "project", "platform", "enabled"]}
          list_path={"/app/job/list"}
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
