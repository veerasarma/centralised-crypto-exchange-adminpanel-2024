import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import DropDown from '../../components/Table/dropdown'
import { tradeXLS, tradeCSV, tradePDF } from './downloader'
//import action
import { tradeHistory, tradeHistoryDoc, tradeUserHistory } from '../../api/spot/history'
import { toast } from '../../redux/toast/toast.action'

//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'
import { decryptString } from 'src/lib/cryptoJS'
import { useParams } from 'react-router-dom'
const History = () => {
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'createdAt',
        Filter: DateColumnFilter,
        maxWidth: 70,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
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
        Header: 'Buyer ID',
        accessor: 'buyUserId',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Seller ID',
        accessor: 'sellUserId',
        // Filter: DefaultColumnFilter,
      },
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
        Header: 'Side',
        accessor: 'buyorsell',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return original && original.isMaker == 'buy' ? 'Sell' : 'Buy'
        },
      },
      {
        Header: 'Excuted',
        accessor: 'quantity',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Total',
        accessor: 'orderValue',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Buy Fee',
        accessor: 'buyerFee',
        // Filter: DefaultColumnFilter,
        // Cell: ({ state, row: { original } }) => {
        //   return original.averagePrice * original.filledQuantity
        // },
      },
      {
        Header: 'Sell Fee',
        accessor: 'sellerFee',
        // Filter: DefaultColumnFilter,
        // Cell: ({ state, row: { original } }) => {
        //   return original.averagePrice * original.filledQuantity
        // },
      },
    ],
    [],
  )
  //status
  const params = useParams()
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [type, setType] = useState('pdf')
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = React.useState([])
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [userId, setUserId] = useState(params.userid ? params.userid : '')
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })
  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    setLoading(true)
    if (userId) {
      filters.push({ id: 'buyUserId', value: decryptString(userId, true) })
      filters.push({ id: 'sellUserId', value: decryptString(userId, true) })
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
        [id === 'price' || id === 'filledQuantity' || id === 'orderValue' || id === 'Fee'
          ? 'fn_' + id
          : id === 'createdAt'
          ? 'fd_' + id
          : id === 'sefd_'
          ? id + 'createdAt'
          : id === '_id'
          ? 'fid' + id
          : 'fs_' + id]: value,
      }),
    )
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
      type,
    }
    setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

    let { success, result, errors } = await tradeUserHistory(reqData)
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
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }
    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await tradeHistoryDoc(docType)
      console.log('...data', data, result)
      if (type && type === 'pdf') {
        tradePDF(result.data)
      } else if (type && type === 'csv') {
        tradeCSV(data,type)
      } else if (type && type === 'xls') {
        tradeCSV(data,type)
      }
    } else {
      let { result, data } = await tradeHistoryDoc(docType)
      if (type && type === 'pdf') {
        tradePDF(result.data)
      } else if (type && type === 'csv') {
        tradeCSV(data,type)
      } else if (type && type === 'xls') {
        tradeCSV(data,type)
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
        {/* {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />} */}
      </CHeader>
      <CCardBody>
        <div style={{ overflow: 'auto' }}>
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
        </div>
      </CCardBody>
    </CCard>
  )
}
History.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default History
