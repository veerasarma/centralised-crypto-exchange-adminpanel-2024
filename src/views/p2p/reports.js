import React, { useState, useMemo, Fragment } from 'react'
import { CBadge, CButton, CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import PropTypes from 'prop-types'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import DropDown from '../../components/Table/dropdown'
//import action
import { getP2pReports } from '../../api/p2p/pair'
import { orderHistory, orderHistoryDoc, reportHistoryDoc } from '../../api/p2p/history'
import { reportXLS, reportCSV, reportPDF } from './downloader'
//lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import {
  DateColumnFilter,
  p2pReportStatusColumnFilter,
  p2pTradeStatusColumnFilter,
} from '../../components/Table/ServerSide/columnFillter'
//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom';

const Pairs = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        Header: 'Date & Time',
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
        Header: 'Reference Id',
        accessor: '_id',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Reported On',
        accessor: 'reportOnCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Reported By',
        accessor: 'reportedByCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Order ID',
        accessor: 'orderCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Reason',
        accessor: 'reason',
        // Filter: false,
        Cell: ({ state, row: { original } }) => {
            return (
                <Fragment>
                    <CFormLabel>{original.reason.slice(0, 15)}...</CFormLabel>
                </Fragment>
            )
        }
      },
      {
        Header: 'Description',
        accessor: 'description',
        // Filter: false,
        Cell: ({ state, row: { original } }) => {
            return (
                <Fragment>
                    <CFormLabel>{original.description.slice(0, 15)}...</CFormLabel>
                </Fragment>
            )
        }
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action Took On',
        accessor: 'actionTakenOn',
        Filter: DateColumnFilter,
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
            return (
                <Fragment>
                    <CFormLabel>{original.actionTakenOn ? momentFormat(original.actionTakenOn): '-'}</CFormLabel>
                </Fragment>
            )
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: p2pReportStatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.status)
        },
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        accessor: '',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          return (
          <Fragment>
            <CButton onClick={() => navigate(`/report/${original._id}`)}>
                <CIcon icon={cilPencil}></CIcon>
            </CButton>
          </Fragment>
          )
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
    let { success, result } = await getP2pReports(reqData)
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
      let { result, data } = await reportHistoryDoc(docType)
      if (type && type === 'pdf') {
        reportPDF(result.pdfData)
      } else if (type && type === 'csv') {
        reportCSV(data)
      } else if (type && type === 'xls') {
        reportXLS(data)
      }
    } else {
      let { result, data } = await reportHistoryDoc(docType)
      if (type && type === 'pdf') {
        reportPDF(result.pdfData)
      } else if (type && type === 'csv') {
        reportCSV(data)
      } else if (type && type === 'xls') {
        reportXLS(data)
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
