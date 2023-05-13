/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { connect } from "react-redux";
import cx from "classnames";
import React from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
} from "reactstrap";

import { NavLink } from "react-router-dom";

import Icon from "../Icon";

import photo from "../../images/pingu.png";
import { logoutUser } from "../../actions/auth";
import s from "./Header.module.scss";

class Header extends React.Component {
  static propTypes = {
    sidebarToggle: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  componentWillUnmount() {
    this.doLogout()
  }

  static defaultProps = {
    sidebarToggle: () => {},
  };

  

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  doLogout = () => {
    this.props.dispatch(logoutUser());
  };

  render() {
    const { isOpen, currentUser } = this.state;
    //const { user } = this.props
    return (
      <Navbar className={s.root}>
        <Nav>
          <NavItem
            className={cx(
              "visible-xs mr-4 d-sm-up-none",
              s.headerIcon,
              s.sidebarToggler
            )}
            href="#"
            onClick={this.props.sidebarToggle}
          >
            <i className="fa fa-bars fa-2x text-muted" />
          </NavItem>
          <NavItem>
            <InputGroup>
              <Input placeholder="Search for..." />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  Search
                </span>
              </div>
            </InputGroup>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <NavItem className={cx("", s.headerIcon)}>
            <Button>
              <Icon glyph="mail" />
              <span>8</span>
            </Button>
          </NavItem>
          <NavItem className={cx("", s.headerIcon)}>
            <Button>
              <Icon glyph="notification" />
              <span>13</span>
            </Button>
          </NavItem>
          <NavItem className={cx("", s.headerIcon)}>
            <Button>
              <Icon glyph="settings" />
            </Button>
          </NavItem>
          {currentUser && (
            <Dropdown isOpen={isOpen} toggle={this.toggleDropdown}>
              <DropdownToggle nav>
                <img
                  className={cx("rounded-circle mr-sm", s.adminPhoto)}
                  src={photo}
                  alt="administrator"
                />
                <span className="text-body">{currentUser.username}</span>
                <i
                  className={cx("fa fa-angle-down ml-sm", s.arrow, {
                    [s.arrowActive]: isOpen,
                  })}
                />
              </DropdownToggle>
              <DropdownMenu style={{ width: "100%" }}>
                <DropdownItem>
                  <NavLink to="/app/posts">Posts</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/app/profile">Profile</NavLink>
                </DropdownItem>
                <DropdownItem onClick={this.doLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    init: state.runtime.initialNow,
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(Header);
