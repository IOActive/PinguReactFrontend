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

import React, { useState } from "react";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import s from "./Login.module.scss";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../actions/auth";
import Icon from "../../components/Icon/Icon";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, isFetching, errorMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const changeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const changePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const doLogin = (e) => {
    dispatch(
      loginUser({
        username: username,
        password: password,
      })
    );
    e.preventDefault();
  };

  const goToRegistration = (event) => {
    return <Navigate to="/register" />;
  };

  if(isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <div className={s.root}>
      <Row>
        <Col
          xs={{ size: 10, offset: 1 }}
          sm={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <header className={s.logo}>
            <Icon glyph="logo2" />
          </header>
          <Widget className={s.widget}>
            <h4 className="mt-0">Login to Pingu Dashboard</h4>
            <p className="fs-sm text-muted">
              User your username and password to sign in
              <br />
              Don&#39;t have an account? Sign up now!
            </p>
            <Form className="mt" onSubmit={doLogin}>
              {errorMessage && (
                <Alert size="sm" color="danger">
                  {errorMessage}
                </Alert>
              )}
              <FormGroup className="form-group">
                <Input
                  className="no-border"
                  value={username}
                  onChange={changeUsername}
                  type="text"
                  required
                  name="username"
                  placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Input
                  className="no-border"
                  value={password}
                  onChange={changePassword}
                  type="password"
                  required
                  name="password"
                  placeholder="Password" />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/register" className="fs-sm">
                  Sing Up
                </NavLink>
                <div>
                  <Button color="success" size="sm" type="submit">
                    {isFetching ? "Loading..." : "Login"}
                  </Button>
                </div>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
      <Footer className="text-center" />
    </div>
  );
}
export default Login;
