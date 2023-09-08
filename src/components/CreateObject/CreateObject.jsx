import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cx from "classnames";
import s from "./CreateObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "../../helpers/generateForm";

function CreateObject(props) {

    const { createObject, object, object_name, errorMessage } = props;

    const [currentObject, setCurrentObject] = useState(object);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentObject({
            ...currentObject,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const saveObject = (event) => {

        const form = event.target;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setCurrentObject({ ...currentObject, validated: true });

        if (form.checkValidity() === true) {
            createObject(currentObject)
                .then(() => {
                    setCurrentObject({
                        ...currentObject,
                        submitted: true,

                    });
                    navigate("/app/dashboard");
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    return (
        <Card className={cx("mb-0", s.InformantionCard, "flex-fill")}>
            <Card.Header>Create New {object_name}</Card.Header>
            <Card.Body>
                <div responsive className={cx("mb-0", s.Card)}>
                    {currentObject.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                        </div>
                    ) : (
                        <Form noValidate validated={currentObject.validated} onSubmit={saveObject}>

                            {Object.keys(currentObject).map((key, index) => {
                                return generateFormGroups(key, index, currentObject, onInputChange);
                            })}

                            {errorMessage && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                </div>
                            )}
                            <div >
                                <Button variant="primary" type="submit"> Submit</Button>
                            </div>
                        </Form>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default CreateObject;

/*
    <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Bot name</Form.Label>
                                <Form.Control
                                    required
                                    id="bot_name"
                                    name="bot_name"
                                    type="text"
                                    placeholder="name"
                                    defaultValue=""
                                    onChange={onInputChange}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Platform</Form.Label>
                                <Form.Control
                                    required
                                    id="platform"
                                    name="platform"
                                    type="text"
                                    placeholder="linux"
                                    defaultValue=""
                                    onChange={onInputChange}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
*/
