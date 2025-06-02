import { connect } from "react-redux";
import cx from "classnames";
import React, { useState, useEffect } from "react";
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

import Icon from "components/Icon";

import photo from "images/pingu.png";
import { logoutUser } from "actions/auth";
import s from "./Header.module.scss";
import ThemeSwitcher from "components/theme_switcher";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = props.user;

    if (user) {
      setCurrentUser(user);
    }
    return () => {
      doLogout();
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const doLogout = () => {
    props.dispatch(logoutUser());
  };

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
          onClick={props.sidebarToggle}
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
        <NavItem className={cx("", s.headerIcon)}>
          <ThemeSwitcher/>
        </NavItem>
        {currentUser && (
          <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
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
                <NavLink to="/posts">Posts</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/profile">Profile</NavLink>
              </DropdownItem>
              <DropdownItem onClick={doLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  sidebarToggle: PropTypes.func,
};

Header.defaultProps = {
  sidebarToggle: () => {},
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Header);
