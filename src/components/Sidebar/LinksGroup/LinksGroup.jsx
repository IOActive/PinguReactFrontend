import React, { useState } from "react";
import cx from "classnames";
import { NavLink, Link } from "react-router-dom";
import { Collapse } from "reactstrap";

import Icon from "../../Icon/Icon";

import s from "./LinksGroup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function LinksGroup(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { className, childrenLinks, headerLink, header, glyph } = props;

  if (!childrenLinks) {
    return (
      <li className={cx(s.headerLink, className)}>
        <Link to={headerLink} exact="true">
          <div>
            {glyph && <Icon glyph={glyph} />}
            <span>{header}</span>
          </div>
        </Link>
      </li>
    );
  }

  // create a sidebar menu for the header link and the header link itself and toggle children links when clicked.
  return (
    <li className={cx(s.headerLink, className)}>
      <NavLink exact="true" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {typeof glyph === "object" ? (
            <span> {glyph} </span>
          ) : (
            <Icon glyph={glyph} />
          )}
          <span>{header}</span>
        </div>
      </NavLink>
      <Collapse className={s.panel} isOpen={isOpen} navbar>
        <ul>
          {childrenLinks &&
            childrenLinks.map((child) => (
              <li key={child.name}>
                <NavLink
                  to={child.link}
                  exact="true"
                  onClick={() => setIsOpen(true)}
                >
                  {child.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </Collapse>
    </li>
  );
}

export default LinksGroup;
