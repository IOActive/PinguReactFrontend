# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ErrorPage from "../pages/error/ErrorPage";

import "../styles/theme.scss";
import Layout from "./Layout/Layout";
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeButton={<CloseButton />} />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/app/*"
            element={<PrivateRoute>
              <Layout />
            </PrivateRoute>} />
          <Route path="*" element={<Navigate to="/app" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);



export default App;