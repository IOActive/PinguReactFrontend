// Jobs list page

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveJobs, findJobsByName } from "../../../actions/job";
import s from "./JobsList.module.scss";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { Breadcrumb, BreadcrumbItem} from "reactstrap";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import JobEdit from "../JobEdit/JobEdit";
import InteractiveList from "../../../components/Interactive_List/InteractiveList";
import { InformationTable } from "../../../components/InformationTable/InformationTable";

function JobsList(props) {
    const [enableEditing, setEnableEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveJobs());
    }, [dispatch]);

    const editJob = () => {
        setEnableEditing(true);

    };

    const refreshJobsData = () => {
        retrieveJobs();
        setEnableEditing(false);
        setCurrentJob(null);
    };


   const { isFetching, payload } = useSelector((state) => state.jobs);

    return (
        <div className={s.root}>
            <Breadcrumb>
                <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
                <BreadcrumbItem>Jobs</BreadcrumbItem>
                <BreadcrumbItem active>Jobs List</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="mb-lg">Jobs List</h1>

            <InteractiveList
                refreshData={refreshJobsData}
                glyph={<FontAwesomeIcon icon={faPersonDigging} />}
                search_fucntion={props.findJobsByName}
                objectName={"Jobs"}
                isFetching={isFetching}
                payload={payload}
                setCurrentObject={setCurrentJob}
                value_key_name={"name"}
            />
            <div style={{ width: '100%' }}>
        </div>                          
            <div responsive className={cx("mb-0", s.JobCardsGroup)}>
                {currentJob ? (
                    <div class="row">
                        <div class="col-md-6">
                        {InformationTable(currentJob, editJob, currentJob.name)}
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
