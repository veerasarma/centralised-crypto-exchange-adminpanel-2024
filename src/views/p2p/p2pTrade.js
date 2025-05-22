import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import PropTypes from 'prop-types'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import DropDown from '../../components/Table/dropdown'
//import action
import { getP2pTrade } from '../../api/p2p/pair'
import { orderHistory, orderHistoryDoc } from '../../api/p2p/history'
import { orderXLS, orderCSV, orderPDF } from './downloader'
//lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import {
  DateColumnFilter,
  p2pTradeStatusColumnFilter,
} from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'

const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date & Time',
        accessor: 'startTime',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              {/* <CDateRangePicker /> */}

              <CFormLabel>{momentFormat(original.startTime)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Reference Id',
        accessor: '_id',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Order Id',
        accessor: 'orderId',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Buyer ID',
        accessor: 'buyUniqueId',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Seller ID',
        accessor: 'sellUniqueId',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Trade Type',
        accessor: 'side',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Base Coin',
        accessor: 'firstCoin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Quote Coin',
        accessor: 'secondCoin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Price',
        accessor: 'price',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Pay Price',
        accessor: 'payValue',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Get Qty',
        accessor: 'receiveValue',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Fee(%)',
        accessor: 'feePct',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: p2pTradeStatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.status)
        },
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
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })
  const [filterState, setFilterState] = useState({})

  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    setFilterState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortBy,
      filters: filters,
      type: type,
    })
    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'startTime'
          ? 'fd_' + id
          : id === 'price' || id === 'payValue' || id === 'receiveValue' || id === 'feePct'
            ? 'fn_' + id
            : id === 'sefd_'
              ? id + 'startTime'
              : id === '_id'
                ? 'fid' + id
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

    console.log('...date', reqData)
    let { success, result } = await getP2pTrade(reqData)
    if (success) {
      setLoading(false)
      //   console.log(result, 'resulty')
      setCount(result.count)
      setData(result.data)
    }
    if (!success) {
      setLoading(false)
      setCount(0)
      setData([])
    }
  }
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

    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_startTime: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      // docType["Download"]="download_option"
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.pdfData)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    } else {
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.pdfData)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    }
  }
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          fetchData={fetchPairs}
          setdateObj={setdateObj}
        />
        {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}
      </CHeader>

      <CCardBody>
        <ServerSideTable
          columns={columns}
          loading={loading}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          // setFilters={setFilters}
          filterState={filterState}
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
