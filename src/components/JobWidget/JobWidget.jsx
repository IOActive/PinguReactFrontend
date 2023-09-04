import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../actions/job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "../DashBoardTable/DashBoardTable";

const JobWidget = (props) => {
  const [searchJobName, setSearchJobName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveJobs());
  }, [dispatch]);

  const { isFetching, payload } = useSelector((state) => state.jobs);

  const onChangeSearchJobName = (e) => {
    setSearchJobName(e.target.value);
  };

  const findByName = () => {
    props.findJobsByName(searchJobName);
  };

  const refreshJobsData = () => {
    props.retrieveJobs();
  };

  const { jobs } = props;

  return (
    <DashboardTable
      objectName={"Jobs"}
      glyph={<FontAwesomeIcon icon={faPersonDigging} />}
      isFetching={isFetching}
      retrieveData={retrieveJobs}
      findObjectByName={findJobsByName}
      payload={payload}
      colums={[ "ID", "Name", "Description", "Project", "Date", "Enabled", "Archived", "Platform", "Environment Strings", "Template"]}
      list_path={"/app/job/list"}
    />
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    jobs: state.jobs,
    user,
  };
};

export default connect(mapStateToProps, {
  retrieveJobs,
  findJobsByName,
})(JobWidget);
