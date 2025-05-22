// import package
import React, { useEffect } from 'react'
import { CTable } from '@coreui/react'
import { useTable, usePagination, useFilters, useAsyncDebounce, useSortBy } from 'react-table'
import PropTypes from 'prop-types'
import { DefaultColumnFilter } from './fillters'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

const ServerSideTable = (props) => {
  const { columns, data, fetchData, loading, pageCount: controlledPageCount } = props
  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      defaultColumn, // Be sure to pass the defaultColumn option
      pageCount: controlledPageCount,
    },
    useFilters,
    useSortBy,
    usePagination,
  )

  useEffect(() => {
    console.log('sortbyyyyyyyyyyyyyyyyy', sortBy)
    fetchData({ pageIndex: pageIndex + 1, pageSize, filters, sortBy })
  }, [pageIndex, pageSize, sortBy])

  useEffect(() => {
    console.log('---filter')
    debounceFilter({ pageIndex: pageIndex + 1, pageSize, filters, sortBy })
  }, [filters, sortBy])

  const debounceFilter = useAsyncDebounce((value) => {
    fetchData({ pageIndex: pageIndex + 1, pageSize, filters, sortBy })
  }, 1000)
  return (
    <>
      <CTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, key) => {
                  return (
                    <td {...cell.getCellProps()} key={key}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CTable>

      <Pagination
        current={pageIndex + 1}
        onChange={(current, pageSize) => {
          gotoPage(current - 1)
        }}
        total={controlledPageCount}
        showLessItems
        showTitle={false}
      />
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
