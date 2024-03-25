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
