import JobDataService from "../services/bot_service";

import {
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  SET_MESSAGE,
  JOB_FALI,
} from "./types";

export const createJob =
  (
    name,
    description,
    project,
    date,
    enabled,
    archived,
    platform,
    environment_string,
    template,
    custom_binary_path,
    custom_binary_filename,
    custom_binary_revision
  ) =>
  (dispatch) => {
    return JobDataService.create({
      name,
      description,
      project,
      date,
      enabled,
      archived,
      platform,
      environment_string,
      template,
      custom_binary_path,
      custom_binary_filename,
      custom_binary_revision
    }).then(
      (response) => {
        dispatch({
          type: CREATE_JOB,
          payload: response.data,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: JOB_FALI,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const retrieveJobs = () => (dispatch) => {
  return JobDataService.getAll().then(
    (response) => {
      dispatch({
        type: RETRIEVE_JOBS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: JOB_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getJob = (id) => (dispatch) => {
  return JobDataService.findByID(id).then(
    (response) => {
      dispatch({
        type: RETRIEVE_JOBS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: JOB_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateJob = (id, data) => (dispatch) => {
  return JobDataService.update(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_JOB,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: JOB_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteJob = (id) => (dispatch) => {
  return JobDataService.delete(id).then(
    (response) => {
      dispatch({
        type: DELETE_JOB,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: JOB_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const findJobsByName = (name) => (dispatch) => {
  return JobDataService.findByName(name).then(
    (response) => {
      dispatch({
        type: RETRIEVE_JOBS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: JOB_FALI,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
