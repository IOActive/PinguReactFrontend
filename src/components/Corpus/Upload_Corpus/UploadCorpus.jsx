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
import { upload_corpus } from "../../../actions/corpus";
import { useSelector } from "react-redux";
import { Corpus } from "../../../models/Corpus";
import CreateObject from "../../CreateObject/CreateObject";

function UploadCorpus(props) {

    const { job_id, closeConstant } = props;

    const newCorpus = Corpus({
        job_id: job_id,
        corpus_binary: "",
        filename: "",
        engine_id: "",
        fuzztarget_name: ""
      });

    const { errorMessage } = useSelector(
        (state) => state.corpuses
    );

    return (
        <CreateObject
            object={newCorpus}
            createObject={props.upload_corpus}
            errorMessage={errorMessage}
            objectName={"Corpus"}
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

export default connect(mapStateToProps, { upload_corpus: upload_corpus })(UploadCorpus);