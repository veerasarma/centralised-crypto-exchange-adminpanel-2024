import React, { useMemo, useState, Fragment, useRef, useEffect } from 'react'

import { CCard, CCardBody, CFormLabel, CButton, CBadge, CHeader } from '@coreui/react'
import DropDown from '../../components/Table/dropdown'
import { useDispatch } from 'react-redux'
import { cilZoom } from '@coreui/icons'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import action
import { getDepositList } from '../../api/Transfer/transfer'
import { orderHistory, orderHistoryDoc } from '../../api/Transfer/history'
import { orderXLS, orderCSV, orderPDF } from './downloader'
import { toast } from '../../redux/toast/toast.action'

import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import { DepositPaymentType, DepositStatusFilter } from '../../components/Table/ServerSide/filters'
import ServerSideTable from '../../components/Table/ServerSide'

//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'

//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from '../../lib/cryptoJS'
import { momentFormat } from '../../lib/date'

//import redux
import { SET_DATE_FILLTER } from '../../redux/dateFillter/type'
const CoinList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const date = useRef({})

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
        Header: 'Transaction Id',
        accessor: 'txid',
      },
      {
        Header: 'User Id',
        accessor: 'userCode',
      },
      {
        Header: 'To Address',
        accessor: 'toAddress',
        Cell: ({ state, row: { original } }) => {
          if (original.paymentType == 'fiat_deposit') {
            return '-'
          }
          if (original.paymentType == 'coin_deposit') {
            return original.toAddress
          } else {
            return ''
          }
        },
      },
      {
        Header: 'Dest Tag',
        accessor: 'destTag',
        Cell: ({ state, row: { original } }) => {
          console.log('original: ', original);
          if (original.destTag == '') {
            return '-'
          } else {
            return original.destTag
          }
        },
      },
      {
        Header: 'Currency',
        accessor: 'coin',
      },
      {
        Header: 'Payment Type',
        accessor: 'paymentType',
        Filter: DepositPaymentType,
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.paymentType)
        },
      },
      {
        Header: 'Transfer Amount',
        accessor: 'amount',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: true,
        Cell: ({ state, row: { original } }) => {
          let color =
            original.status === 'new'
              ? 'secondary'
              : original.status === 'pending'
                ? 'warning'
                : original.status === 'completed'
                  ? 'success'
                  : 'danger'
          return (
            <CBadge color={color} shape="rounded-pill">
              {capitalize(original.status)}
            </CBadge>
          )
        },
      },
      {
        Header: 'Action',
        accessor: 'ACTION',
        Filter: true,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => navigate('/deposit/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilZoom}></CIcon>
            </CButton>
          )
        },
      },
    ],
    [],
  )
  // const d = date.current.getdate()
  // console.log('...date', date)
  //state
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('pdf')
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filterState, setFilterState] = useState({})
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })
  //function
  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    console.log('...filterArrayfilterArray4', filters, pageIndex, pageSize, sortBy)
    try {
      setFilterState({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        filters: filters,
        type: type,
      })
      setLoading(true)
      // //  array of Object into object
      const fillterObj = {}
      const sortObj = {}
      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

      filters &&
        filters.length > 0 &&
        filters.forEach(({ id, value }) =>
          Object.assign(fillterObj, {
            [id === 'createdAt'
              ? 'fd_' + id
              : id === 'amount'
                ? 'fn_' + id
                : id === 'sefd_'
                  ? id + 'createdAt'
                  : id === '_id'
                    ? 'fid' + id
                    : id === 'userId'
                      ? 'fid' + id
                        ? id == 'userCode'
                        : 'fs_' + id
                      : 'fs_' + id]: value,
          }),
        )
      setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

      let reqData = {
        page: pageIndex,
        limit: pageSize,
        fillter: fillterObj,
        sortObj: sortObj,
        type,
      }

      const { success, result, errors } = await getDepositList(reqData)
      setLoading(false)
      if (success) {
        setData(result.data)
        setCount(result.count)
        setdownloadDisable(false)
      } else {
        setData([])
        setCount(0)
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
      console.log('...err', err)
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

  // const startDateChange = (value) => {
  //   setStartDate(value)
  // }
  // const endDateChange = (value) => {
  //   setEndDate(value)
  // }
  // const handleDateFillter = async () => {
  //   try {
  //     let searchArray = []
  //     searchArray.push({
  //       id: 'sefd_',
  //       value: {
  //         startDate,
  //         endDate,
  //       },
  //     })
  //     let filters = searchArray
  //     let pageIndex = filterState.pageIndex
  //     let pageSize = filterState.pageSize
  //     let sortBy = filterState.sortBy

  //     dispatch({
  //       type: SET_DATE_FILLTER,
  //       dateFilter: {
  //         filters: filters,
  //         isDate: true,
  //       },
  //     })
  //     fetchListData({ pageIndex, pageSize, filters, sortBy })
  //   } catch (err) {
  //     console.log('...errr', err)
  //   }
  // }
  // console.log('...fillters', filterState);

  useEffect(() => { }, [])
  return (
    <>
      <CCard className="mb-4">
        <CHeader>
          <SerachDateFillter
            filterState={filterState}
            fetchData={fetchListData}
            setdateObj={setdateObj}
          />
          {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}
        </CHeader>

        <CCardBody>
          {/* <div style={{ overflow: 'auto' }}> */}
          <ServerSideTable
            columns={columns}
            data={data}
            fetchData={fetchListData}
            loading={loading}
            pageCount={count}
            // setFilterState={filterState}
            filterState={filterState}
          />
          {/* </div> */}
        </CCardBody>
      </CCard>
    </>
  )
}

CoinList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinList
