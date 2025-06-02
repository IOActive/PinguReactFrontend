import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useLocation, Link } from "react-router-dom";
import s from "./PageHeader.module.scss";
import cx from "classnames";
import { BackButton } from "components/BackButton/BackButton";

export const PageHeader = (props) => {
  const { title} = props;
  const location = useLocation();

  // Split the current path into segments
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  return (
    <>
      <Breadcrumb>
        {pathSegments.map((segment, index) => {
          const pathToSegment = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <BreadcrumbItem key={index} active={isLast}>
              {isLast ? (
                segment
              ) : (
                <Link to={pathToSegment}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      <div className={cx("mb-0", s.Header)}>
        <h1 className="mb-lg">{title}</h1>
        <BackButton />
      </div>
    </>
  );
};
