import React, { useMemo, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CBadge } from '@coreui/react'
import { cilPlus, cilPencil } from '@coreui/icons'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

//import action
import ServerSideTable from '../../components/Table/ServerSide'
import { getCurrencyList } from '../../api/Coin/coin'

import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'

//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'
const CoinList = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Type',
        accessor: 'type',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return <p>
            {capitalize(original.type)} {original.tokenType&&`(${original.tokenType.toUpperCase()})`}
          </p>
        },
      },
      {
        Header: 'Coin',
        accessor: 'coin',
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
        accessor: 'ACTION',
        Filter: true,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => navigate('/coin-update/' + encryptData)}
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

  //state
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])

  //function
  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      setLoading(true)
      //  array of Object into object
      const fillterObj = {}
      const sortObj = {}
      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc == false ? 1 : -1 }))

      filters.forEach(({ id, value }) => Object.assign(fillterObj, { ['fs_' + id]: value }))

      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      }

      const { success, result } = await getCurrencyList(reqData)
      setLoading(false)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) { }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton className="add-btn" onClick={() => navigate('/coin-add')}>
              <CIcon icon={cilPlus}></CIcon>Add Coin
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <ServerSideTable
            columns={columns}
            data={data}
            fetchData={fetchListData}
            loading={loading}
            pageCount={count}
            filters={filters}
            setFilters={setFilters}
          />
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
