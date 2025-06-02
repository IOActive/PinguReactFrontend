import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import cx from "classnames";
import s from "./simple_bar_chart.module.scss";
import { Card } from "react-bootstrap";
import {generateShade} from "helpers/colors_generator";

const SimpleBarChart = ({ title, data, data_keys, x_key }) => {
    const [chartData, setChartData] = useState([]);
    const [chartDataKeys, setChartDataKeys] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setChartData(data);
            setChartDataKeys(data_keys);
            console.log("Formatted Data: ", data); // Debugging line
        }
    }, [data]); 

    // Debugging check to ensure tableData has values
    useEffect(() => {
        console.log("Table Data: ", chartData);
    }, [chartData]);
   

    return (
        <Card>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className={cx(s.Container)}>
                    <ResponsiveContainer>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={x_key} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {chartDataKeys.map((key, barIndex) => (
                                <Bar key={barIndex} dataKey={key} name={key}>
                                    {chartData.map((entry, dataIndex) => (
                                        <Cell 
                                            key={`cell-${dataIndex}`} 
                                            fill={generateShade(dataIndex, chartData.length)} 
                                        />
                                    ))}
                                </Bar>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SimpleBarChart;
