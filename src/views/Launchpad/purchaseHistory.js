import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel ,CHeader } from '@coreui/react'
import DropDown from '../../components/Table/dropdown'
import PropTypes from 'prop-types'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
//import action
import { getTokenHistory } from '../../api/Launchpad/tokenHistory'
import { orderXLS, orderCSV, orderPDF } from './downloader'
//lib
import { momentFormat } from '../../lib/date'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Purchase Date',
        accessor: 'createdAt',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              {/* <CDateRangePicker /> */}

              <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'UserId',
        accessor: 'userCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Buy Currency',
        accessor: 'coin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Sell Currency',
        accessor: 'sendCoin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Price',
        accessor: 'price',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Discount',
        accessor: 'discount',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Total',
        accessor: 'total',
        // Filter: DefaultColumnFilter,
      },
    ],
    [],
  )
  //status
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [type, setType] = useState('pdf')
  const [filters, setFilters] = React.useState([])
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [filterState, setFilterState] = useState({})
  const docType = (type) => {
    setType(type)
    handleDoc(type)
  }
  const handleDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }

  
      let { result, data } = await getTokenHistory(docType)
      console.log(result,'datadataresult')
      if (type && type === 'pdf') {
        orderPDF(result.pdfData)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    
  }
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    //  array of Object into object
    setFilterState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortBy,
      filters: filters,
      type: type,
    })
    setLoading(true)
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'createdAt'
          ? 'fd_' + id
          : id === 'price' || id === 'quantity' || id === 'discount' || id === 'total'
          ? 'fn_' + id
          : 'fs_' + id]: value,
      }),
    )
    setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result } = await getTokenHistory(reqData)
    if (success) {
      setLoading(false)
      setdownloadDisable(false)
      setCount(result.count)
      setData(result.data)
    }
  }
  return (
    <CCard className="mb-4">
       <CHeader> {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}</CHeader>
      <CCardBody>
     
        <ServerSideTable
          columns={columns}
          loading={loading}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  )
}
Pairs.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Pairs
