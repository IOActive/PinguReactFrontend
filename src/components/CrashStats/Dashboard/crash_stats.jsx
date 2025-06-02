import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_crash_stats } from "actions/crash_stats";
import FilterDropdown from "components/FilterDropdown/filter_dropdown";
import StatsTable from "components/StatsTable/stats_table";
import { Card, Col, Row } from "react-bootstrap";
import CalendarFilter from "components/DatePicker/date_picker";
import store from "store"
import SimpleBarChart from "components/SimpleBarChart/simple_bar_chart";
import cx from "classnames";
import s from "./crash_stats.module.scss";
import SimpleBubbleChart from "components/SimpleBubbleChart/simple_bubble_chart";
import SimplePieChart from "components/SimplePieChart/simple_pie_chart";
import MetricsChart from "components/MetricsChart/metricts_chart";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const mockData = {
    success: true,
    detail: {
      cols: [
        { label: "crash_type", type: "string" },
        { label: "platform", type: "string" },
        { label: "fuzzer", type: "string" },
        { label: "job", type: "string" },
        { label: "crashes_count", type: "number" },
        { label: "min_crash_time_in_ms", type: "number" },
        { label: "max_crash_time_in_ms", type: "number" },
        { label: "sum_crash_time_in_ms", type: "number" },
        { label: "sum_square_crash_time_in_ms", type: "number" },
        { label: "new_flag", type: "boolean" }
      ],
      rows: [
        { c: [{ v: "Heap-buffer-overflow READ 1" }, { v: "Linux" }, { v: "fuzzer1" }, { v: "job1" }, { v: 5 }, { v: 0.0 }, { v: 10.0 }, { v: 50.0 }, { v: 100.0 }, { v: 1 }] },
        { c: [{ v: "Use-after-free WRITE" }, { v: "Windows" }, { v: "fuzzer2" }, { v: "job2" }, { v: 8 }, { v: 1.0 }, { v: 20.0 }, { v: 160.0 }, { v: 640.0 }, { v: 0 }] },
        { c: [{ v: "NULL Pointer Dereference" }, { v: "macOS" }, { v: "fuzzer3" }, { v: "job3" }, { v: 3 }, { v: 2.0 }, { v: 5.0 }, { v: 12.0 }, { v: 36.0 }, { v: 1 }] },
        { c: [{ v: "Heap-buffer-overflow READ 1" }, { v: "Windows" }, { v: "fuzzer4" }, { v: "job4" }, { v: 7 }, { v: 0.5 }, { v: 15.0 }, { v: 105.0 }, { v: 315.0 }, { v: 0 }] },
        { c: [{ v: "Use-after-free WRITE" }, { v: "Linux" }, { v: "fuzzer5" }, { v: "job5" }, { v: 2 }, { v: 3.0 }, { v: 7.0 }, { v: 14.0 }, { v: 49.0 }, { v: 1 }] },
        { c: [{ v: "NULL Pointer Dereference" }, { v: "Linux" }, { v: "fuzzer6" }, { v: "job6" }, { v: 6 }, { v: 1.0 }, { v: 10.0 }, { v: 60.0 }, { v: 180.0 }, { v: 0 }] }
      ],
      column_descriptions: {}
    }
  };


