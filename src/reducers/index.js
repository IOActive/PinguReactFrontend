import { combineReducers } from "redux";
import bots from "./bots";
import auth from "./auth";
import jobs from "./jobs";
import fuzzers from "./fuzzers";
import navigation from './navigation';
import runtime from './runtime';
import tasks from "./tasks";



export default combineReducers({
  auth,
  bots,
  navigation,
  runtime,
  jobs,
  fuzzers,
  tasks,
});