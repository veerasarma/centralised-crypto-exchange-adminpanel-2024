import React, { useState, useMemo } from 'react'
import { CCard, CCardBody, CButton, CCardHeader, CBadge } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil } from '@coreui/icons'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import {
  StatusColumnFilter,
  PairStatusFillter,
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { getPair } from '../../api/spot/pair'
//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'

const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Base Currency',
        accessor: 'firstCurrencySymbol',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Quote Currency',
        accessor: 'secondCurrencySymbol',
        // Filter: DefaultColumnFilter,
      },
      // {
      //   Header: 'Bot Status',
      //   accessor: 'botstatus',
      //   Filter: PairStatusFillter,
      //   Cell: ({ state, row: { original } }) => {
      //     console.log('...origibaladata', original && original.botstatus)
      //     let status =
      //       original && original.botstatus === 'off' ? 'Off' : capitalize(original.botstatus)

      //     return (
      //       <CBadge color="warning" shape="rounded-pill">
      //         {status}
      //       </CBadge>
      //     )
      //   },
      // },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: StatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let color = original.status === 'active' ? 'success' : 'danger'
          return (
            <CBadge color={color} shape="rounded-pill">
              {capitalize(original.status)}
            </CBadge>
          )
        },
      },
      {
        Header: 'Action',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => history('/edit-pair/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilPencil}></CIcon>
            </CButton>
          )
        },
      },
    ],
    [],
  )
  //status
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = React.useState([])
  const history = useNavigate()
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) => Object.assign(fillterObj, { ['fs_' + id]: value }))
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result } = await getPair(reqData)
    setLoading(false)
    if (success) {
      setCount(result.count)
      setData(result.data)
    }
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton className="add-btn" onClick={() => history('/add-pair')}>
          <CIcon icon={cilPlus}></CIcon>Add Pair
        </CButton>
      </CCardHeader>

      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          loading={loading}
          setFilters={setFilters}
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
