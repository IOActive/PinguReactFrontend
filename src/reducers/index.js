import { combineReducers } from "redux";
import bots from "./bots";
import auth from "./auth";
import message from "./message";
import navigation from './navigation';
import runtime from './runtime';



export default combineReducers({
  auth,
  message,
  bots,
  navigation,
  runtime
});