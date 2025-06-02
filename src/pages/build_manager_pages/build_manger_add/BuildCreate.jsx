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

import { connect } from "react-redux";
import { upload_build } from "actions/build";
import { useSelector } from "react-redux";
import { Build, BUILD_TYPES} from "models/Build";
import CreateObject from "components/CreateObject/CreateObject";
import React, { useEffect } from "react";

function AddBuild(props) {

    const active_project = useSelector((state) => state.active_project);
    
    const newBuild = Build({
        id: "",
        timestamp: new Date(),
        build_zip: "",
        filename: "",
        file_size: 0,
        blobstore_path: "",
        type: BUILD_TYPES.RELEASE,
        project: active_project
    });

    const { errorMessage } = useSelector(
        (state) => state.builds
    );

      useEffect(() => {
        newBuild.project_id.value = active_project
      }, [active_project]);

    return (
        <CreateObject
            object={newBuild}
            createObject={props.upload_build}
            errorMessage={errorMessage}
            objectName={"Build"}
        />
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps, { upload_build })(AddBuild);
