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
import {
  DepositPaymentType,
  DepositStatusFilter,
  RewardedStatus,
  RewardStatus,
} from '../../components/Table/ServerSide/filters'
import ServerSideTable from '../../components/Table/ServerSide'

//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'

//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from '../../lib/cryptoJS'
import { momentFormat } from '../../lib/date'

//import redux
import { SET_DATE_FILLTER } from '../../redux/dateFillter/type'
import { getRefferalList } from 'src/api/referral'
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
        Header: 'Referred by',
        accessor: 'parentCode',
      },
      {
        Header: 'Referred To',
        accessor: 'child_Code',
      },
      // {
      //   Header: 'Deposit Currency',
      //   accessor: 'currency',
      // },
      // {
      //   Header: 'Deposit Amount',
      //   accessor: 'amount',
      // },
      // {
      //   Header: 'Reward Currency',
      //   accessor: 'rewardCurrency',
      // },
      // {
      //   Header: 'Reward Amount',
      //   accessor: 'ust_value',
      // },

      {
        Header: 'Reward Status',
        accessor: 'rewardStatus',
        Filter: RewardedStatus,
        Cell: ({ state, row: { original } }) => {
          let color =
            original.rewardStatus === true
              ? 'success'
              : original.rewardStatus === false
              ? 'danger'
              : 'warning'
          return (
            <CBadge color={color} shape="rounded-pill">
              {original.status === true ? 'Rewarded' : 'Not Rewarded'}
            </CBadge>
          )
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: RewardStatus,
        Cell: ({ state, row: { original } }) => {
          let color =
            original.status === 'inactive'
              ? 'danger'
              : original.status === 'active'
              ? 'success'
              : 'warning'
          return (
            <CBadge color={color} shape="rounded-pill">
              {capitalize(original.status)}
            </CBadge>
          )
        },
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   Filter: DepositStatusFilter,
      //   Cell: ({ state, row: { original } }) => {
      //     let color =
      //       original.status === 'new'
      //         ? 'secondary'
      //         : original.status === 'pending'
      //         ? 'warning'
      //         : original.status === 'completed'
      //         ? 'success'
      //         : 'danger'
      //     return (
      //       <CBadge color={color} shape="rounded-pill">
      //         {capitalize(original.status)}
      //       </CBadge>
      //     )
      //   },
      // },
      {
        Header: 'Action',
        accessor: 'ACTION',
        Filter: true,
        Cell: ({ state, row: { original } }) => {
          let parentCode = encryptString(original.parentCode, true)
          let child_Code = encryptString(original.child_Code, true)

          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => navigate(`/referral-bonus/${original.parentCode}/${original.child_Code}`)}
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
              : id == 'rewardStatuss'
              ? 'fib_' + id
                ? id == 'child_Code' || id == 'parentCode'
                : 'fs_' + id
              : 'fs_' + id]: value,
          }),
        )
      console.log(fillterObj, 'fillterObj123')
      setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

      let reqData = {
        page: pageIndex,
        limit: pageSize,
        fillter: fillterObj,
        sortObj: sortObj,
        type,
      }

      const { success, result, errors } = await getRefferalList(reqData)
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
      let { result, data } = await getRefferalList(docType)
      if (type && type === 'pdf') {
        orderPDF(result.pdfData)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    } else {
      let { result, data } = await getRefferalList(docType)
      if (type && type === 'pdf') {
        orderPDF(result.pdfData)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    }
  }

  useEffect(() => {}, [])
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
