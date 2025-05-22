// import package
import React, { useEffect } from 'react'
import { CTable } from '@coreui/react'
import { useTable, usePagination, useFilters, useAsyncDebounce } from 'react-table'

import { Filter, DefaultColumnFilter } from '../test/reactTableNew/fillters'

import PropTypes from 'prop-types'

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
    state: { pageIndex, pageSize, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      manualFilters: true,
      defaultColumn, // Be sure to pass the defaultColumn option
      pageCount: controlledPageCount,
    },
    useFilters,
    usePagination,
  )
  const debounceFilter = useAsyncDebounce((value) => {
    console.log('----state', filters)
    fetchData(value)
  }, 1000)

  useEffect(() => {
    console.log('---pageIndex')
    fetchData({ pageIndex, pageSize, filters })
  }, [pageIndex, pageSize])

  useEffect(() => {
    console.log('---filter')
    debounceFilter({ pageIndex, pageSize, filters })
  }, [filters])

  // Render the UI for your table

  return (
    <>
      <CTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, h) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={h}>
              {headerGroup.headers.map((column, c) => (
                <th {...column.getHeaderProps()} key={c}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
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
                {row.cells.map((cell, c) => {
                  return (
                    <td {...cell.getCellProps()} key={c}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CTable>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  )
}
ServerSideTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  //   row: PropTypes.bool.isRequired,
  //   cell: PropTypes.any,
  //   renderRowSubComponent: PropTypes.func.isRequired,
}
export default ServerSideTable
