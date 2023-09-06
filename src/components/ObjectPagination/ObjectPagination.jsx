import { range, set } from "lodash";
import Pagination from "react-bootstrap/Pagination";
import { PaginationLink, PaginationItem } from "reactstrap";

const ObjectPagination = (props) => {
  const { page, numberOfPages, setPage } = props;

  const changePageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  const createPageArrayToShow = () => {
    if (page <= 3) {
      return range(1, page + 4);
    } else if (page >= numberOfPages - 2) {
      return range(numberOfPages - 4, numberOfPages + 1);
    } else {
      return range(page - 2, page + 3);
    }
  };

  const onCLickFirst = () => {
    setPage(1);
  };
  const onCLickPrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const onCLickNext = () => {
    if (page < numberOfPages) setPage(page + 1);
  };

  const onCLickLast = () => {
    setPage(numberOfPages);
  };

  return (
    <Pagination>
      <div className="d-flex flex-wrap">
        <PaginationItem onClick={onCLickFirst}>
          <PaginationLink first href="#"></PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={onCLickPrevious}>
          <PaginationLink previous href="#"></PaginationLink>
        </PaginationItem>
        {createPageArrayToShow().map((e) => {
          const currentPageNo = e;

          return (
            <PaginationItem
              active={currentPageNo === page}
              onClick={() => changePageNumber(currentPageNo)}
            >
              <PaginationLink href="#">{currentPageNo}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem onClick={onCLickNext}>
          <PaginationLink next href="#"></PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={onCLickLast}>
          <PaginationLink last href="#"></PaginationLink>
        </PaginationItem>
      </div>
    </Pagination>
  );
};

export default ObjectPagination;
