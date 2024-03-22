import cx from "classnames";

import s from "./Dropdown.module.scss";

export const Dropdown = ({ defaultTheme, onChange, data }) => {
    return (
      <select className={cx(s.select)} defaultValue={defaultTheme} onChange={onChange}>
        {Object.keys(data)
          .sort()
          .map((theme, index) => {
            return (
              <option key={index} value={theme}>
                {theme}
              </option>
            );
          })}
      </select>
    );
  };