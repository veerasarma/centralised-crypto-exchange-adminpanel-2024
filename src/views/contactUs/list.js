import React, { useState, useMemo } from 'react'
import { CCard, CCardBody, CButton, CCardHeader, CBadge } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPaperPlane } from '@coreui/icons'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import { SelectColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import action
import { cotactusList } from '../../api/contactUs'
//import lib
import { encryptString } from 'src/lib/cryptoJS'

const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'name',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'User Email',
        accessor: 'email',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Message',
        accessor: 'message',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          console.log('original: ', original);
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => history('/reply-user/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilPaperPlane}></CIcon>
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
  const [filterState, setFilterState] = useState({})
  const history = useNavigate()
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    setFilterState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortBy,
      filters: filters,
    })

    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) => Object.assign(fillterObj, { ['fs_' + id]: value }))
    setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }
    console.log('...counttttttttttttttt', reqData)
    let { success, result } = await cotactusList(reqData)
    setLoading(false)
    if (success) {
      setCount(result.count)
      setData(result.data)
    }
  }
  return (
    <CCard className="mb-4">
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          loading={loading}
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
