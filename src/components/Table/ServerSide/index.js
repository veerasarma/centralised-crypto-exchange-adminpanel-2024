// import package
import React, { useEffect } from "react";
import { CTable } from "@coreui/react";
import { useSelector } from "react-redux";
import {
  useTable,
  usePagination,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import PropTypes from "prop-types";
import { DefaultColumnFilter } from "./filters";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { WaveLoading } from "react-loadingg";

const ServerSideTable = (props) => {
  const {
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    filterState,
  } = props;
  const dateFilter = useSelector((state) => state.DateFillter);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    visibleColumns,
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      defaultColumn,
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  useEffect(() => {
    if (dateFilter && dateFilter?.isDate) {
      fetchData({
        pageIndex: pageIndex + 1,
        pageSize,
        filters: filterState?.filters,
        sortBy,
        type: filterState?.type,
      });
    } else {
      fetchData({ pageIndex: pageIndex + 1, filters, pageSize, sortBy });
    }
  }, [pageIndex, pageSize, sortBy]);

  useEffect(() => {
    if (filters.length >= 0 && data.length > 0) {
      debounceFilter()
    } else if (filters.length > 0) {
      debounceFilter()
    }
  }, [filters]);

  const debounceFilter = useAsyncDebounce((value) => {
    try {
      if (filters && filters.length > 0) {
        if (dateFilter && dateFilter.isDate) {
          Array.prototype.push.apply(filters, dateFilter && dateFilter.filters);
          const uniqueIds = [];
          const unique = filters.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.id);
            if (!isDuplicate) {
              uniqueIds.push(element.id);
              return true;
            }
            return false;
          });
          fetchData({
            pageIndex: pageIndex + 1,
            pageSize,
            filters: unique,
            sortBy,
            type: filterState.type,
          });
        } else {
          fetchData({ pageIndex: pageIndex + 1, pageSize, filters, sortBy });
        }
      } else {
        fetchData({ pageIndex: pageIndex + 1, pageSize, filters, sortBy });
      }
    } catch (err) {}
  }, 1000);
  // Render the UI for your table

  return (
    <>
      {loading && <WaveLoading style={{ "margin-left": "40%" }} />}
      <div className="table-responsive">
        {!loading && (
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, key) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index}>
                      <div
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <thead>
              {headerGroups.map((headerGroup, key) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index}>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: "left",
                  }}
                ></th>
              </tr>
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, key) => {
                      return (
                        <td {...cell.getCellProps()} key={key}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {!loading && page.length === 0 && (
        <CTable className="d-flex justify-content-center nodata">No Data Found</CTable>
      )}
      {!loading && page.length > 0 && (
        <Pagination
          current={pageIndex + 1}
          onChange={(current, pageSize) => {
            gotoPage(current - 1);
          }}
          total={controlledPageCount}
          showLessItems
          showTitle={false}
        />
      )}
    </>
  );
};

ServerSideTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  filters: PropTypes.array,
  setFilterState: PropTypes.func,
  filterState: PropTypes.func,
};

export default React.memo(ServerSideTable);
