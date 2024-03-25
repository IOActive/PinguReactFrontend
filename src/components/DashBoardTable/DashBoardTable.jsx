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

import React, { useState, useEffect } from "react";
import { Table, Badge } from "reactstrap";
import Widget from "../Widget/Widget";
import s from "./DashBoadTable.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"
import Icon from "../Icon/Icon";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { beautify_key_names, beautify_date, isDateString } from "../../helpers/utils";

const DashboardTable = (props) => {
    const [searchName, setSearchName] = useState("");

    const { objectName, glyph, retrieveData, findObjectByName, colums, list_path, data, isFetching } = props;


    const onChangeSearchName = (e) => {
        setSearchName(e.target.value);
    };


    const findByName = () => {
        findObjectByName(searchName);
    };

    const refreshData = () => {
        retrieveData(1);
    };


    return (
        <Widget className={cx(s.DashboardWidget)}
            title={
                <div>
                    {
                        findObjectByName != undefined && (
                            <SearchBar
                                searchValue={searchName}
                                onChangeSearchValue={onChangeSearchName}
                                findByName={findByName}
                                refreshData={refreshData}
                            />
                        )
                    }
                    <h5 className="mt-0 mb-3">
                        {typeof glyph === "object" ? (
                            <span> {glyph} </span>
                        ) : (
                            <Icon glyph={glyph} />
                        )} {objectName}
                    </h5>
                </div>
            }
        >
            <Table responsive borderless className={cx("mb-0", s.DashboardTable)}>
                <thead>
                    <tr>
                        {colums.map((colum, index) => (
                            <th key={index}>{beautify_key_names(colum)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        isFetching && (
                            <tr>
                                <td colSpan="100">Loading...</td>
                            </tr>
                        )}
                    {
                        data && data.results &&
                        !isFetching &&

                        data.results.slice(0, 6).map((object, index) => (
                            <tr key={index}>
                                {
                                    colums.map((colum, index2) => {
                                        switch (colum) {
                                            case 'task_status':
                                                return <td>
                                                    <Badge
                                                        className="ml-xs"
                                                        color={
                                                            object.task_status === "ERROR" ||
                                                                object.task_status === "NA"
                                                                ? "danger"
                                                                : "success"
                                                        }
                                                    >
                                                        {object.task_status}
                                                    </Badge>
                                                </td>
                                            case 'enabled':
                                                return <td><Badge
                                                    className={cx(s.Badge)}
                                                    color={
                                                        object.enabled === "false"
                                                            ? "danger"
                                                            : "success"
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </Badge>
                                                </td>
                                            default:
                                                if (isDateString(object[colum]))
                                                    return <td key={index2}>{beautify_date(object[colum])}</td>;
                                                else
                                                    return <td key={index2}>{object[colum]}</td>;
                                        }
                                    }

                                    )}
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
            {list_path != undefined && (
                <section className={cx(s.ViewAll)}>
                    <Link to={list_path} className="btn btn-default">
                        View all {objectName}{" "}
                    </Link>
                </section>
            )
            }
        </Widget>
    );
};


export default DashboardTable;
