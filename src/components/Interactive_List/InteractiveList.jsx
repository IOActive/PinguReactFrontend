import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { Table, Spinner,Badge} from "reactstrap";
import Widget from "../Widget/Widget";
import cx from "classnames";
import Icon from "../Icon/Icon";
import s from "./InteractiveList.module.scss";
import ObjectPagination from "../ObjectPagination/ObjectPagination";
import { beautify_key_names, isDateString, beautify_date } from "../../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function InteractiveList(props) {
    const [searchName, setSearchName] = useState("");

    const { glyph, search_fucntion, objectName, setCurrentObject, retieve_data_function, selector, colums } = props;

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
const InteractiveTable = ({ listData, setActiveObject, currentIndex, colums }) => {

    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData(listData);
    }, [listData]);

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
                {currentData.map((listItem, index) => {
                    return <Row listItem={listItem} index={index} setActiveObject={setActiveObject} currentIndex={currentIndex} colums={colums} />;
                })}
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