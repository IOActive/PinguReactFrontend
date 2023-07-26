import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../actions/job";

import { Table, Badge } from "reactstrap";
import Widget from "../Widget/Widget";
import s from "./JobWidget.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";

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
    <Widget
      title={
        <div>
          <SearchBar
            searchValue={searchJobName}
            onChangeSearchValue={onChangeSearchJobName}
            findByName={findByName}
            refreshData={refreshJobsData}
          />
          <h5 className="mt-0 mb-3">
          <FontAwesomeIcon icon={faPersonDigging} /> Jobs
          </h5>
        </div>
      }
    >
      <Table responsive borderless className={cx("mb-0", s.jobsTable)}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Project</th>
            <th>Date</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {isFetching && (
            <tr>
              <td colSpan="100">Loading...</td>
            </tr>
          )}
          {payload &&
            !isFetching &&
            payload.slice(0, 6).map((job, index) => (
              <tr key={index}>
                <td>{job.id}</td>
                <td>{job.name}</td>
                <td>{job.project}</td>
                <td>{job.date}</td>
                <td>
                  <Badge
                    className="ml-xs"
                    color={job.enabled === false ? "danger" : "success"}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </Badge>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Link to="/app/job/list" className="btn btn-default">
          View all Jobs{" "}
          <Badge className="ml-xs" color="danger">
            {jobs.length}
          </Badge>{" "}
        </Link>
      </div>
    </Widget>
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
