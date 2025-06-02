import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_fuzzer_stats } from "actions/fuzzer_stats";
import { get_project_fuzz_targets } from "actions/fuzz_targets";
import FilterDropdown from "components/FilterDropdown/filter_dropdown";
import StatsTable from "components/StatsTable/stats_table";
import MetricsChart from "components/MetricsChart/metricts_chart";
import { Card } from "react-bootstrap";
import CalendarFilter from "components/DatePicker/date_picker";
import store from "store"

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const FuzzerStatsDashboard = () => {
    const { isFetching: isFetchingTargets, payload: targetsPayload } = useSelector(state => state.fuzzer_targets);
    const active_project = useSelector((state) => state.active_project);

    const [project_fuzz_targets, set_project_fuzz_targets] = useState([]);
    const [columns, set_columns] = useState([]);
    const [formatted_data, set_formattedData] = useState([]);

    const current_fuzz_target_ref = useRef(null);
    const group_by_ref = useRef('by-job');

    const interval_ref = useRef('1 day');
    const start_date_ref = useRef('2023-04-30');
    const end_date_ref = useRef('2023-04-30');

    const group_by_options = [{ 'id': 'by-job' }, { 'id': 'by-interval' }, { 'id': 'by-revision' }, { 'id': 'by-time' }, { 'id': 'by-fuzztarget' }];
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

        // Get Project Fuzzer Targets
        dispatch(get_project_fuzz_targets(active_project))
            .catch((error) => console.error('Failed to fetch fuzzer target list:', error));
    }, [dispatch, active_project]);

    useEffect(() => {
        if (!isFetchingTargets && targetsPayload && targetsPayload.results) {
            set_project_fuzz_targets(targetsPayload.results);
            if (targetsPayload.results.length > 0) {
                current_fuzz_target_ref.current = targetsPayload.results[0].id;
                fetch_data();
            }
        }
    }, [isFetchingTargets, targetsPayload]);

    function fetch_data() {
        if (current_fuzz_target_ref.current) {
            dispatch(get_fuzzer_stats(
                current_fuzz_target_ref.current,
                group_by_ref.current,
                start_date_ref.current,
                end_date_ref.current,
                interval_ref.current)
            ).then(() => {
                const state = store.getState();
                const newStatsPayload = state.fuzzer_stats.payload;

                if (newStatsPayload && newStatsPayload.detail && newStatsPayload.detail.rows) {
                    const newColumns = newStatsPayload.detail.cols.map(col => col.label);
                    const newFormattedData = newStatsPayload.detail.rows.map(row => {
                        const rowData = {};
                        row.c.forEach((cell, index) => {
                            rowData[newColumns[index]] = cell.v;
                        });
                        return rowData;
                    });

                    // Directly update the state
                    set_columns(newColumns);
                    set_formattedData(newFormattedData);
                } else {
                    console.log('No crash stats found for the selected project.');
                    set_columns([]);
                    set_formattedData([]);
                }
            })
                .catch((error) => console.error('Failed to fetch fuzzer target stats:', error));
        }
    }
    function handle_fuzz_target(value) {
        current_fuzz_target_ref.current = value;
        fetch_data();

    }

    function handle_interval(value) {
        interval_ref.current = value;
        fetch_data();
    }

    function handle_group_by(value) {
        group_by_ref.current = value;
        fetch_data();
    }

    function dates_handler() {
        fetch_data();
    }

    // Loading and Error Handling
    if (isFetchingTargets) {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Card>
                            <Card.Body>
                                <h2 className="h5">Loading...</h2>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    if (!targetsPayload) {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Card>
                            <Card.Body>
                                <h2 className="h5">No data available</h2>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Card>
            <Card.Header>
                <CalendarFilter
                    start_date_r={start_date_ref}
                    end_date_r={end_date_ref}
                    callback={dates_handler}
                />
                <FilterDropdown
                    targets={project_fuzz_targets}
                    select_f={handle_fuzz_target}
                    title="Select Fuzz Target"
                />
                <FilterDropdown
                    targets={group_by_options}
                    select_f={handle_group_by}
                    title="Select Metric"
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
                    columns={columns}
                    rows={formatted_data}
                />
                <MetricsChart
                    title={"Fuzzing Metrics Over Time"}
                    columns={columns}
                    rows={formatted_data}
                />
            </Card.Body>
        </Card>
    );
};

export default FuzzerStatsDashboard;
