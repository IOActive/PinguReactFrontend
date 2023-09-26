import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cx from "classnames";
import s from "./CreateObject.module.scss";
import Card from "react-bootstrap/Card";
import { generateFormGroups } from "../GenericForm/GenericForm";

function CreateObject(props) {

    const { createObject, object, errorMessage } = props;

    const [currentObject, setCurrentObject] = useState(object);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        if (event.target.type === "checkbox" && value === "on")
            value = true;
        else if (value === "off")
            value = false;
        setCurrentObject({
            ...currentObject,
            [name]:{
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
            createObject(currentObject);

            /*setCurrentObject({
                ...currentObject,
                submitted: true,

            });*/
            //navigate("/app/dashboard");

        }
    };

    return (
        <Card className={cx("mb-0", s.InformantionCard, "flex-fill")}>
            <Card.Header>Create New {currentObject.name.value}</Card.Header>
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
