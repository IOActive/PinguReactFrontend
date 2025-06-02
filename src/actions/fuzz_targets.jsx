import FuzzerTargetService from "services/fuzzer_target_service";
import { action_request, action_recieved, action_error } from "./action"
import {
    RETRIEVE_FUZZER_TARGETS,
    FUZZER_TARGET_REQUEST,
    FUZZER_TARGET_FAILURE,
} from "./types";

export const get_project_fuzz_targets = (project_id) => async (dispatch) => {
    dispatch(action_request(FUZZER_TARGET_REQUEST));
    return FuzzerTargetService.get_project_fuzztargets(project_id).then(
        (response) => {
            dispatch(action_recieved(RETRIEVE_FUZZER_TARGETS, response.data));
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data;
            dispatch(action_error(FUZZER_TARGET_FAILURE, message));
            return Promise.reject();
        }
    );
};