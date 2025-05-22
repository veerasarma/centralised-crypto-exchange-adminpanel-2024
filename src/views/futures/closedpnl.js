import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import { closedPnlXLS, closedPnlCSV, closedPnlPDF } from './downloader'
import DropDown from '../../components/Table/dropdown'
//import action
import { orderHistory, orderHistoryDoc } from '../../api/futures/history'
//import lib
import { momentFormat } from '../../lib/date'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../searchDateFillter/searchDateFillter'

import { toast } from '../../redux/toast/toast.action'

const History = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'createdAt',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'User Id',
        accessor: 'userCode',
      },
      {
        Header: 'Contracts',
        accessor: 'symbol',
      },
      {
        Header: 'Amount',
        accessor: 'quantity',
      },
      {
        Header: 'Entry Price',
        accessor: 'entryPrice',
      },
      {
        Header: 'Open Time',
        accessor: 'openAt',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.openAt)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Close Price',
        accessor: 'exitPrice',
      },
      {
        Header: 'Close Time',
        accessor: 'closedAt',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.openAt)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Realized PNL',
        accessor: 'pnl',
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

      filters.length > 0 && filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, {
          [id === 'quantity' || id === 'entryPrice' || id === 'exitPrice' || id === 'pnl'
            ? 'fn_' + id
            : id === 'createdAt' || id === 'openAt' || id === 'closedAt'
              ? 'fd_' + id
              : id === 'sefd_'
                ? id + 'createdAt'
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
          sefd_createdAt: {
            startDate: dateObj.startDate,
            endDate: dateObj.endDate,
          },
        }

        // docType["Download"]="download_option"
        let { result, data } = await orderHistoryDoc(docType)
        if (type && type === 'pdf') {
          closedPnlPDF(result.data)
        } else if (type && type === 'csv') {
          closedPnlCSV(data)
        } else if (type && type === 'xls') {
          closedPnlXLS(data)
        }
      } else {
        console.log('...docType', docType)
        let { result, data } = await orderHistoryDoc(docType)
        if (type && type === 'pdf') {
          closedPnlPDF(result.data)
        } else if (type && type === 'csv') {
          closedPnlCSV(data)
        } else if (type && type === 'xls') {
          closedPnlXLS(data)
        }
      }
    } catch (err) {
      console.log('...err', err)
    }
  }
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          fetchData={fetchData}
          setdateObj={setdateObj}
        />
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
