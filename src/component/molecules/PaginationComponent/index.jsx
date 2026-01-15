"use client";
import PropTypes from "prop-types";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import classes from "./PaginationComponent.module.css";
import { RECORDS_LIMIT } from "@/const";

export default function PaginationComponent({
  totalRecords = 50,
  currentPage = 1,
  setCurrentPage = () => {},
}) {
  const totalPages = Math.ceil(totalRecords / RECORDS_LIMIT);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.text}
      >{`Showing ${currentPage} of ${totalPages}`}</div>
      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={goToPrevPage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goToPrevPage();
            }
          }}
          className={classes.iconBox}
          aria-label="Go to previous page"
          disabled={currentPage <= 1}
          style={{ background: "none", border: "none", padding: 0, cursor: currentPage <= 1 ? "not-allowed" : "pointer" }}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>

        <button
          type="button"
          onClick={goToNextPage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goToNextPage();
            }
          }}
          className={classes.iconBox}
          aria-label="Go to next page"
          disabled={currentPage >= totalPages}
          style={{ background: "none", border: "none", padding: 0, cursor: currentPage >= totalPages ? "not-allowed" : "pointer" }}
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

PaginationComponent.propTypes = {
  totalRecords: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

PaginationComponent.defaultProps = {
  totalRecords: 50,
  currentPage: 1,
  setCurrentPage: () => {},
};
