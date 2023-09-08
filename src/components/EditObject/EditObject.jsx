import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button } from "reactstrap";
import Form from "react-bootstrap/Form";

import s from "./EditObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "../../helpers/generateForm";



const EditObject = (props) => {

  const { object, updateObject, deleteObject, errorMessage } = props;
  

  const [currentObject, setCurrentObject] = useState(object);


  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentObject({ ...currentObject, [name]: value });
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

      updateObject(currentObject.id, currentObject.get_json());
    }
  };

  const removeObject = (event) => {

    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentObject({ ...currentObject, validated: true });

    if (form.checkValidity() === true) {

      deleteObject(currentObject.id)
        .then((reponse) => {
          console.log(reponse);
          //navigate("/app/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Card className={cx("mb-0", s.BotEditCard, "flex-fill")}>
      <Card.Header>
        <Card.Title tag="h5" className="mb-0">
          {currentObject.bot_name}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <div className={s.root}>
          <div className="submit-form">
            {currentObject.id != null ? (

              <Form noValidate validated={currentObject.validated}>

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


