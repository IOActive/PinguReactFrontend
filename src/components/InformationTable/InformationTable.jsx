import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Table, Badge } from "reactstrap";
import cx from "classnames";
import s from "./InformationTable.module.scss";

export function InformationTable(currentObject, editObject, objectName) {
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
              case "enabled":
                return <tr key={index}>
                    <td>{key}</td>
                    <td>
                      <Badge className="ml-xs" color={currentObject.enabled === "false" ? "danger" : "success"}>
                        {currentObject.enabled}
                      </Badge>
                    </td>
                  </tr>;
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
