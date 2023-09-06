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
        retrieveData();
    };


    return (
        <Widget
            title={
                <div>
                    <SearchBar
                        searchValue={searchName}
                        onChangeSearchValue={onChangeSearchName}
                        findByName={findByName}
                        refreshData={refreshData}
                    />
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
            <Table responsive borderless className={cx("mb-0", s.botsTable)}>
                <thead>
                    <tr>
                        {colums.slice(0, 6).map((colum, index) => (
                            <th key={index}>{colum}</th>
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
                        data &&
                        !isFetching &&

                        data.slice(0, 6).map((object, index) => (
                            <tr key={index}>
                                {Object.keys(object).slice(0, 6).map((key, index) => {
                                    switch (key) {
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
                                            </td>;
                                        case 'enabled':
                                            return <Badge
                                                className="ml-xs"
                                                color={
                                                    object.enabled === "false"
                                                        ? "danger"
                                                        : "success"
                                                }
                                            >
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </Badge>;
                                        default:
                                            return <td key={index}>{object[key]}</td>;
                                    }
                                })}
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
            <div className="d-flex justify-content-end">
                <Link to={list_path} className="btn btn-default">
                    View all {objectName}{" "}
                </Link>
            </div>
        </Widget>
    );
};


export default DashboardTable;
