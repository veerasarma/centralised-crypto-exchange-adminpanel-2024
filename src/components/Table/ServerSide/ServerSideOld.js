// import package
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTable, usePagination, useFilters } from 'react-table'
import { CTable } from '@coreui/react'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

const ServerSide = (props) => {
  const { columns, data, fetchData, loading, pageCount: controlledPageCount } = props

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useFilters,
    usePagination,
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    console.log('-----123', pageIndex)
    console.log('-----pageSize', pageSize)
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  console.log('---pageIndex----', pageIndex)
  return (
    <Fragment>
      <CTable bordered {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  <div>{column.canFillter ? column.render('Fillter') : null}</div>
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
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize} results
              </td>
            )}
          </tr>
        </tbody>
      </CTable>
      <Pagination
        current={pageIndex}
        onChange={(current, pageSize) => {
          console.log('---current', current)
          console.log('---pageSize', pageSize)
          gotoPage(current)
        }}
        total={80}
        showLessItems
        showTitle={false}
      />
    </Fragment>
  )
}

ServerSide.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,

  fetchData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
}

export default ServerSide
