import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cx from "classnames";
import s from "./CreateObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "../GenericForm/GenericForm";
import Dropdown from "react-bootstrap/Dropdown";

function CreateObject(props) {

  const { createObject, object, errorMessage, objectName } = props;

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

  const saveObject = (event) => {

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentObject({ ...currentObject, validated: true });

    if (form.checkValidity() === true) {
      createObject(currentObject.get_payload(currentObject));

      /*setCurrentObject({
          ...currentObject,
          submitted: true,

      });*/
      //navigate("/app/dashboard");

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
    <Card className={cx("mb-0", s.InformantionCard, "flex-fill")}>
      <Card.Header>Create New {objectName}</Card.Header>
      <Card.Body>
        <div responsive className={cx("mb-0", s.Card)}>
          {currentObject.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
            </div>
          ) : (
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
                <div className="form-group">required
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
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
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CreateObject;
