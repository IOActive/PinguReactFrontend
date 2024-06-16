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
import { upload_custom_binary } from "../../../actions/custom_binary";
import { useSelector } from "react-redux";
import { CustomBinary } from "../../../models/CustomBinary";
import CreateObject from "../../CreateObject/CreateObject";

function UploadCustomBinary(props) {

    const { job_id, closeConstant } = props;

    const newCustomBinary = CustomBinary({
        job_id: job_id,
        custom_binary: "",
        filename: ""
      });

    const { errorMessage } = useSelector(
        (state) => state.custom_binaries
    );

    return (
        <CreateObject
            object={newCustomBinary}
            createObject={props.create_custom_binary}
            errorMessage={errorMessage}
            objectName={"CustomBinary"}
            closeConstant={closeConstant}
        />
    );
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps, { create_custom_binary: upload_custom_binary })(UploadCustomBinary);