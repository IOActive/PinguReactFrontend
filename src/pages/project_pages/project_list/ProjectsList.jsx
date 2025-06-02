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

import React, { useEffect } from "react";
import { retrieveProjects, findProjectsByName, updateProject, deleteProject, getProject } from "actions/project";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "reactstrap";
import cx from "classnames";

import s from "./ProjectsList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import EditObject from "components/EditObject/EditObject";
import InteractiveTable from "components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faRobot } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "components/InformationTable/InformationTable";
import { Project } from "models/Project";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { setActiveProject, clearActiveProject } from "reducers/active_project";
import { useNavigate } from "react-router-dom";
import ProjectConfig from "components/Projects/ProjectConfig/project_config"
import {PageHeader} from "components/PageHeader/PageHeader"

const ProjectsList = (props) => {
  const [currentProject, setCurrentProject] = React.useState(null);
  const [enableEditing, setEnableEditing] = React.useState(false);
  const [enableProjectConfig, setEnableProjectConfig] = React.useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const selector = useSelector((state) => state.projects);

  function editProject() {
    // swtich state of editing
    setEnableEditing(!enableEditing);

  }

  function editConfig() {
    setEnableProjectConfig(!enableProjectConfig);
  }

  useEffect(() => {
    dispatch(clearActiveProject())
  }, []);

  const { errorMessage } = useSelector(
    (state) => state.projects
  );

  function gotoProject() {
    dispatch(setActiveProject(currentProject.id));
    navigate('/dashboard');
  }

  return (
    <div className={s.root}>
      <PageHeader title="Project Details"/>
      <div responsive className={cx("mb-0", s.CardsGroup)}>
        <div className={cx(s.CardRow)}>
          <div class={cx(s.CardCol)}>
            <InteractiveTable
              glyph={<FontAwesomeIcon icon={faDragon} />}
              search_fucntion={props.findProjectsByName}
              objectName={"Projects"}
              setCurrentObject={setCurrentProject}
              retieve_data_function={props.retrieveProjects}
              selector={selector}
              colums={["name"]}
            />
            {
              currentProject ? (
                <ButtonGroup className={cx(s.ButtonGroup)}>
                  <Button className={cx(s.ProjectButton)} onClick={gotoProject}> Enter Project {currentProject['id']}</Button>
                </ButtonGroup>

              ) : null
            }
          </div>
        </div>
        {currentProject ? (
          <div responsive className={cx("mb-0", s.CardsGroup)}>
            <div className={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                <InformationTable
                  object={Project(currentProject)}
                  objectName={"Project"}
                  ignored_fields={['project_logs']}
                />

                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item onClick={editProject}>Edit {"Project"}</Dropdown.Item>
                  <Dropdown.Item onClick={editConfig}>Configuration {"Project"}</Dropdown.Item>
                </DropdownButton>

              </div>
              <div class={cx(s.CardCol)}>
                {enableEditing ? (
                  <EditObject
                    object={Project(currentProject)}
                    updateObject={props.updateProject}
                    deleteObject={props.deleteProject}
                    errorMessage={errorMessage}
                    closeConstant={setEnableEditing}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div class={cx(s.CardRow)}>
              <div class={cx(s.CardCol)}>
                {enableProjectConfig ? (
                  <ProjectConfig
                    currentProject={Project(currentProject)}
                    errorMessage={errorMessage}
                    closeConstant={setEnableProjectConfig}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

        ) : (
          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    projects: state.projects,
    user,
    project: state.currentProject,
  };
};

export default connect(mapStateToProps, {
  retrieveProjects,
  findProjectsByName,
  updateProject,
  deleteProject,
  getProject,
})(ProjectsList);
