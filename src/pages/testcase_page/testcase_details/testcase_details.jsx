/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { useEffect, useState } from "react";
import s from "./testcase_details.module.scss";
import cx from "classnames";
import { retrieveTestCaseByID } from "actions/testcase"
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { TestCase } from "models/TestCase"
import { InformationTable } from "components/InformationTable/InformationTable";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { retrieveTestCaseCrashes, retrieveCrashByID } from "actions/crash"
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InteractiveTable from "components/Interactive_List/InteractiveList";
import { Crash } from "models/Crash";
import { Buffer } from 'buffer';
import { PageHeader } from "components/PageHeader/PageHeader";

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
        let testcase_stream_b64 = currentTestcase["test_case"].value //s.split(',')[1];
        if (testcase_stream_b64 != null) {
            const urlDecodedBase64 = decodeURIComponent(testcase_stream_b64);

            const buffer = Buffer.from(urlDecodedBase64, 'base64');

            // Create a Blob object from the buffer
            const blob = new Blob([buffer], { type: 'application/text' });

            // Create a download link for the Blob object and simulate a click on the link to download the file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            const split = currentTestcase["absolute_path"].value.split('/');
            const filename = split[split.length - 1];
            link.download = filename;
            link.click();
        }
    }

    return <div className={s.root}>
        <PageHeader title="Testcase Details"/>
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
                            search_fucntion={props.retrieveCrashByID}
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
    retrieveCrashByID,
})(TestCaseDetails);
