import React from "react";
import { Form } from "react-bootstrap";
import s from "./filter_dropdown.module.scss";
import cx from "classnames";
import { useState } from "react";

const FilterDropdown = ({ targets: options, select_f: select_f, title: title, default_value: default_value="" }) => {
    const [selectedValue, setSelectedValue] = useState(default_value);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue); // Update local state
        select_f(newValue); // Call the passed function (handle_fuzz_target)
    };

    return (
        <div className={cx(s.container)}>
           <label className={cx(s.SelectLabel)}>{title}</label>
        <Form.Select value={selectedValue} onChange={(e) => handleChange(e)}>
            {options.map((target, index) => (
                <option key={index} value={target.id}> {/* You can use target.id, target.name, etc. */}
                    {target.binary || target.id} {/* Display a specific property like 'binary' or 'id' */}
                </option>
            ))}
        </Form.Select>
        </div>
    );
};

export default FilterDropdown;
