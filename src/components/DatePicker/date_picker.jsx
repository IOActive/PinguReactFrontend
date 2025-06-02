import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import cx from "classnames";
import s from "./date_picker.module.scss";

const CalendarFilter = ({start_date_r,  end_date_r, callback}) => {
    

    const [start_date, set_start_date] = useState(start_date_r.current);
    const [end_date, set_end_date] = useState(end_date_r.current);

    const handle_start_date = (date) => {
        set_start_date(date);
        start_date_r.current = date.toISOString().split('T')[0];
        console.log("start date changed to:", start_date);
        callback();
    };
    const handle_end_date = (date) => {
        set_end_date(date);
        end_date_r.current = date.toISOString().split('T')[0]; 
        console.log("end date changed to:", end_date);
        callback();
    };


    return (
    <div className={cx(s.container)}>
        <label>Start Date:</label>
        <DatePicker
            selected={start_date}
            onChange={(date) => handle_start_date(date)}
            dateFormat="yyyy-MM-dd"
        />

        <label>End Date:</label>
        <DatePicker
            selected={end_date}
            onChange={(date) => handle_end_date(date)}
            dateFormat="yyyy-MM-dd"
        />
    </div>);

};
export default CalendarFilter;