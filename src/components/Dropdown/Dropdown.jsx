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

import cx from "classnames";

import s from "./Dropdown.module.scss";

export const Dropdown = ({ defaultTheme, onChange, data }) => {
    return (
      <select className={cx(s.select)} defaultValue={defaultTheme} onChange={onChange}>
        {Object.keys(data)
          .sort()
          .map((theme, index) => {
            return (
              <option key={index} value={theme}>
                {theme}
              </option>
            );
          })}
      </select>
    );
  };