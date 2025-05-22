import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CButton, CBadge, CCardHeader } from '@coreui/react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { cilPlus, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import action
import { List } from '../../api/Staking/staking'
//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'
const StakingList = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Staking Currency',
        accessor: 'coin',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Minimum Amount',
        accessor: 'minimumAmount',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Maximum Amount',
        accessor: 'maximumAmount',
        // Filter: DefaultColumnFilter,
      },
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
        // accessor: 'status',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => history('/edit-staking/' + encryptData)}
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
  const fetchData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'minimumAmount' || id === 'maximumAmount' || id === 'filledQuantity'
          ? 'fn_' + id
          : 'fs_' + id]: value,
      }),
    )
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result, count } = await List(reqData)
    setLoading(false)
    if (success) {
      setCount(count)
      setData(result)
    }
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton className="add-btn" onClick={() => history('/add-staking')}>
          <CIcon icon={cilPlus}></CIcon>Add Staking
        </CButton>
      </CCardHeader>
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
StakingList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default StakingList
