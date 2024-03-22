import {
  CREATE_JOBTEMPLATE,
  RETRIEVE_JOBTEMPLATES,
  UPDATE_JOBTEMPLATE,
  DELETE_JOBTEMPLATE,
  JOBTEMPLATE_REQUEST,
  JOBTEMPLATE_FAILURE,
} from "../actions/types";

const initialState = [];

function jobTemplateReducer(jobTemplates = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case JOBTEMPLATE_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_JOBTEMPLATE:
      return {
        isFetching: true,
        payload,
      };

    case RETRIEVE_JOBTEMPLATES:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_JOBTEMPLATE:
      if (jobTemplates.payload) {
        return jobTemplates.map((jobTemplate) => {
          if (jobTemplate.id === payload.id) {
            return {
              ...jobTemplate,
              ...payload,
            };
          } else {
            return jobTemplate;
          }
        });
      }
      else {
        return jobTemplates;
      }

    //case DELETE_JOBTEMPLATE:

    case JOBTEMPLATE_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return jobTemplates;
  }
}

export default jobTemplateReducer;
