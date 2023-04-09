import {
  CREATE_BOT,
  RETRIEVE_BOTS,
  UPDATE_BOT,
  DELETE_BOT,
  BOT_REQUEST,
  BOT_FAILURE,
} from "../actions/types";

const initialState = [];

function botReducer(bots = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BOT_REQUEST:
      return {
        isFetching: true,
      };

    case CREATE_BOT:
      return [...bots, payload];

    case RETRIEVE_BOTS:
      return {
        isFetching: false,
        payload,
      };

    case UPDATE_BOT:
      if (bots.payload) {
        return bots.map((bot) => {
          if (bot.id === payload.id) {
            return {
              ...bot,
              ...payload,
            };
          } else {
            return bot;
          }
        });
      }
      else {
        return bots;
      }

    case DELETE_BOT:
      return bots.filter(({ id }) => id !== payload.id);

    case BOT_FAILURE:
      return {
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return bots;
  }
}

export default botReducer;
