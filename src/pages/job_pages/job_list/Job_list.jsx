// Jobs list page

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../../actions/job";
import s from "./JobList.module.scss";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button, Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import cx from "classnames";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import JobEdit from "../JobEdit/JobEdit";

function JobsList(props) {
    const [currentJob, setCurrentJob] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchJobName, setSearchJobName] = useState("");
    const [enableEditing, setEnableEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveJobs());
    }, [dispatch]);

    const onChangeSearchJobName = (e) => {
        setSearchJobName(e.target.value);
    };


    const editJob = () => {
        setEnableEditing(true);

    };

    const refreshJobsData = () => {
        retrieveJobs();
        setEnableEditing(false);
        setCurrentJob(null);
    };




    const setActiveJob = (job, index) => {
        setCurrentJob(job);
        setCurrentIndex(index);
    }

    const findByName = () => {
        findJobsByName(searchJobName);
    }

    const { isFetching, payload } = useSelector((state) => state.jobs);

    return (
        <div className={s.root}>
            <Breadcrumb>
                <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                <BreadcrumbItem>Jobs</BreadcrumbItem>
                <BreadcrumbItem active>Jobs List</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="mb-lg">Jobs List</h1>

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
                <Table hover responsive className={cx("mb-0", s.JobsTable)}>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching && (
                            <tr>
                                <td colSpan="100">Loading...</td>
                            </tr>
                        )}
                        {!isFetching &&
                            payload.map((job, index) => (
                                <tr>
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => setActiveJob(job, index)}
                                        key={index}
                                    >
                                        {job.name}
                                    </li>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Widget>

            <div responsive className={cx("mb-0", s.JobCardsGroup)}>
                {currentJob ? (
                    <div class="row">
                        <div class="col-md-6">
                            <Card className={cx("mb-0", s.JobInformantionCard, "flex-fill")}>
                                <Card.Header>{currentJob.name}</Card.Header>
                                <Card.Body>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Parameter</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{currentJob.name}</td>
                                            </tr>
                                            <tr>
                                                <td>ID</td>
                                                <td>{currentJob.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Enabled</td>
                                                <td>
                                                    <Badge
                                                        className="ml-xs"
                                                        color={
                                                            currentJob.enabled === "false"
                                                                ? "danger"
                                                                : "success"
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                    </Badge>
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td>Project</td>
                                                <td>{currentJob.project}</td>
                                            </tr>
                                            <tr>
                                                <td>Date</td>
                                                <td>{currentJob.date}</td>
                                            </tr>
                                            <tr>
                                                <td>Archived</td>
                                                <td>
                                                    <Badge
                                                        className="ml-xs"
                                                        color={
                                                            currentJob.archived === "false"
                                                                ? "danger"
                                                                : "success"
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                    </Badge>
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td> Environment String</td>
                                                <td>{currentJob.environment_string}</td>
                                            </tr>
                                            <tr>
                                                <td>Template</td>
                                                <td>{currentJob.template}</td>
                                            </tr>
                                            <tr>
                                                <td>Custom Binary Path</td>
                                                <td>{currentJob.custom_binary_path}</td>
                                            </tr>
                                            <tr>
                                                <td>Custom Binary Filename</td>
                                                <td>{currentJob.custom_binary_filename}</td>
                                            </tr>
                                            <tr>
                                                <td>Custom Binary Revisions</td>
                                                <td>{currentJob.custom_binary_revisions}</td>
                                            </tr>
                                            </tbody>

                                    </Table>
                                    <div className={cx("", s.EditButton)}>
                                        <Button onClick={editJob}>Edit Job</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div class="col-md-6">
                            {enableEditing ? (
                                <Card className={cx("mb-0", s.JobEditCard, "flex-fill")}>
                                    <Card.Header>{currentJob.Job_name}</Card.Header>
                                    <Card.Body>
                                        <JobEdit JobData={currentJob} />
                                    </Card.Body>
                                </Card>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Job...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        jobs: state.jobs,
        user,
        job: state.currentJob,
    };
};

export default connect(mapStateToProps, {
    retrieveJobs,
    findJobsByName,
})(JobsList);
