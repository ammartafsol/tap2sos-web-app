import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import React, { useMemo } from "react";
import classes from "./TableSkeleton.module.css";

function TableSkeleton({ rowsCount = 10, colsCount = 5, height }) {
  const rows = useMemo(() => new Array(rowsCount).fill(0).map((_, i) => ({ id: `row-${rowsCount}-${i}`, index: i })), [rowsCount]);
  const cols = useMemo(() => new Array(colsCount).fill(0).map((_, i) => ({ id: `col-${colsCount}-${i}`, index: i })), [colsCount]);

  return (
    <>
      <style>{`
            table{
            width:100%;
            }
           
           .tr{
                all:unset;
                display:flex;
                gap:15px;
            }
            .table100{
               margin:10px;
            }
            `}</style>
      <div className={`table100 ver1 m-b-110 ${classes.tableSkeleton}`}>
        <div className=" js-pscroll ps ps--active-y">
          <table>
            <tbody>
              {rows.map((row) => (
                <tr className="row100 body tr" key={row.id}>
                  {cols.map((col) => (
                    <td
                      style={{
                        width: `${100 / colsCount}%`,
                        paddingBlock: "5px",
                      }}
                      key={col.id}
                    >
                      <Skeleton height={height ?? 50} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

TableSkeleton.propTypes = {
  rowsCount: PropTypes.number,
  colsCount: PropTypes.number,
  height: PropTypes.number,
};

TableSkeleton.defaultProps = {
  rowsCount: 10,
  colsCount: 5,
  height: 50,
};

export default TableSkeleton;
