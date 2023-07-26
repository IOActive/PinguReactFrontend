import { combineReducers } from "redux";
import bots from "./bots";
import auth from "./auth";
import jobs from "./jobs";
import navigation from './navigation';
import runtime from './runtime';



export default combineReducers({
  auth,
  bots,
  navigation,
  runtime,
  jobs,
});