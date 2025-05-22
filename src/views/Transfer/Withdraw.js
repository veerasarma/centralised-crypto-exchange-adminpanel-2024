import React, { useMemo, useState, Fragment } from 'react'
import { CCard, CCardBody, CButton, CBadge, CFormLabel, CHeader } from '@coreui/react'
import { cilZoom } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import DropDown from '../../components/Table/dropdown'
//import action
import { getWithdrawList } from '../../api/Transfer/transfer'
import { toast } from '../../redux/toast/toast.action'

//import component
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import { StatusColumnFilter, WithdrawPaymentType } from '../../components/Table/ServerSide/filters'
import ServerSideTable from '../../components/Table/ServerSide'

import { orderHistory, withdarwHistoryDoc } from '../../api/Transfer/history'
import { withdrawCSV, withdrawXLS, WithdrawPDF } from './downloader'
//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'
import { momentFormat } from '../../lib/date'

//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'
import { DefaultColumnFilter } from 'src/components/Table/ServerSide/filters'

const CoinList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        Header: 'Reference Id',
        accessor: '_id',
      },
      {
        Header: 'User Id',
        accessor: 'userCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'To Address/Account',
        accessor: 'toAddress',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          if (original.paymentType === 'fiat_withdraw') {
            return original.bankDetail && original.bankDetail.accountNo
              ? original.bankDetail.accountNo
              : ''
          }
          if (original.paymentType === 'coin_withdraw') {
            return original.toAddress
          } else {
            return ''
          }
        },
      },
      {
        Header: 'Currency',
        accessor: 'coin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Payment Type',
        accessor: 'paymentType',
        Filter: WithdrawPaymentType,
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.paymentType)
        },
      },
      {
        Header: 'Transfer Amount',
        accessor: 'actualAmount',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: StatusColumnFilter,
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
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return original.paymentType === 'coin_withdraw' ? (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => navigate('/coin-withdraw/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilZoom}></CIcon>
            </CButton>
          ) : original.paymentType === 'fiat_withdraw' ? (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => navigate('/fiat-withdraw/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilZoom}></CIcon>
            </CButton>
          ) : null
        },
      },
    ],
    [],
  )

  //state
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('pdf')
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })

  //function
  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    try {
      // console.log('...filterArrayfilterArray4', filters, pageIndex, pageSize, sortBy)
      setLoading(true)
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
          [id === 'createdAt'
            ? 'fd_' + id
            : id === 'actualAmount'
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
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
        type: type,
      }

      const { success, result, errors } = await getWithdrawList(reqData)
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
    } catch (err) {}
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
      let { result, data } = await withdarwHistoryDoc(docType)
      if (type && type === 'pdf') {
        WithdrawPDF(result.pdfData)
      } else if (type && type === 'csv') {
        withdrawCSV(data)
      } else if (type && type === 'xls') {
        withdrawXLS(data)
      }
    } else {
      let { result, data } = await withdarwHistoryDoc(docType)
      if (type && type === 'pdf') {
        WithdrawPDF(result.pdfData)
      } else if (type && type === 'csv') {
        withdrawCSV(data)
      } else if (type && type === 'xls') {
        withdrawXLS(data)
      }
    }
  }

  return (
    <>
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
          <div>
            <ServerSideTable
              columns={columns}
              data={data}
              fetchData={fetchData}
              loading={loading}
              pageCount={count}
              setFilterState={filterState}
              filterState={filterState}
            />
          </div>
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
