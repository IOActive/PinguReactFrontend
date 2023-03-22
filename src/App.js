import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import "./App.css";

import Login from "./components/authentication_components/login.component";
import Register from "./components/authentication_components/register.component";
import Home from "./components/authentication_components/home.component";
import Profile from "./components/authentication_components/profile.component";
import BoardUser from "./components/authentication_components/board-user.component";
import BoardAdmin from "./components/authentication_components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

import AddBot from "./components/bot_components/add_bot_component";
import Bot from "./components/bot_components/bot_component";
import BotsList from "./components/bot_components/bot_list_component";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.is_staff,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Pingun Control Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {showAdminBoard && (
              <Nav.Link href="#features">Admin Panel</Nav.Link>
          )}
          {currentUser && (
              <NavDropdown title="Bots" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/bots">List</NavDropdown.Item>
              <NavDropdown.Item href="/bot/add">
                Add Bot
              </NavDropdown.Item>
            </NavDropdown>
          )}
          </Nav>

          <Nav>
          {
          currentUser ? (
            <Nav>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/login" onClick={this.logOut}>Logout</Nav.Link>
            </Nav>
            ) :
          (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
            
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path={["/", "/bots"]} component={BotsList} />
            <Route exact path="/bot/add" component={AddBot} />
            <Route path="/bot/:id" component={Bot} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);