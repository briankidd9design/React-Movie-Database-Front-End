import React from "react";
import _ from "lodash"; //underscore
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // const { itemsCount, pageSize, onPageChange, currentPage} = props;
  // console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          //each child in an array or iterator should have a unique key
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
//as you build components it is a good practice to use PropTypes to catch bugs related to type-setting.
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
