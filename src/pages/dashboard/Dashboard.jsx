import React, {Component} from 'react';
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

import Widget from '../../components/Widget/Widget';

import s from './Dashboard.module.scss';

import BotsDashboardTable from '../../components/BotsDashboardTable/BotsDashboardTable';
import JobsDashboardTable from '../../components/JobsDashboardTable/JobsDashboardTable';

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
    if(process.env.NODE_ENV === "development") {
      //this.props.dispatch(fetchPosts());      
    }
  }

  formatDate = (str) => {
    return str.replace(/,.*$/,"");
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
        <Row>
          <Col sm={12} md={6}>
            <BotsDashboardTable/>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Alerts">
              <Alert
                className="alert-sm"
                color="warning"
              >
                <span className="fw-semi-bold">Warning:</span> Best check yo
                self, you&#39;re not looking too good.
              </Alert>
              <Alert
                className="alert-sm"
                color="success"
              >
                <span className="fw-semi-bold">Success:</span> You successfully
                read this important alert message.
              </Alert>
              <Alert
                className="alert-sm"
                color="info"
              >
                <span className="fw-semi-bold">Info:</span> This alert needs
                your attention, but it&#39;s not super important.
              </Alert>
              <Alert
                className="alert-sm clearfix"
                color="danger"
              >
                <span className="fw-semi-bold">Danger:</span> Change this and
                that and try again.
                <span className="pull-right mr-sm">
                  <Button color="danger" size="sm">
                    Take this action
                  </Button>
                  <span className="px-2"> or </span>
                  <Button color="default" size="sm">Cancel</Button>
                </span>
              </Alert>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <JobsDashboardTable/>
          </Col>
          <Col sm={6}>
            <ListGroup>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-phone mr-xs text-secondary" />{' '}
                Incoming calls <Badge className="ml-xs" color="danger">3</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notifications <Badge className="ml-xs" color="warning">6</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs text-secondary" />{' '}
                Messages <Badge className="ml-xs" color="success">18</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-eye mr-xs text-secondary" />{' '}
                Visits total
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-cloud mr-xs text-secondary" /> Inbox{' '}
              </Link>
            </ListGroup>
          </Col>
        </Row>
        <Widget className="mt-lg" title="Some standard reactstrap components">
          <Row>
            <Col sm={6}>
              <div className="mt">
                <Button size="sm" color="default" className="mr-sm mb-xs">
                  Default
                </Button>
                <Button size="sm" color="success" className="mr-sm mb-xs">
                  Success
                </Button>
                <Button size="sm" color="info" className="mr-sm mb-xs">
                  Info
                </Button>
                <Button size="sm" color="warning" className="mr-sm mb-xs">
                  Warning
                </Button>
                <Button size="sm" color="danger" className="mb-xs">
                  Danger
                </Button>
              </div>
              <ButtonGroup className="mb">
                <Button color="default">1</Button>
                <Button color="default">2</Button>
                <ButtonDropdown isOpen={this.state.isDropdownOpened} toggle={this.toggleDropdown}>
                  <DropdownToggle color="default" caret>
                    Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>1</DropdownItem>
                    <DropdownItem>2</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
              <p className="mb-0">
                For more components please checkout{' '}
                <a
                  href="https://reactstrap.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  reactstrap documentation
                </a>
              </p>
            </Col>
            <Col sm={6}>
              <Progress className="progress-sm" color="success" value={40} />
              <Progress className="progress-sm" color="info" value={20} />
              <Progress className="progress-sm" color="warning" value={60} />
              <Progress className="progress-sm" color="danger" value={80} />
            </Col>
          </Row>
        </Widget>
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
