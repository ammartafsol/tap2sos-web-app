import PropTypes from "prop-types";
import TableSkeleton from "@/component/molecules/TableSkeleton";
import classes from "./AppTable.module.css";
import { RECORDS_LIMIT } from "@/const";
import PaginationComponent from "@/component/molecules/PaginationComponent";
import NoData from "@/component/atoms/NoData/NoData";
import { mergeClass } from "@/resources/utils/helper";

export default function AppTable({
  data = [],
  tableHeader = [],
  loading = false,
  noDataText = "",
  renderItem = null,
  renderTableHeader = null,
  hasPagination,
  ...props
}) {
  return (
    <>
      <style>
        {`
          .table100-body {
            overflow: auto !important;
          }

          @media screen and (max-width: 1440px) {
            .table100-head,
            .table100-body {
              width: 1200px;
            }
            .table100.ver1 {
              overflow-x: auto !important;
            }
          }
        `}
      </style>
      <div className={mergeClass(`${classes?.tableMainContainer}`)}>
        <div
          className={mergeClass(
            `${classes?.tableHeaderContainer} table100-head`
          )}
        >
          <table>
            <thead>
              <tr>
                {tableHeader?.map((item) => {
                  const headerKey = item?.key || item?.title || `header-${Math.random()}`;
                  return (
                    <th
                      key={headerKey}
                      style={{
                        textAlign: "left",
                        ...(item.style || {}),
                      }}
                    >
                      {renderTableHeader
                        ? renderTableHeader({ item, index: tableHeader.indexOf(item) })
                        : item?.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
        {loading ? (
          <TableSkeleton rowsCount={RECORDS_LIMIT} colsData={tableHeader} />
        ) : (
          <div
            className={mergeClass(
              `${classes?.tableBodyContainer} table100-body`
            )}
          >
            <table>
              <tbody>
                {data?.length ? (
                  data?.map((item, rowIndex) => {
                    const rowKey = item?.id || item?.key || item?._id || `row-${rowIndex}-${Math.random()}`;
                    return (
                      <tr
                        key={rowKey}
                        className={mergeClass("row100 body", classes.bodyRow)}
                      >
                        {tableHeader?.map(
                          ({ key, style, title, renderValue }, colIndex) => {
                            const cellKey = `${rowKey}-${key || colIndex}`;
                            let cellContent;
                            if (renderItem) {
                              cellContent = renderItem({
                                item: item[key],
                                colIndex,
                                rowIndex,
                                key,
                                title,
                                renderValue,
                              });
                            } else if (renderValue) {
                              cellContent = renderValue(item[key], item);
                            } else {
                              cellContent = item[key];
                            }
                            return (
                              <td
                                key={cellKey}
                                className={`cell100 column${colIndex + 1}`}
                                style={{
                                  textAlign: "left",
                                  ...style,
                                }}
                              >
                                {cellContent}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <NoData text={noDataText} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {hasPagination && <PaginationComponent {...props} />}
      </div>
    </>
  );
}

AppTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      style: PropTypes.object,
      renderValue: PropTypes.func,
    })
  ),
  loading: PropTypes.bool,
  noDataText: PropTypes.string,
  renderItem: PropTypes.func,
  renderTableHeader: PropTypes.func,
  hasPagination: PropTypes.bool,
};

AppTable.defaultProps = {
  data: [],
  tableHeader: [],
  loading: false,
  noDataText: "",
  renderItem: null,
  renderTableHeader: null,
  hasPagination: false,
};
