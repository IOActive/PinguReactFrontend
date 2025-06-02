/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import { combineReducers } from "redux";
import bots from "./bots";
import bot_configs from "./bot_configs";
import auth from "./auth";
import jobs from "./jobs";
import fuzzers from "./fuzzers";
import navigation from './navigation';
import runtime from './runtime';
import tasks from "./tasks";
import testcases from "./testcase";
import crashes from "./crashes";
import jobTemplates from "./jobTemplates";
import custom_binaries from "./custom_binaries";
import corpuses from "./corpus";
import builds from "./build";
import active_project from "./active_project";
import projects from "./projects";
import fuzzer_stats from "./fuzzer_stats";
import fuzzer_targets from "./fuzzer_target";
import crash_stats from "./crash_stats";
import coverages from "./coverage";


export default combineReducers({
  auth,
  bots,
  bot_configs,
  navigation,
  runtime,
  jobs,
  fuzzers,
  tasks,
  testcases,
  crashes,
  jobTemplates,
  custom_binaries,
  corpuses,
  builds,
  projects,
  active_project,
  fuzzer_stats,
  fuzzer_targets,
  crash_stats,
  coverages,
});