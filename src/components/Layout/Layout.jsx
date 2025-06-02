

import React from 'react';
import cx from 'classnames';
import { Routes, Route } from 'react-router';

import s from './Layout.module.scss';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';


// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from 'pages/dashboard/Dashboard';
import AddBot from "pages/bot_pages/bot_create/BotCreate";
import BotsList from "pages/bot_pages/bot_list/BotsList";
import JobsList from "pages/job_pages/job_list/JobsList";
import AddJob from "pages/job_pages/job_create/JobCreate"
import AddFuzzer from "pages/fuzzer_pages/fuzzer_create/FuzzerCreate";
import FuzzersList from "pages/fuzzer_pages/fuzzer_list/FuzzerList";
import TestCaseDetails from "pages/testcase_page/testcase_details/testcase_details"
import BuildManagerList from "pages/build_manager_pages/build_manger_list/BuildManagerList"
import AddBuild from "pages/build_manager_pages/build_manger_add/BuildCreate";
import TaskDetails from "pages/task_pages/task_details";
import ProjectsList from 'pages/project_pages/project_list/ProjectsList';
import AddProject from 'pages/project_pages/project_create/ProjectCreate';
import CoverageExplorer from 'pages/coverage_pages/coverage_explorer/coverage_explorer';

function Layout(props) {

  const [sidebarOpen, setSidebarOpen] = React.useState(false);  

  return (
    <div className={s.root}>
      <Sidebar />
      <div
        className={cx(s.wrap, { [s.sidebarOpen]: sidebarOpen })}
      >
        <Header
          sidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className={s.content}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project">
              <Route path="list" element={<ProjectsList />} />
              <Route path="add" element={<AddProject />} />
            </Route>
            <Route path="bot">
              <Route path="list" element={<BotsList />} />
              <Route path="add" element={<AddBot />} />
            </Route>
            <Route path=":job">
              <Route path="list" element={<JobsList />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="fuzzer">
              <Route path="list" element={<FuzzersList />} />
              <Route path="add" element={<AddFuzzer />} />
            </Route>
            <Route path="build_manager">
              <Route path="list" element={<BuildManagerList />} />
              <Route path="add" element={<AddBuild />} />
            </Route>
            <Route path="testcase">
              <Route path=":id" element={<TestCaseDetails />} />
            </Route>
            <Route path="task">
              <Route path=":id" element={<TaskDetails/>} />
            </Route>
            <Route path="coverage">
              <Route path="explorer" element={<CoverageExplorer/>}/> 
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );

}

export default Layout;
