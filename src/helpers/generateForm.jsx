import React from "react";
import Form from "react-bootstrap/Form";

export function generateFormGroups(key, index, currentObject, onInputChange) {
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
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>;

  } else if (value instanceof Date) {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="date"
        name={key}
        value={value.toISOString().split('T')[0]}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>;
  } else if (value instanceof Boolean) {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="checkbox"
        name={key}
        checked={value}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>;
  }
  else if (value instanceof Number) {
    <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="number"
        name={key}
        value={value}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>;
  }

  else if (typeof value === 'string') {
    return <Form.Group key={index}>
      <Form.Label>{key}</Form.Label>
      <Form.Control
        type="text"
        name={key}
        value={value}
        onChange={onInputChange} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>;
  }
}
