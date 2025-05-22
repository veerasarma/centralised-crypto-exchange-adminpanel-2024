import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import { orderXLS, orderCSV, orderPDF } from './downloader'
import DropDown from '../../components/Table/dropdown'
//import action
import { orderHistory, orderHistoryDoc } from '../../api/futures/history'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'

import { toast } from '../../redux/toast/toast.action'

const History = () => {
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
        Header: 'Refernce Id',
        accessor: '_id',
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
        Header: 'Average',
        accessor: 'averagePrice',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Price',
        accessor: 'price',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Excuted',
        accessor: 'filledQuantity',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Amount',
        accessor: 'quantity',
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
    ],
    [],
  )
  const dispatch = useDispatch()
  //status
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('pdf')
  const [filters, setFilters] = React.useState([])
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })

  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    try {
      console.log('...fetchData', filters)
      //setsetFilterState for set the filter pageindex,pageSize,sortBy in state
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
          [id === ('averagePrice' || id === 'price' || id === 'filledQuantity' || id === 'quantity')
            ? 'fn_' + id
            : id === 'orderDate'
              ? 'fd_' + id
              : id === 'sefd_'
                ? id + 'orderDate'
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
        type: type,
      }
      let { success, result, message, errors } = await orderHistory(reqData)
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
    } catch (err) {
      console.log('...errssss', err)
    }
  }
  const docType = async (type) => {
    try {
      setType(type)
      // handleDoc(type)
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

        // docType["Download"]="download_option"
        let { result, data } = await orderHistoryDoc(docType)
        if (type && type === 'pdf') {
          orderPDF(result.data)
        } else if (type && type === 'csv') {
          orderCSV(data)
        } else if (type && type === 'xls') {
          orderXLS(data)
        }
      } else {
        console.log('...docType', docType)
        let { result, data } = await orderHistoryDoc(docType)
        if (type && type === 'pdf') {
          orderPDF(result.data)
        } else if (type && type === 'csv') {
          orderCSV(data)
        } else if (type && type === 'xls') {
          orderXLS(data)
        }
      }
    } catch (err) {
      console.log('...err', err)
    }
  }
  const handleDoc = async (type) => { }
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          fetchData={fetchData}
          setdateObj={setdateObj}
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
