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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cx from "classnames";
import s from "./CreateObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "components/GenericForm/GenericForm";
import Dropdown from "react-bootstrap/Dropdown";
import { CloseButton } from "components/CloseButton/CloseButton";
import { SimplePopper } from "components/SimplePopper/SimplePopper";
import { PageHeader } from "components/PageHeader/PageHeader";
import { Alert } from "reactstrap";


function CreateObject(props) {

  const { createObject, object, errorMessage, objectName, closeConstant, helpText, display_header = true } = props;

  const [currentObject, setCurrentObject] = useState(object);

  const onInputChange = (event) => {
    let name = event.target.name;
    let value = "";
  
    switch (event.target.type) {
      case "checkbox":
        value = event.target.checked;
        break;
  
      case "file":
        let files = event.target.files;
        if (files.length !== 1) {
          alert('Please select a single file.');
        } else {
          value = files[0]; // Directly store the file object, no need for FileReader
          setCurrentObject((currentObject) => ({
            ...currentObject,
            "filename": {
              ...currentObject.filename,
              "value": files[0].name,  // Store the filename for reference
            },
            [name]: {
              ...currentObject[name],
              "value": value, // Store the file object directly
            },
          }));
        }
        break;
  
      default:
        value = event.target.value;
    }
  
    setCurrentObject({
      ...currentObject,
      [name]: {
        ...currentObject[name],
        "value": value,
      },
    });
  };
  

  const saveObject = (event) => {

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentObject({ ...currentObject, validated: true });

    if (form.checkValidity() === true) {
 
      createObject(currentObject.get_payload(currentObject)).catch((e) => {
        console.log(e);
      });

      setCurrentObject({
        ...currentObject,
        submitted: true,

      });
      //navigate("/dashboard");

    }
  };

  const show_options_field = (event) => {
    const optional = document.getElementById("optional");
    if (optional.hidden) {
      optional.hidden = false;
    }
    else {
      optional.hidden = true;
    }
  }

  return (
    <>
      {display_header ? (
        <PageHeader title={`${objectName} Creation`} />
      ) : (null)
      }
      <Card className={cx("mb-0", s.InformantionCard, "flex-fill")}>
        <Card.Header>Create New {objectName}
          <div className={cx("mb-0", s.helpPopper, "flex-fill")}>
            <SimplePopper content={helpText} /></div>
          {closeConstant ? (

            <CloseButton
              closeConstant={closeConstant} />
          ) : (
            <div></div>
          )}

        </Card.Header>
        <Card.Body>
          <div responsive className={cx("mb-0", s.Card)}>
            <Form noValidate validated={currentObject.validated} onSubmit={saveObject}>

              <Form.Group>
                {Object.keys(currentObject).map((key, index) => {
                  if (currentObject[key].required && currentObject[key].editable)
                    return generateFormGroups(key, index, currentObject, onInputChange);
                })}
              </Form.Group>


              <Form.Group id="optional" hidden>
                {Object.keys(currentObject).map((key, index) => {
                  if (!currentObject[key].required && currentObject[key].editable)
                    return generateFormGroups(key, index, currentObject, onInputChange);
                })}
              </Form.Group>

              {errorMessage && (
                <div className="form-group">
                  <Alert size="sm" color="danger">
                    {errorMessage}
                  </Alert>
                </div>
              )}

              {currentObject.submitted && !errorMessage && (
                <div className="form-group">
                  <div className="alert alert-success" role="alert">
                    <p>submmited</p>
                  </div>
                </div>
              )}

              <div className={cx(s.buttons_container)}>
                <Button variant="primary" type="submit"> Submit</Button>


                <Dropdown className={cx(s.toggle_dropdown)}>
                  <Dropdown.Toggle id="dropdown-basic">
                    Optional fields
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={show_options_field}>Toggle optional fields</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card></>
  );
}

export default CreateObject;
