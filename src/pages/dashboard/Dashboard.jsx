import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import cx from "classnames";

import s from './Dashboard.module.scss';

import BotsDashboardTable from '../../components/Bots/BotsDashboardTable/BotsDashboardTable';
import JobsDashboardTable from '../../components/Jobs/JobsDashboardTable/JobsDashboardTable';
import FuzzersDashboardTable from '../../components/Fuzzers/FuzzersDashboardTable/FuzzerDashBoardTable';
import TasksDashboardTable from '../../components/Tasks/TasksDashboardTable/TasksDashboardTable';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentDidMount() {
    if (process.env.NODE_ENV === "development") {
      //this.props.dispatch(fetchPosts());      
    }
  }

  formatDate = (str) => {
    return str.replace(/,.*$/, "");
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  }

  render() {
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
}

function mapStateToProps(state) {
  return {
    //isFetching: state.posts.isFetching,
    //posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
