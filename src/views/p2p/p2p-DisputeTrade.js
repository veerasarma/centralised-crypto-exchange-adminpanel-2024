import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CButton, CFormLabel } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { encryptString } from 'src/lib/cryptoJS'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
//import action
import { getP2pTradeDispute } from '../../api/p2p/pair'
//lib
import { momentFormat } from '../../lib/date'
import { capitalize } from '../../lib/string'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
const P2pDisputeTrade = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date & Time',
        accessor: 'disputeDate',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              {/* <CDateRangePicker /> */}

              <CFormLabel>{momentFormat(original.disputeDate)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'OrderId',
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
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.side)
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ state, row: { original } }) => {
          return capitalize(original.status)
        },
      },
      {
        Header: 'Action',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original.orderId, true)
          return (
            <CButton
              color="secondary"
              size="sm"
              onClick={() => history('/p2p-orderView/' + encryptData)}
            >
              {' '}
              {original.status === 'dispute' && <CIcon icon={cilPencil}></CIcon>}
              {original.status === 'disputed' && <CIcon icon={cilPencil}></CIcon>}
            </CButton>
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
  const [filters, setFilters] = React.useState([])
  const history = useNavigate()
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'disputeDate' ? 'fd_' + id : 'fs_' + id]: value,
      }),
    )
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result } = await getP2pTradeDispute(reqData)
    if (success) {
      setLoading(false)
      console.log(result, 'resulty')
      setCount(result.count)
      setData(result.data)
    }
    if (!success) {
      setLoading(false);
      setCount(0);
      setData([]);
    }
  }
  return (
    <CCard className="mb-4">
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
P2pDisputeTrade.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default P2pDisputeTrade
