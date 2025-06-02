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
import s from "./task_details.module.scss";
import cx from "classnames";
import { retrieveTaskByID } from "actions/task"
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { Task } from "models/Task"
import { InformationTable } from "components/InformationTable/InformationTable";
import { Button, ButtonGroup } from "reactstrap";
import { Highlighter } from "components/Highlighter/Highlighter"
import { decode_base64 } from "helpers/utils";
import Card from "react-bootstrap/Card";
import { PageHeader } from "components/PageHeader/PageHeader"

const Logs = (props) => {
    const { monitoredTaskId, currentLogs } = props;
    const [displayedLog, setDisplayedLog] = useState("loading");
    const [currentTaskLogs, setCurrentTaskLogs] = useState(prepare_logs());
    const [currentLogIndex, setCurrentLogIndex] = useState(0);


    function displayLog(index) {
        setDisplayedLog(currentTaskLogs[index])
        setCurrentLogIndex(index)
        //setCurrentTaskLogs(currentTaskLogs.map((log, i) => ({ index: i === index ? log : null })));
    };

    useEffect(() => {
        if (monitoredTaskId) {
            setDisplayedLog(currentTaskLogs[currentLogIndex])
        }
    }, [monitoredTaskId]);


    function prepare_logs() {
        let decoded_logs = [];
        for (let log in currentLogs) {
            decoded_logs.push(decode_base64(currentLogs[log]));
        }
        return decoded_logs;
    }

    const buttons = [
        { text: 'Bot Logs', index: 0 },
        { text: 'Bot Heatbeat Logs', index: 1 },
        { text: 'Bot Run Heatbeat Logs', index: 2 },
        { text: 'Bot Run Fuzzer Logs', index: 3 }
    ];

    return (
        <Card>
            <Card.Header>Task Logs
            </Card.Header>
            <Card.Body>
                <Highlighter>
                    {displayedLog}
                </Highlighter>
            </Card.Body>
            <ButtonGroup className={cx(s.CardButtonGroup)}>
                {buttons.map((button, index) => (
                    <Button key={index} className={cx(s.LogsButtons)} onClick={() => displayLog(button.index)}>
                        {button.text}
                    </Button>
                ))}
            </ButtonGroup>
        </Card>
    );
}


const TaskDetails = (props) => {

    const [currentTask, setTask] = useState(null);

    let { id } = useParams();

    const { isFetching, payload } = useSelector((state) => state.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveTaskByID(id))
    }, [dispatch, id])

    useEffect(() => {
        if (payload && payload.count === 1) {
            setTask(Task(payload.results[0]))
        }
    }, [dispatch, payload])

        // Get task logs from backend and set them to the state every 2 seconds
        useEffect(() => {
            const intervalId = setInterval(() => {
                dispatch(retrieveTaskByID(id));
            }, 10000);
            return () => {
                clearInterval(intervalId);

            };
        }, [dispatch, id]);


    return <div className={s.root}>
        <PageHeader
        title="Task Details"
        />
        {
            currentTask ? (
                <div responsive className={cx("mb-0", s.CardsGroup)}>
                    <div className={cx(s.CardRow)}>
                        <div class={cx(s.CardCol)}>
                            <InformationTable
                                id="Task Info Table"
                                object={currentTask}
                                objectName={"Task"}
                                ignored_fields={['bot_log', 'heartbeat_log', 'run_fuzzer_log', 'run_heartbeat_log']}

                            />
                        </div>
                    </div>
                    <div className={cx(s.CardRow)}>
                        <div class={cx(s.CardCol)}>
                            <Logs
                                monitoredTaskId={currentTask.id.value}
                                currentLogs={[
                                    currentTask.bot_log.value,
                                    currentTask.heartbeat_log.value,
                                    currentTask.run_fuzzer_log.value,
                                    currentTask.run_heartbeat_log.value
                                ]}
                            />
                        </div>
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
        tasks: state.tasks,
    };
};


export default connect(mapStateToProps, {
    retrieveTaskByID,
})(TaskDetails);
