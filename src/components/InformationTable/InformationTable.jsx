import {React,useEffect} from "react";
import Card from "react-bootstrap/Card";
import { Button, Table, Badge } from "reactstrap";
import cx from "classnames";
import s from "./InformationTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SimplePopper } from "../SimplePopper/SimplePopper";
import { beautify_date } from "../../helpers/utils";

export const InformationTable = (props) => {

  const { object, objectName } = props;

  const [currentObject, setCurrentObject] = useState(object);


  useEffect(() => {
        setCurrentObject(object);
  }, [object]);

  return <Card className={cx(s.BotInformantionCard)}>
    <Card.Header>{objectName}</Card.Header>
    <Card.Body>beatify_date
      <Table className={cx(s.InformationTable)}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currentObject).map((key, index) => {
            return generateList(key, index, currentObject);
          })}
        </tbody>
      </Table>
    </Card.Body>
  </Card>;
}

function generate_check_icon(index, key, currentObject) {
  return <tr key={index}>
    <td>
      <td>
        {key}
      </td>
      <td>
        <SimplePopper content={currentObject[key]["header"]}
        />
      </td>
    </td>
    <td>
      <Badge
        className="ml-xs"
        color={currentObject[key]["value"] === "false"
          ? "danger"
          : "success"}
      >
        <FontAwesomeIcon icon={faCheckCircle} />
      </Badge>
    </td>
  </tr>;
}

function generateList(key, index, currentObject) {

  const objectType = currentObject[key]["type"];

  if (typeof currentObject[key] === "function") {
    return;
  }
  if (key === "task_status") {
    return <tr key={index}>
      <td>
        <td>
          {key}
        </td>
        <td>
          <SimplePopper content={currentObject[key]["header"]}
          />
        </td>
      </td>
      <td>
        <Badge className="ml-xs" color={currentObject[key]["value"] === "ERROR" || currentObject[key]["value"] === "NA" ? "danger" : "success"}>
          {currentObject[key]["value"]}
        </Badge>
      </td>
    </tr>;
  }
  else if (objectType === Boolean) {
    return generate_check_icon(index, key, currentObject);
  }
  
  else {
    if (objectType === Date) {
      return <tr key={index}>
        <td>
          <td>
            {key}
          </td>
          <td>
            <SimplePopper content={currentObject[key]["header"]}
            />
          </td>
        </td>
        <td>{beautify_date(currentObject[key]["value"].toISOString())}</td>
      </tr>;
    }
    else if (objectType === File) {
      return;
    }
    else if (objectType === Object) {
      return;
    }
    else if (objectType === String) {
      return <tr key={index}>
        <td>
          <td>
            {key}
          </td>
          <td>
            <SimplePopper content={currentObject[key]["header"]}
            />
          </td>
        </td>
        <td>{currentObject[key]["value"]}</td>
      </tr>;
    }
  }
}

