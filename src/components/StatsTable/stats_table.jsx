import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const StatsTable = ({ title, columns, rows }) => {
    const [tableColumns, setTableColumns] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        if (columns && rows) {
            setTableColumns(columns);
            setTableRows(rows);
        }
    }, [columns, rows]); // Re-run when columns or rows change

    return (
        <Card className="mb-4">
            <Card.Body>
                <h2 className="h5">{title}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {tableColumns.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((entry, index) => (
                            <tr key={index}>
                                {tableColumns.map((col, colIndex) => (
                                    <td key={colIndex}>{entry[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default StatsTable;
