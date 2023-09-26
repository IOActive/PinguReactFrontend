import React from "react";
import Form from "react-bootstrap/Form";
import cx from "classnames";
import s from "./GenericForm.module.scss";


function beautify_key_names(key) {
  key = key.replace(/_/g, " ");
  // uppercase first letter of each word
  key = key.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  return key;
}

export function generateFormGroups(key, index, currentObject, onInputChange) {
  
  const value = currentObject[key]["value"];
  const editable = currentObject[key]["editable"];
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
        value={value}
        onChange={onInputChange}
      >
        {Object.keys(object_enums[key]).map((enum_key, index) => {
          return <option key={index} value={enum_key}>{object_enums[key][enum_key]}</option>;
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
        value={value.toISOString().split('T')[0]}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;
  } else if (objectType === Boolean) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      <Form.Check // prettier-ignore
        type="switch"
        id={key}
        name={key}
        label="Check this switch"
        onChange={onInputChange}
      />
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
        value={value}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>

    </Form.Group>;
  }

  else if (objectType === String) {
    return <Form.Group key={index}>
      <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
      <Form.Control
        type="text"
        name={key}
        value={value}
        onChange={onInputChange} 
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>
    </Form.Group>;
  }

  else if (objectType === File) {
    return <Form.Group key={index}>
    <Form.Label className={cx(s.FormLabel)}>{beautify_key_names(key)}</Form.Label>
    <Form.Control
      type="file"
      name={key}
      value={value}
      onChange={onInputChange} />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Text className="text-muted"> {currentObject[key]["header"]} </Form.Text>
    </Form.Group>
  }
}
