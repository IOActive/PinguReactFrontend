import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import cx from "classnames";
import s from "./metrics_chart.module.scss";

const MetricsChart = ({ title, columns, rows }) => {

    const [selectedMetric, setSelectedMetric] = useState("");
    const [tableColumns, setTableColumns] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        if (columns && rows) {
            setTableColumns(columns);
            setTableRows(rows);
        }
    }, [columns, rows]); // Re-run when columns or rows change


    return (
        <Card>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        {selectedMetric}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {tableColumns.map((col, index) => (
                            <Dropdown.Item key={index} onClick={() => setSelectedMetric(col)}>
                                {col}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <Card.Body>
                <div className={cx(s.Container)}>
                    <ResponsiveContainer>
                        <LineChart data={tableRows}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={selectedMetric} stroke="#007bff" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MetricsChart;
