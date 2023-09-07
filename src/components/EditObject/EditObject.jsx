import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cx from "classnames";
import { Button } from "reactstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import s from "./EditObject.module.scss";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";



const EditObject = (props) => {

  const { object, updateObject, deleteObject } = props;

  const { errorMessage } = useSelector(
    (state) => state.bots
  );

  useEffect(() => {
    setCurrentObject(object);
  }, [object]);

  const [currentObject, setCurrentObject] = useState(object);


  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentObject({ ...currentObject, [name]: value });
  };


  const updateContent = (event) => {
    event.preventDefault();

    updateObject(currentObject.id, currentObject);
  };

  const removeObject = (event) => {
    event.preventDefault();
    deleteObject(currentObject.id)
      .then((reponse) => {
        console.log(reponse);
        //navigate("/app/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
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
              <Form onSubmit={updateContent}>

                {Object.keys(currentObject).map((key, index) => {
                  return generateForm(key, index, currentObject, onInputChange);
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

function generateForm(key, index, currentObject, onInputChange) {
  const value = currentObject[key];
  const object_enums = currentObject.get_enums();

  if (object_enums && object_enums[key]) {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        as="select"
        name={key}
        value={value}
        onChange={onInputChange}
      >
        {Object.keys(object_enums[key]).map((enum_key, index) => {
          return <option key={index} value={enum_key}>{object_enums[key][enum_key]}</option>;
        })}
      </Form.Control>
    </Form.Group>;

  } else if (value instanceof Date) {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="date"
        name={key}
        value={value.toISOString().split('T')[0]}
        onChange={onInputChange}
      />
    </Form.Group>;
  } else if (value instanceof Boolean) {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="checkbox"
        name={key}
        checked={value}
        onChange={onInputChange}
      />
    </Form.Group>;
  }
  else if (value instanceof Number) {
    <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="number"
        name={key}
        value={value}
        onChange={onInputChange}
      />
    </Form.Group>;
  }

  else if (typeof value === 'string') {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="text"
        name={key}
        value={value}
        onChange={onInputChange}
      />
    </Form.Group>;
  }
}

export default EditObject;


