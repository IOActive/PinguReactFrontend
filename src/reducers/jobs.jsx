import {
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_REQUEST,
  JOB_FAILURE,
} from "../actions/types";

const initialState = [];

function jobReducer(jobs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case JOB_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_JOB:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_JOBS:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_JOB:
      if (jobs.payload) {
        return jobs.map((job) => {
          if (job.id === payload.id) {
            return {
              ...job,
              ...payload,
            };
          } else {
            return job;
          }
        });
      }
      else {
        return jobs;
      }

    //case DELETE_JOB:

    case JOB_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return jobs;
  }
}

export default jobReducer;
