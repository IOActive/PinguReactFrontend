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
import Widget from "components/Widget/Widget";
import Footer from "components/Footer/Footer";
import { register } from "actions/auth";
import Icon from "components/Icon/Icon";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import s from "./Register.module.scss";



function Register(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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

  const changeEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const doRegistration = (e) => {
    dispatch(
      register({
        username: username,
        password: password,
        email: email,
      })
    );
    e.preventDefault();
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
            <Icon glyph="pingucrew" />
          </header>
          <Widget className={s.widget}>
            <h4 className="mt-0">Pingu Dashboard SingUp</h4>
            
            <Form className="mt" onSubmit={doRegistration}>
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
              <FormGroup>
                <Input
                  className="no-border"
                  value={email}
                  onChange={changeEmail}
                  type="email"
                  required
                  name="email"
                  placeholder="email account" />
              </FormGroup>
              <div className="d-flex align-items-center">
                  <Button color="success" size="sm" type="submit">
                    {isFetching ? "Singing Up..." : "Register"}
                  </Button>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
      <Footer className="text-center" />
    </div>
  );
}

export default Register;
