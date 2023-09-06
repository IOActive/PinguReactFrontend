import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../actions/job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardTable from "../DashBoardTable/DashBoardTable";
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
    <div>
      {payload && (
        <DashboardTable
          objectName={"Jobs"}
          glyph={<FontAwesomeIcon icon={faPersonDigging} />}
          retrieveData={retrieveJobs}
          findObjectByName={findJobsByName}
          colums={["ID", "Name", "Description", "Project", "Date", "Enabled", "Archived", "Platform", "Environment Strings", "Template"]}
          list_path={"/app/job/list"}
          data={payload}
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
  retrieveJobs,
  findJobsByName,
})(JobsDashboardTable);
