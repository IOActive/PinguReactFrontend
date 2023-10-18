import { useEffect, useState } from "react";
import s from "./testcase_details.module.scss";
import cx from "classnames";
import { retrieveTestCaseByID } from "../../../actions/testcase"
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { TestCase } from "../../../models/TestCase"
import { InformationTable } from "../../../components/InformationTable/InformationTable";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { retrieveTestCaseCrashes } from "../../../actions/crash"
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";



const TestCaseDetails = (props) => {

    const [currentTestcase, setTestCase] = useState(null);
    const [currentCrash, setCrash] = useState(null);

    let { id } = useParams();

    const { isFetching, payload } = useSelector((state) => state.testcases);
    const selector_crash = useSelector((state) => state.crashes);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveTestCaseByID(id))
    }, [id])

    useEffect(() => {
        if (payload && payload.count === 1) {
            setTestCase(TestCase(payload.results[0]))
        }
    }, [payload])

    return <div className={s.root}>
        <Breadcrumb>
            <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
            <BreadcrumbItem>TestCases</BreadcrumbItem>
            <BreadcrumbItem active>TestCase Details</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">TestCase Details</h1>
        {
            currentTestcase ? (
                <div responsive className={cx("mb-0", s.TestCaseCardsGroup)}>
                    <div className={cx(s.TestCaseRow)}>
                        <InformationTable
                            id="Test Case Info Table"
                            object={currentTestcase}
                            objectName={"TestCase"}
                        />
                    </div>
                    <div className={cx(s.TestCaseRow)}>
                        <InteractiveTable
                            glyph={<FontAwesomeIcon icon={faBug} />}
                            search_fucntion={null}
                            objectName={"Crashes"}
                            setCurrentObject={setCrash}
                            retieve_data_function={props.retrieveTestCaseCrashes}
                            selector={selector_crash}
                            colums={["id", "crash_type", "crash_time", "security_flag"]}
                            parent_object_id={currentTestcase.id.value}
                        />
                    </div>
                </div>
            ) : (
                <div />
            )
        }
    </div>
}


const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        testcases: state.testcases,
        crashes: state.crashes,
    };
};


export default connect(mapStateToProps, {
    retrieveTestCaseByID,
    retrieveTestCaseCrashes,
})(TestCaseDetails);
