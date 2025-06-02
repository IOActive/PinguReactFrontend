import CrashStatsService from "services/crash_stats_service";
import { action_request, action_recieved, action_error } from "./action"
import {
    RETRIEVE_CRASH_STATS,
    CRASH_STATS_REQUEST,
    CRASH_STATS_FAILURE,
} from "./types";

export const get_crash_stats = (grou_by, start_date, end_date, interval=null, project_id=null) => async (dispatch) => {
    dispatch(action_request(CRASH_STATS_REQUEST));
    return CrashStatsService.get(grou_by, start_date, end_date, interval, project_id).then(
        (response) => {
            dispatch(action_recieved(RETRIEVE_CRASH_STATS, response.data));
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data;
            dispatch(action_error(CRASH_STATS_FAILURE, message));
            return Promise.reject();
        }
    );
};