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

import React from "react";
import Pagination from "react-bootstrap/Pagination";
import cx from "classnames";
import s from "./ObjectPagination.module.scss";


const CustomPagination = ({
  dataPerPage,
  totalData,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  let start = 1,
    end = pageNumbers.length;
  if (currentPage - 2 > 1) {
    start = currentPage - 2;
  }
  if (currentPage + 2 < pageNumbers.length) {
    end = currentPage + 2;
  }

  return (
    <Pagination className={cx(s.CustomPagination)}>
      <Pagination.First
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {start !== 1 && <Pagination.Ellipsis />}
      {pageNumbers.slice(start - 1, end).map((number) => (
        <Pagination.Item
          key={number}
          onClick={() => paginate(number)}
          active={currentPage === number}
        >
          {number}
        </Pagination.Item>
      ))}
      {end !== pageNumbers.length && <Pagination.Ellipsis />}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
      <Pagination.Last
        onClick={() => paginate(pageNumbers.length)}
        disabled={currentPage === pageNumbers.length}
      />
    </Pagination>
  );
};

export default CustomPagination;