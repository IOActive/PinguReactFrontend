import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import cx from "classnames";
import s from "./simple_bubble_chart.module.scss";
import { Card } from "react-bootstrap";

export const SimpleBubbleChart = ({ data, title }) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className={cx(s.Container)}>
                    <ResponsiveContainer>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="minTime" name="Min Crash Time (ms)" />
                            <YAxis type="number" dataKey="maxTime" name="Max Crash Time (ms)" />
                            <ZAxis type="number" dataKey="crashes" range={[50, 500]} name="Number of Crashes" />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter data={data} 
                            fill={"#8884d8"} />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SimpleBubbleChart