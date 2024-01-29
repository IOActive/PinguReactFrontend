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
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InteractiveTable from "../../../components/Interactive_List/InteractiveList";
import { Crash } from "../../../models/Crash";
import { Buffer } from 'buffer';

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

    function DownloadTestCase() {
        let testcase_stream_b64 = currentTestcase["test_case"].value;
        if (testcase_stream_b64 != null) {
            const urlDecodedBase64 = decodeURIComponent(testcase_stream_b64);

            const buffer = Buffer.from(urlDecodedBase64, 'base64');

            // Create a Blob object from the buffer
            const blob = new Blob([buffer], { type: 'application/text' });

            // Create a download link for the Blob object and simulate a click on the link to download the file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            const split = currentTestcase["absolute_path"].value.split('/');
            const filename = split[split.length-1];
            link.download = filename;
            link.click();
        }
    }

    return <div className={s.root}>
        <Breadcrumb>
            <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
            <BreadcrumbItem>TestCases</BreadcrumbItem>
            <BreadcrumbItem active>TestCase Details</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">TestCase Details</h1>
        {
            currentTestcase ? (
                <div responsive className={cx("mb-0", s.CardsGroup)}>
                    <div className={cx(s.CardRow)}>
                        <div class={cx(s.CardCol)}>
                            <InformationTable
                                id="Test Case Info Table"
                                object={currentTestcase}
                                objectName={"TestCase"}
                            />
                            <ButtonGroup className={cx(s.CardButtonGroup)}>
                                <Button className={cx(s.DownloadTestCaseButton)} onClick={DownloadTestCase}>
                                    Download Testcase
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className={cx(s.CardRow)}>
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
                    <div className={cx(s.CardsGroup)}>
                        {currentCrash ? (
                            <div className={cx(s.CardRow)}>
                                <InformationTable
                                    id="Crash Info Table"
                                    object={Crash(currentCrash)}
                                    objectName={"Crash"}
                                />
                            </div>
                        ) : (
                            <div />
                        )
                        }
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
