import {
    CREATE_BOT,
    RETRIEVE_BOTS,
    UPDATE_BOT,
    DELETE_BOT,
    DELETE_ALL_BOTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function botReducer(bots = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_BOT:
        return [...bots, payload];
  
      case RETRIEVE_BOTS:
        return payload;
  
      case UPDATE_BOT:
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
  
      case DELETE_BOT:
        return bots.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_BOTS:
        return [];
  
      default:
        return bots;
    }
  };
  
  export default botReducer;