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

import React from "react";
import Form from "react-bootstrap/Form";
import cx from "classnames";
import s from "./GenericForm.module.scss";
import { beautify_key_names } from "../../helpers/utils";


export function generateFormGroups(key, index, currentObject, onInputChange) {

  const value = currentObject[key]["value"];
  const editable = currentObject[key]["editable"];
  const required = currentObject[key]["required"]
  let object_enums = []
  const objectType = currentObject[key]["type"];
  // check if currentObject has get_enums function
  if (currentObject.get_enums) {
    object_enums = currentObject.get_enums();
  }


  if (!editable) {
    return;
  }

  if (object_enums && object_enums[key]) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)} >{beautify_key_names(key)}</Form.Label>
      <Form.Control
        as="select"
        name={key}
        id={key}
        value={value}
        required={required}
        onChange={onInputChange}
      >
        {Object.keys(object_enums[key]).map((enum_key, index) => {
          return <option key={index} value={object_enums[key][enum_key]}>{object_enums[key][enum_key]}</option>;
        })}
      </Form.Control>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;

  } else if (objectType === Date) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      <Form.Control
        type="date"
        name={key}
        id={key}
        required={required}
        value={value.toISOString().split('T')[0]}
        onChange={onInputChange} />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;
  } else if (objectType === Boolean) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      {
        value === true ? (
          <Form.Check
            type="switch"
            id={key}
            required={required}
            name={key}
            label="Check this switch"
            onChange={onInputChange}
            checked

          />) : (
          <Form.Check
            type="switch"
            id={key}
            required={required}
            name={key}
            label="Check this switch"
            onChange={onInputChange}
          />
        )
      }
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;
  }
  else if (objectType === Number) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      <Form.Control
        type="number"
        name={key}
        id={key}
        value={value}
        required={required}
        onChange={onInputChange} />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;
  }

  else if (objectType === String) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      {key === "environment_string" ? (
        <Form.Control
          type="text"
          name={key}
          id={key}
          required={required}
          value={value}
          as="textarea"
          onChange={onInputChange}
        />
      ) : (
        <Form.Control
          type="text"
          name={key}
          id={key}
          required={required}
          value={value}
          onChange={onInputChange}
        />
      )}
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>
    </Form.Group>;
  }

  else if (objectType === File) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      <Form.Control
        type="file"
        required={required}
        name={key}
        id={key}
        onChange={onInputChange} />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>
    </Form.Group>
  }
}
