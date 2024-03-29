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

import React from 'react';

function SearchBar(props) {
  const { searchValue, onChangeSearchValue, findByName, refreshData } = props;

  return (
    <div>
      <div className="pull-right mt-n-xs">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={findByName}
        >
          Search
        </button>
      </div>
      <div className="pull-right mt-n-xs">
        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${searchValue}`}
          value={searchValue}
          onChange={onChangeSearchValue}
        />
      </div>
      <div className="pull-right mt-n-xs">
      <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={refreshData}
        >Refresh</button>
      </div>
    </div>
  );
}

export default SearchBar;
