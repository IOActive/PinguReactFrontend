import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { Table, Spinner } from "reactstrap";
import Widget from "../Widget/Widget";
import cx from "classnames";
import Icon from "../Icon/Icon";
import s from "./InteractiveList.module.scss";
import ObjectPagination from "../ObjectPagination/ObjectPagination";


function InteractiveList(props) {
    const [searchName, setSearchName] = useState("");

    const { glyph, search_fucntion, objectName, setCurrentObject, retieve_data_function, selector, setEnableEditing } = props;

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
        retieve_data_function(1);
        setEnableEditing(false);
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
        retieve_data_function(1);
        if (payload)
            setTotalData(payload.count);
    }, []);


    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        retieve_data_function(pageNumber);
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
            {isFetching ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                payload && (
                    <div>
                        <InteractiveTable
                            listData={payload.results}
                            setActiveObject={setActiveObject}
                            currentIndex={currentIndex}
                        />
                    </div>
                )


            )}
            <ObjectPagination
                dataPerPage={dataPerPage}
                totalData={totalData}
                paginate={paginate}
                currentPage={currentPage}
            />
        </Widget>
    )
}

//Table Section
const InteractiveTable = ({ listData, setActiveObject, currentIndex }) => {

    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData(listData);
    }, [listData]);

    return (
        <Table bordered hover responsive className={cx("mb-0", s.InteractiveTable)}>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((listItem, index) => {
                    return <Row listItem={listItem} index={index} setActiveObject={setActiveObject} currentIndex={currentIndex} />;
                })}
            </tbody>
        </Table>
    );

};

const Row = ({ listItem, index, setActiveObject, currentIndex }) => {
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
                {listItem['name']}
            </li>
        </tr>
    );
};

export default InteractiveList;