import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Table, Badge } from "reactstrap";
import cx from "classnames";
import s from "./InformationTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const InformationTable = (props) => {

  const {currentObject, editObject, objectName} = props;
  return <Card className={cx("mb-0", s.BotInformantionCard, "flex-fill")}>
    <Card.Header>{objectName}</Card.Header>
    <Card.Body>
      <Table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currentObject).map((key, index) => {
            switch (key) {
              case "task_status":
                return <tr key={index}>
                  <td>{key}</td>
                  <td>
                    <Badge className="ml-xs" color={currentObject.task_status === "ERROR" || currentObject.task_status === "NA" ? "danger" : "success"}>
                      {currentObject.task_status}
                    </Badge>
                  </td>
                </tr>;
              case "archived":
                return generate_check_icon(index, key, currentObject);
              case "enabled":
                return generate_check_icon(index, key, currentObject);
              default:
                return <tr key={index}>
                  <td>{key}</td>
                  <td>{currentObject[key]}</td>
                </tr>;
            }
          })}
        </tbody>
      </Table>
      <div className={cx("", s.EditButton)}>
        <Button onClick={editObject}>Edit {objectName}</Button>
      </div>
    </Card.Body>
  </Card>;
}
function generate_check_icon(index, key, currentObject) {
  return <tr key={index}>
    <td>{key}</td>
    <td>
      <Badge
        className="ml-xs"
        color={currentObject.key === "false"
          ? "danger"
          : "success"}
      >
        <FontAwesomeIcon icon={faCheckCircle} />
      </Badge>
    </td>
  </tr>;
}

