import SearchBar from "../SearchBar/SearchBar";
import React, { useState } from "react";
import { Table } from "reactstrap";
import Widget from "../Widget/Widget";
import cx from "classnames";
import Icon from "../Icon/Icon";
import s from "./InteractiveList.module.scss";

function InteractiveList(props) {
    const [searchName, setSearchName] = useState("");

    const { refreshData, glyph, search_fucntion, objectName, isFetching, payload, setCurrentObject, value_key_name } = props;

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
            <Table hover responsive className={cx("mb-0", s.InteractiveTable)}>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {isFetching && (
                        <tr>
                            <td colSpan="100">Loading...</td>
                        </tr>
                    )}
                    {!isFetching && payload &&
                        payload.map((object, index) => (
                            <tr>
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => setActiveObject(object, index)}
                                    key={index}
                                >
                                    {object[value_key_name]}
                                </li>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Widget>
    )
}

export default InteractiveList;