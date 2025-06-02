import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import cx from "classnames";
import s from "./simple_pie_chart.module.scss";
import { Card } from "react-bootstrap";
import { generateShade } from "helpers/colors_generator";


const SimplePieChart = ({ title, data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setChartData(data);
            console.log("Formatted Data: ", data); // Debugging line
        }
    }, [data]);

    return (
        <Card>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className={cx(s.Container)}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                className={cx(s.Pie)}
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {/* Ensure colors are unique */}
                                {chartData.map((entry, index) => {
                                    const color = generateShade(index, chartData.length);
                                    return <Cell key={`cell-${index}`} fill={color} />;
                                })}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SimplePieChart;
