

import React from 'react';
import cx from 'classnames';
import { Routes, Route } from 'react-router';

import s from './Layout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';


// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';
import AddBot from "../../pages/bot_pages/bot_create/BotCreate";
import BotsList from "../../pages/bot_pages/bot_list/BotsList";
import JobsList from "../../pages/job_pages/job_list/JobsList";
import AddJob from "../../pages/job_pages/job_create/JobCreate"
import AddFuzzer from "../../pages/fuzzer_pages/fuzzer_create/FuzzerCreate";
import FuzzersList from "../../pages/fuzzer_pages/fuzzer_list/FuzzerList";
import TestCaseDetails from "../../pages/testcase_page/testcase_details/testcase_details"
import BuildManagerList from "../../pages/build_manager_pages/build_manger_list/BuildManagerList"
import AddBuild from "../../pages/build_manager_pages/build_manger_add/BuildCreate";

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
            <Route path="bot">
              <Route path="list" element={<BotsList />} />
              <Route path="add" element={<AddBot />} />
            </Route>
            <Route path="job">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );

}

export default Layout;
