/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import {
  React, useEffect
} from "react";
import Card from "react-bootstrap/Card";
import { Table, Badge } from "reactstrap";
import cx from "classnames";
import s from "./InformationTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SimplePopper } from "components/SimplePopper/SimplePopper";
import { beautify_date, decode_base64 } from "helpers/utils";
import Code from "models/Code";
import { Highlighter } from "components/Highlighter/Highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { shell} from "react-syntax-highlighter/dist/esm/languages/hljs";

/*const themes = {
  googlecode,
  dark,
  dracula,
  a11yDark,
}

const languages = {
  shell,
  javascript,
  markdown,
  bash,
}*/



export const InformationTable = (props) => {

  const { object, objectName, ignored_fields=[] } = props;

  const [currentObject, setCurrentObject] = useState(object);

  /*const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState(defaultTheme);*/

  useEffect(() => {
    setCurrentObject(object);
  }, [object]);

  /* <div className={cx(s.ControlsBox)}>
        <Dropdown
          defaultTheme={defaultLanguage}
          onChange={(e) => setLanguage(e.target.value)}
          data={languages}
        />
        <Dropdown
          defaultTheme={defaultTheme}
          onChange={(e) => setTheme(e.target.value)}
          data={themes}
        />
      </div> */

  return <Card className={cx(s.BotInformantionCard)}>
    <Card.Header>{objectName}</Card.Header>
    <Card.Body>
      <Table className={cx(s.InformationTable)}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        
        <tbody>
          {Object.keys(currentObject).map((key, index) => {
            if (!ignored_fields.includes(key)){
              return generateList(key, index, currentObject);
            }
          })}
        </tbody>
        </thead>
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
        color={currentObject[key]["value"] === false
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
  if (key === "status") {
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
        {
          currentObject[key]["value"] && currentObject[key]["value"].length > 200 ? (
            <td>
              <div className={cx(s.PanelsBox)}>
                <Highlighter language={shell} theme={a11yDark}>
                  {currentObject[key]["value"]}
                </Highlighter>
              </div>

            </td>
          ) : (
            <td>{currentObject[key]["value"]}</td>
          )
        }

      </tr>;
    }
    else if (objectType === Code) {
      return <tr>
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
          <div className={cx(s.PanelsBox)}>
            <Highlighter language={shell} theme={a11yDark}>
              {decode_base64(currentObject[key]["value"])}
            </Highlighter>
          </div>

        </td>
      </tr>
    }
  }
}

