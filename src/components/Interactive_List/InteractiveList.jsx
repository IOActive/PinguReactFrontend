import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Widget from "../Widget/Widget";
import cx from "classnames";
import Icon from "../Icon/Icon";
import s from "./InteractiveList.module.scss";
import ObjectPagination from "../ObjectPagination/ObjectPagination";
import { isEmpty } from "lodash";

function InteractiveList(props) {
    const [searchName, setSearchName] = useState("");

    const { refreshData, glyph, search_fucntion, objectName, isFetching, data, setCurrentObject, value_key_name } = props;

    const [currentIndex, setCurrentIndex] = useState(-1);

    const onChangeSearchName = (e) => {
        setSearchName(e.target.value);
    };

    const findByName = () => {
        search_fucntion(searchName);
    };

    const setActiveObject = (object, index) => {
        setCurrentObject(object);
        setCurrentIndex(index);
    };

    const [page, setPage] = useState(1);
    const limit = 5
    let numberOfPages = 1;
    if (! isEmpty(data)) {
        numberOfPages = Math.ceil(data.length / limit);
    }

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
            <InteractiveTable listData={data} isFetching={isFetching} setActiveObject={setActiveObject} currentIndex={currentIndex} value_key_name={value_key_name} />
            <ObjectPagination
                    page={page}
                    numberOfPages={numberOfPages}
                    setPage={setPage}
                />
        </Widget>
    )
}

//Table Section
const InteractiveTable = ({ listData, isFetching, setActiveObject, currentIndex, value_key_name }) => {
    return (
        <Table bordered hover responsive className={cx("mb-0", s.InteractiveTable)}>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {!isFetching && listData.map((listItem, index) => {
                    return <Row listItem={listItem} index={index} setActiveObject={setActiveObject} currentIndex={currentIndex} value_key_name={value_key_name} />;
                })}
            </tbody>
        </Table>
    );
};

const Row = ({ listItem, index, setActiveObject, currentIndex, value_key_name }) => {
    return (
        <tr>
            <li
                className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveObject(listItem, index)}
                key={index}
            >
                {listItem[value_key_name]}
            </li>
        </tr>
    );
};

export default InteractiveList;