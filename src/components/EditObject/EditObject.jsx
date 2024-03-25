# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button } from "reactstrap";
import Form from "react-bootstrap/Form";

import s from "./EditObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "../GenericForm/GenericForm";
import {CloseButton} from "../CloseButton/CloseButton";


const EditObject = (props) => {

  const { object, updateObject, deleteObject, errorMessage, closeConstant } = props;


  const [currentObject, setCurrentObject] = useState(object);

  const onInputChange = (event) => {

    let name = event.target.name;
    var value = "";

    switch (event.target.type) {
      case "checkbox":
        if (event.target.value === "on")
          value = true;
        else if (event.target.value === "off")
          value = false;
        break;
      case "file":
        let files = event.target.files;
        if (files.length !== 1) {
          alert('Please select a single file.');
        }
        var reader = new FileReader();
        reader.readAsDataURL(files[0]); //

        const promise = new Promise((resolve, reject) => {
          reader.onload = () => {
            value = reader.result;
            resolve();
          }
          reader.onerror = reject;
        });

        promise.then(() => {

          setCurrentObject((currentObject) => ({
            ...currentObject,
            "filename": {
              ...currentObject.filename,
              "value": files[0].name,
            },
            [name]: {
              ...currentObject[name],
              "value": value,
            },
          }));

        });

        reader.onerror = function (error) {
          console.log('Error: ', error);

        };
        break;
      default:
        value = event.target.value;
    }

    setCurrentObject({
      ...currentObject,
      [name]: {
        ...currentObject[name],
        "value": value
      }
    });
  };


  const updateContent = (event) => {
    event.preventDefault();

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentObject({ ...currentObject, validated: true });

    if (form.checkValidity() === true) {

      updateObject(currentObject.id.value, currentObject.get_payload(currentObject));
    }<CloseButton 
    closeConstant={closeConstant}
  />
  };

  const removeObject = (event) => {

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.currentObjecttopPropagation();
    }

    setCurrentObject({ ...currentObject, validated: true });

    if (form.checkValidity() === true) {
      deleteObject(currentObject.id.value);
    }
  };

  return (
    <Card className={cx("mb-0", s.EditCard, "flex-fill")}>
      <Card.Header>
        <Card.Title tag="h5" className="mb-0">
          {currentObject.name.value}
        </Card.Title>
        <CloseButton 
          closeConstant={closeConstant}
        />
      </Card.Header>
      <Card.Body>
        <div className={s.root}>
          <div className="submit-form">
            {currentObject.id.value != null ? (

              <Form noValidate validated={currentObject.validated} className={cx(s.EditForm, "mb-0", "flex-fill")}>

                {Object.keys(currentObject).map((key, index) => {
                  return generateFormGroups(key, index, currentObject, onInputChange);
                })}

                {errorMessage && (
                  <div className={cx(s.ErrorMessage)}>
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  </div>
                )}

                <ButtonGroup className={cx(s.ButtonGroupEditBot, 'btn-group')}>
                  <Button className={cx(s.UpdateButton)} onClick={updateContent}>Update</Button>
                  <Button className={cx(s.RemoveButton)} onClick={removeObject}>Delete</Button>
                </ButtonGroup>
              </Form>
            ) : (
              <div>
                <br />
                <p>Loading data...</p>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card >
  );
};

export default EditObject;


