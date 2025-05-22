// import package
import React, { useEffect, useState } from 'react'
import { CTable } from '@coreui/react'
import { useTable, usePagination, useFilters } from 'react-table'
import PropTypes from 'prop-types'

// import Pagination from 'rc-pagination'
// import 'rc-pagination/assets/index.css'
import { Filter, DefaultColumnFilter } from './columnFillter'

const ServerSideTable = (props) => {
  const {
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    filters,
    setFilters,
  } = props
  console.log('-----controlledPageCount', columns)
  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: DefaultColumnFilter,
  //   }),
  //   [],
  // )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    getHeaderProps,
    page, // Instead of using 'rows', we'll use page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10, filters },
      defaultColumn: { Filter: DefaultColumnFilter },
      manualPagination: true,
      manualFilters: true,
      pageCount: controlledPageCount,
    },
    useFilters,
    usePagination,
  )

  useEffect(() => {
    fetchData({ pageIndex: pageIndex + 1, pageSize })
  }, [pageIndex, pageSize])

  React.useEffect(() => {
    setFilters(state.filters)
  }, [state, setFilters])

  // Render the UI for your table
  console.log('canPreviousPagecanPreviousPage', canPreviousPage)

  return (
    <>
      <CTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          <tr {...getHeaderProps}>
            {headers.map((column, colIndex) => (
              <th {...column.getHeaderProps()} key={colIndex}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
          <tr {...getHeaderProps}>
            {headers.map((column, i) => (
              <th {...column.getHeaderProps()} key={i}>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CTable>

      {/* <Pagination
        current={pageIndex + 1}
        onChange={(current, pageSize) => {
          gotoPage(current - 1)
        }}
        total={controlledPageCount}
        showLessItems
        showTitle={false}
      /> */}
    </>
  )
}
ServerSideTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  filters: PropTypes.array,
  setFilters: PropTypes.func,
}
export default ServerSideTable
