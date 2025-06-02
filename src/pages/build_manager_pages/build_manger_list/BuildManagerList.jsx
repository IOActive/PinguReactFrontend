/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.import { Button } from "reactstrap";
*/

import React from "react";
import { upload_build, get_builds, get_build_by_id, delete_build, update_build, download_build } from "actions/build";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import cx from "classnames";

import s from "./BuildManagerList.module.scss";
import { useSelector } from "react-redux";
import EditObject from "components/EditObject/EditObject";
import InteractiveTable from "components/Interactive_List/InteractiveList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { InformationTable } from "components/InformationTable/InformationTable";
import { Build } from "models/Build";
import { Buffer } from 'buffer';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { PageHeader } from "components/PageHeader/PageHeader";


const BuildManagerList = (props) => {

    const [currentBuild, setCurrentBuild] = React.useState(null);
    const [enableEditing, setEnableEditing] = React.useState(false);

    const selector = useSelector((state) => state.builds);
    const active_project = useSelector((state) => state.active_project);

    function editBuild() {
        // swtich state of editing
        setEnableEditing(!enableEditing);

    }

    const { errorMessage } = useSelector(
        (state) => state.builds
    );

    function DownloadBuild() {
        download_build(currentBuild['id'])
            .then(() => console.log("Download successful"))
            .catch(() => alert("Failed to download the file"))
    }

    return (
        <div className={s.root}>
            <PageHeader title="Builds Manager List"/>
            <div responsive className={cx("mb-0", s.CardsGroup)}>
                <div className={cx(s.CardRow)}>
                    <div className={cx(s.CardCol)}>
                        <InteractiveTable
                            glyph={<FontAwesomeIcon icon={faBoxArchive} />}
                            search_fucntion={props.get_build_by_id}
                            objectName={"Builds"}
                            setCurrentObject={setCurrentBuild}
                            retieve_data_function={props.get_builds}
                            selector={selector}
                            colums={["id", "type", "filename"]}
                            parent_object_id={active_project}
                        />
                    </div>
                </div>
                {currentBuild ? (
                    <div className={cx(s.CardRow)}>
                        <div class={cx(s.CardCol)}>
                            <InformationTable
                                object={Build(currentBuild)}
                                objectName={"Build"}
                            />

                            <DropdownButton id="dropdown-basic-button" title="Actions">
                                <Dropdown.Item onClick={editBuild}>Edit {"Build"}</Dropdown.Item>
                                <Dropdown.Item onClick={DownloadBuild}> Download Build</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div class="col-md-6">
                            {enableEditing ? (
                                <EditObject
                                    object={Build(currentBuild)}
                                    updateObject={props.update_build}
                                    deleteObject={props.delete_build}
                                    errorMessage={errorMessage}
                                    closeConstant={setEnableEditing}
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Build...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        builds: state.builds,
        user,
        build: state.currentBuild,
    };
};

export default connect(mapStateToProps, {
    upload_build, get_builds, get_build_by_id, delete_build, update_build
})(BuildManagerList);
