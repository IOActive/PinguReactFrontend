import FuzzerStatsService from "services/fuzzer_stats_service";
import { action_request, action_recieved, action_error } from "./action"
import {
    RETRIEVE_FUZZER_STATS,
    FUZZER_STATS_REQUEST,
    FUZZER_STATS_FAILURE,
} from "./types";

export const get_fuzzer_stats = (fuzz_target_id, grou_by, start_date, end_date, interval=null) => async (dispatch) => {
    const payload = {
        "fuzz_target": fuzz_target_id,
        "group_by": grou_by,
        "start_date": start_date,
        "end_date": end_date,
    }
    if (interval !== null) payload["interval"] = interval;
    
    dispatch(action_request(FUZZER_STATS_REQUEST));
    return FuzzerStatsService.get(payload).then(
        (response) => {
            dispatch(action_recieved(RETRIEVE_FUZZER_STATS, response.data));
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data;
            dispatch(action_error(FUZZER_STATS_FAILURE, message));
            return Promise.reject();
        }
    );
};