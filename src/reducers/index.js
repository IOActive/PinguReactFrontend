import { combineReducers } from "redux";
import bots from "./bots";
import auth from "./auth";
import message from "./message";

export default combineReducers({
  auth,
  message,
  bots,
});