const CrashStatsDashboard = () => {
    const active_project = useSelector((state) => state.active_project);

    const [table_columns, set_table_columns] = useState([]);
    const [formated_table_data, set_table_data] = useState([]);
    const [formated_bar_chart_data, set_formated_bar_chart_data] = useState([]);
    const [bar_chart_data_keys, set_chart_data_keys] = useState([]);
    const [bubble_chart_data, set_bubble_chart_data] = useState([]);
    const [pie_chart_data, set_pie_chart_data] = useState([]);

    const bar_chart_parameter_ref = useRef('platform');
    const group_by_ref = useRef('crash_type,platform,fuzzer,job,time');
    const interval_ref = useRef('1 day');
    const start_date_ref = useRef('2023-04-30');
    const end_date_ref = useRef('2023-04-30');

    const bar_chart_parameter_options = [
        { 'id': 'crash_type' }, { 'id': 'fuzzer' },
        { 'id': 'job' }, { 'id': 'platform' }
    ];

    const interval_options = [
        { 'id': '1 minute' },
        { 'id': '1 hour' },
        { 'id': '1 day' },
        { 'id': '7 days' },
        { 'id': '30 days' },
        { 'id': '1 week' },
        { 'id': '1 month' },
        { 'id': '3 months' }];

    const dispatch = useDispatch();

    function fetch_data() {
        dispatch(
            get_crash_stats(
                group_by_ref.current,
                start_date_ref.current,
                end_date_ref.current,
                interval_ref.current,
                active_project,
            )
        ).then(() => {
            const state = store.getState();
            const newStatsPayload = state.crash_stats.payload;

            if (newStatsPayload && newStatsPayload.detail && newStatsPayload.detail.rows) {
                format_table_data(newStatsPayload);
                format_bar_chart_data(newStatsPayload, bar_chart_parameter_ref.current);
                format_bubble_chart_data(newStatsPayload);
                format_pie_chart_data(newStatsPayload, bar_chart_parameter_ref.current)
            } else {
                console.log('No crash stats found for the selected project.');
                set_table_columns([]);
                set_table_data([]);
            }
        }).catch((error) => console.error('Failed to fetch fuzzer target stats:', error));

    }

    function format_table_data(newStatsPayload) {
        const newColumns = newStatsPayload.detail.cols.map(col => col.label);
        const newFormattedData = newStatsPayload.detail.rows.map(row => {
            const rowData = {};
            row.c.forEach((cell, index) => {
                rowData[newColumns[index]] = cell.v;
            });
            return rowData;
        });

        // Directly update the state
        set_table_columns(newColumns);
        set_table_data(newFormattedData);;
    }

    const format_bar_chart_data = (inputData, parameter) => {
        // Extract column labels
        const cols = inputData.detail.cols;
        const parameterIndex = cols.findIndex(col => col.label === parameter);
        const crashs_count_index = cols.findIndex(col => col.label === 'crashes_count');
    
        // Check if the parameter exists
        if (parameterIndex === -1) {
            throw new Error(`Parameter "${parameter}" not found in columns.`);
        }
    
        // Format and group the data
        const raw_data = inputData.detail.rows.reduce((acc, row) => {
            const crashes_count = row.c[crashs_count_index].v; // crashes_count value
            const name = row.c[parameterIndex].v; // Value for the selected parameter
            
            if (acc[name]) {
                acc[name].crashes_count += crashes_count; // Sum the crashes_count for duplicate names
            } else {
                acc[name] = { name, crashes_count };
            }
    
            return acc;
        }, {});
    
        // Convert object back to array
        const grouped_data = Object.values(raw_data);
    
        const keys = Object.keys(grouped_data[0]).filter(key => key !== 'name');
        set_chart_data_keys(keys);
    
        set_formated_bar_chart_data(grouped_data);
    };
    

    // Function to format bubble chart data
    const format_bubble_chart_data = (inputData) => {
        const cols = inputData.detail.cols;
        const crashs_count_index = cols.findIndex(col => col.label === 'crashes_count');
        const min_crash_time_in_ms_index = cols.findIndex(col => col.label === 'min_crash_time_in_ms');
        const max_crash_time_in_ms_index = cols.findIndex(col => col.label === 'max_crash_time_in_ms');

        const new_data = inputData.detail.rows.map((row) => {
            return {
                minTime: row.c[min_crash_time_in_ms_index].v, // min_crash_time_in_ms
                maxTime: row.c[max_crash_time_in_ms_index].v, // max_crash_time_in_ms
                crashes: row.c[crashs_count_index].v, // crashes_count
            };
        });
        set_bubble_chart_data(new_data);
    };

    const format_pie_chart_data = (data, category) => {
        if (!data?.detail?.rows || !data?.detail?.cols) {
            return [];
        }

        const categoryIndex = data.detail.cols.findIndex(col => col.label === category);
        const crashesCountIndex = data.detail.cols.findIndex(col => col.label === "crashes_count");

        if (categoryIndex === -1 || crashesCountIndex === -1) {
            return [];
        }

        const aggregatedData = {};

        data.detail.rows.forEach(row => {
            const categoryValue = row.c[categoryIndex]?.v;
            const crashesCount = row.c[crashesCountIndex]?.v || 0;

            if (categoryValue) {
                aggregatedData[categoryValue] = (aggregatedData[categoryValue] || 0) + crashesCount;
            }
        });

        const new_data = Object.entries(aggregatedData).map(([name, value]) => ({ name, value }));
        set_pie_chart_data(new_data);
    };


    useEffect(() => {
        // Set end date to today
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);

        // Set start date to 3 moths ago approximately
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 90);

        // Format and set state
        start_date_ref.current = formatDate(startDate);
        end_date_ref.current = formatDate(endDate);

        // Get Crash stats
        fetch_data();
    }, [dispatch, active_project]);

    function handle_interval(value) {
        interval_ref.current = value;
        fetch_data();
    }

    function handle_bar_chart_parameter(value) {
        bar_chart_parameter_ref.current = value;
        fetch_data();
    }


    function dates_handler() {
        fetch_data();
    }

    return (
        <Card>
            <Card.Header >
                <CalendarFilter
                    start_date_r={start_date_ref}
                    end_date_r={end_date_ref}
                    callback={dates_handler}
                />
                <FilterDropdown
                    targets={interval_options}
                    select_f={handle_interval}
                    title="Select Interval"
                />
            </Card.Header>
            <Card.Body>
                <StatsTable
                    title={"Crash Stats"}
                    columns={table_columns}
                    rows={formated_table_data}
                />
                <Card>
                    <Card.Header>
                        <FilterDropdown
                            targets={bar_chart_parameter_options}
                            select_f={handle_bar_chart_parameter}
                            title="Select Type"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <SimpleBarChart
                                    data={formated_bar_chart_data}
                                    x_key={"name"}
                                    data_keys={bar_chart_data_keys}
                                    title="Crash Counts by Type"
                                />
                            </Col>
                            <Col>
                                <SimplePieChart
                                    title={"Crash Counts by Type"}
                                    data={pie_chart_data}
                                />
                            </Col>
                            <Row>
                                <Col>
                                    <SimpleBubbleChart
                                        data={bubble_chart_data}
                                        title={"Crash Time vs. Frequency"}

                                    />
                                </Col>
                                <Col>
                                    <MetricsChart
                                        title={"Crashes Over Time"}
                                        columns={["crashes_count"]}
                                        rows={formated_table_data}
                                    />
                                </Col>
                            </Row>
                        </Row>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    );
};

export default CrashStatsDashboard;
