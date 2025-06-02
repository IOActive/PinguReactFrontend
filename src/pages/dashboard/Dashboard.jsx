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

import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';

import cx from "classnames";

import s from './Dashboard.module.scss';

import BotsDashboardTable from 'components/Bots/BotsDashboardTable/BotsDashboardTable';
import JobsDashboardTable from 'components/Jobs/JobsDashboardTable/JobsDashboardTable';
import FuzzersDashboardTable from 'components/Fuzzers/FuzzersDashboardTable/FuzzerDashBoardTable';
import TasksDashboardTable from 'components/Tasks/TasksDashboardTable/TasksDashboardTable';
import FuzzerStatsDashboard from 'components/FuzzerStats/ProjectDashboard/fuzzer_stats';
import CrashStatsDashboard from 'components/CrashStats/Dashboard/crash_stats';
import Card from "react-bootstrap/Card";

const Dashboard = () => {

  const active_project = useSelector((state) => state.active_project);

  return (
    <Card>
      <Card.Header>
        {active_project ? (
          <h1 className="mb-lg">Dashboard {active_project}</h1>
        ) : (
          <h1 className="mb-lg">Dashboard</h1>
        )}
      </Card.Header>
      <Card.Body>
        <Row className={cx(s.DashboardRow)}>
          <Col className={cx(s.DashboardCol)}>
            <BotsDashboardTable />
          </Col>
          <Col className={cx(s.DashboardCol)}>
            <FuzzersDashboardTable />
          </Col>
        </Row>

        <Row>
          {active_project ? (
            <><Col className={cx(s.DashboardCol)}>
              <JobsDashboardTable />
            </Col><Col className={cx(s.DashboardCol)}>
                <TasksDashboardTable />
              </Col></>
          ) : null
          }
        </Row>

        <Row>
          {active_project ? (
            <>
              <CrashStatsDashboard />
              <FuzzerStatsDashboard />
            </>
          ) : <CrashStatsDashboard />
          }
        </Row>
      </Card.Body>
    </Card>
  );


}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Dashboard);
