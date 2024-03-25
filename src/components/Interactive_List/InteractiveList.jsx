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

import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { Table, Spinner, Badge } from "reactstrap";
import Widget from "../Widget/Widget";
import cx from "classnames";
import Icon from "../Icon/Icon";
import s from "./InteractiveList.module.scss";
import CustomPagination from "../ObjectPagination/ObjectPagination";
import { beautify_key_names, isDateString, beautify_date } from "../../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function InteractiveList(props) {
    const [searchName, setSearchName] = useState("");

    const { glyph, search_fucntion, objectName, setCurrentObject, retieve_data_function, selector, colums, parent_object_id } = props;

    const [currentIndex, setCurrentIndex] = useState(-1);

    const { isFetching, payload } = selector;


    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5);
    const [totalData, setTotalData] = useState(0);


    const onChangeSearchName = (e) => {
        setSearchName(e.target.value);
    };

    const findByName = () => {
        search_fucntion(searchName);
    };

    const refreshData = () => {
        if (parent_object_id)
            retieve_data_function(1, parent_object_id)
        else
            retieve_data_function(1);
        setCurrentObject(null);
        setCurrentPage(1);
        if (payload) {
            setTotalData(payload.count);
        }
    };

    const setActiveObject = (object, index) => {
        setCurrentObject(object);
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (parent_object_id)
            retieve_data_function(1, parent_object_id)
        else
            retieve_data_function(1);
        if (payload)
            setTotalData(payload.count);
    }, []);

    useEffect(() => {
        if (parent_object_id)
            retieve_data_function(1, parent_object_id)
        else
            retieve_data_function(1);
        if (payload)
            setTotalData(payload.count);
    }, [parent_object_id]);



    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (parent_object_id)
            retieve_data_function(pageNumber, parent_object_id)
        else
            retieve_data_function(pageNumber);
    };


    return (
        <div className={cx(s.root)}>
            <Widget
                title={
                    <div>
                        {search_fucntion != undefined && (

                            <SearchBar
                                searchValue={searchName}
                                onChangeSearchValue={onChangeSearchName}
                                findByName={findByName}
                                refreshData={refreshData}
                            />
                        )}
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
                {isFetching ? (
                    <Spinner animation="border" variant="primary" />
                ) : (
                    payload && (
                        <div>
                            <InteractiveTable
                                listData={payload.results}
                                setActiveObject={setActiveObject}
                                currentIndex={currentIndex}
                                colums={colums}
                            />
                        </div>
                    )


                )}
                <CustomPagination
                    dataPerPage={dataPerPage}
                    totalData={totalData}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </Widget>
        </div>
    )
}

//Table Section
const InteractiveTable = ({ listData, setActiveObject, currentIndex, colums }) => {

    return (
        <Table bordered hover responsive className={cx("mb-0", s.InteractiveTable)}>
            <thead>
                <tr>
                    {colums.map((colum, index) => (
                        <th key={index}>{beautify_key_names(colum)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    
                    listData.map((listItem, index) => {
                        return <Row listItem={listItem} index={index} setActiveObject={setActiveObject} currentIndex={currentIndex} colums={colums} />;
                    }
                    )
                }
            </tbody>
        </Table>
    );

};

const Row = ({ listItem, index, setActiveObject, currentIndex, colums }) => {
    return (
        <tr key={index}>
            {
                colums.map((colum, index2) => {

                    if (isDateString(listItem[colum]))
                        return <td key={index2} onClick={() => setActiveObject(listItem, index)}>{beautify_date(listItem[colum])} </td>;
                    else if (typeof listItem[colum] === 'boolean')
                        return <td>
                            <Badge
                                className="ml-xs"
                                color={listItem[colum] === "false"
                                    ? "danger"
                                    : "success"}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </Badge>
                        </td>;
                    else
                        return <td key={index2} onClick={() => setActiveObject(listItem, index)}>{listItem[colum]}</td>;

                })

            }


        </tr>
    );
};

export default InteractiveList;