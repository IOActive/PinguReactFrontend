import { useEffect, useState } from "react";
import s from "./testcase_details.module.scss";
import cx from "classnames";
import { retrieveTestCaseByID } from "../../../actions/testcase"
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { TestCase } from "../../../models/TestCase"
import { InformationTable } from "../../../components/InformationTable/InformationTable";

const TestCaseDetails = (props) => {

    const [currentTestcase, setTestCase] = useState(null);

    let { id } = useParams();

    const { isFetching, payload } = useSelector((state) => state.testcases);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveTestCaseByID(id))
    }, [id])

    useEffect(() => {
        if (payload && payload.count === 1) {
            setTestCase(TestCase(payload.results[0]))
        }
    }, [payload])

    return <div className={cx(s.root)}>
        {
            currentTestcase ? (
                <div>
                    <InformationTable
                        id="Test Case Info Table"
                        object={currentTestcase}
                        objectName={"TestCase"}
                    />
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
    };
};


export default connect(mapStateToProps, {
    retrieveTestCaseByID,
})(TestCaseDetails);
