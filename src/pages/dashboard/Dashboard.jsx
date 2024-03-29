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
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import cx from "classnames";

import s from './Dashboard.module.scss';

import BotsDashboardTable from '../../components/Bots/BotsDashboardTable/BotsDashboardTable';
import JobsDashboardTable from '../../components/Jobs/JobsDashboardTable/JobsDashboardTable';
import FuzzersDashboardTable from '../../components/Fuzzers/FuzzersDashboardTable/FuzzerDashBoardTable';
import TasksDashboardTable from '../../components/Tasks/TasksDashboardTable/TasksDashboardTable';


const Dashboard = () => {

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Dashboard</h1>
      <Row className={cx(s.DashboardRow)}>
        <Col className={cx(s.DashboardCol)}>
          <BotsDashboardTable />
        </Col>
        <Col className={cx(s.DashboardCol)}>
          <JobsDashboardTable />
        </Col>
      </Row>
      <Row>
        <Col className={cx(s.DashboardCol)}>
          <FuzzersDashboardTable />
        </Col>
        <Col className={cx(s.DashboardCol)}>
          <TasksDashboardTable />
        </Col>
      </Row>
    </div>
  );


}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Dashboard);
