import React, { useState, useMemo, Fragment, useEffect } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import DropDown from '../../components/Table/dropdown'
import { orderXLS, orderCSV, orderPDF } from '../spot/downloader'
//import action
import { orderHistory, orderHistoryDoc } from '../../api/spot/history'
import { toast } from '../../redux/toast/toast.action'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import {
  DateColumnFilter,
  TradeStatusColumnFilter,
  DefaultColumnFilter,
} from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../searchDateFillter/searchDateFillter'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { decryptString } from 'src/lib/cryptoJS'
const History = () => {
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'orderDate',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.orderDate)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Reference Id',
        accessor: '_id',
        // Filter: DefaultColumnFilter,
      },
      // {
      //   Header: 'User Id',
      //   accessor: 'userId',
      //   // Filter: DefaultColumnFilter,
      // },
      {
        Header: 'Base Currency',
        accessor: 'firstCurrency',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Quote Currency',
        accessor: 'secondCurrency',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Type',
        accessor: 'orderType',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return original && capitalize(original.orderType)
        },
      },
      {
        Header: 'Side',
        accessor: 'buyorsell',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return original && capitalize(original.buyorsell)
        },
      },
      {
        Header: 'Excute price',
        accessor: 'averagePrice',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Price',
        accessor: 'Price',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          // console.log('original: ', original)
          return original.flag == true ? 'market' : original.price
        },
      },
      {
        Header: 'Filled Amount',
        accessor: 'filledQuantity',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Amount',
        accessor: 'openQuantity',
        // Filter: DefaultColumnFilter,
      },

      {
        Header: 'Total',
        accessor: 'total',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return original.averagePrice * original.filledQuantity
        },
      },
      {
        Header: 'status',
        accessor: 'status',
        Filter: TradeStatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          console.log('...statussssssssssssssssss', original.status)
          return <p>{capitalize(original.status)}</p>
        },
      },
    ],
    [],
  )
  //status
  const params = useParams()
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('pdf')
  const [filters, setFilters] = React.useState([])
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [userId, setUserId] = useState(params.userid ? params.userid : '')
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })

  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    setLoading(true)
    if (userId) {
      filters.push({ id: 'userId', value: decryptString(userId, true) })
      setUserId('')
      console.log(filters, 'UUUUUUUUUUUUUUUUUSSSSSSSSSSEEEEEEEEEEEERRRRRRRRRRRRRR')
    }
    setFilterState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortBy,
      filters: filters,
      type: type,
    })
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'averagePrice' || id === 'price' || id === 'filledQuantity' || id === 'quantity'
          ? 'fn_' + id
          : id === 'orderDate'
          ? 'fd_' + id
          : id === 'sefd_'
          ? id + 'orderDate'
          : id === '_id'
          ? 'fid' + id
          : id === 'userId'
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
      type,
    }

    console.log('..filldatee', reqData)
    let { success, result, errors } = await orderHistory(reqData)
    setLoading(false)
    if (success) {
      setCount(result.count)
      setData(result.data)
      setdownloadDisable(false)
    } else {
      setdownloadDisable(true)
      toast(
        {
          message: errors.date,
          type: 'error',
        },
        dispatch,
      )
    }
  }
  const docType = (type) => {
    setType(type)
    handleDoc(type)
  }
  const handleDoc = async (type) => {
    let docType = {
      doc: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }
    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_orderDate: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.data)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    } else {
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.data)
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
          setdateObj={setdateObj}
          fetchData={fetchData}
        />
        {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}
      </CHeader>
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          pageCount={count}
          filters={filters}
          loading={loading}
          setFilters={setFilters}
          filterState={filterState}
        />
      </CCardBody>
    </CCard>
  )
}
History.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default History
