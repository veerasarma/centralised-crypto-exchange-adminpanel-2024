import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'

//import api
import { getAllUserApi } from '../../../api/user'
//import compoent
// import ServerSideTable from '../../components/Table/ServerSide'
import ServerSideTable from '../reactTable/serverTable'

const UserList = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNo',
        // Filter: SelectColumnFilter,
      },
    ],
    [],
  )
  //state

  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])

  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      console.log('...aaaa', sortBy)
      //  array of Object into object
      const fillterObj = {}
      const sortObj = {}

      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc == false ? 1 : -1 }))

      filters.forEach(({ id, value }) => Object.assign(fillterObj, { ['fs_' + id]: value }))
      console.log('...sortObj', sortObj)
      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      }

      const { success, result } = await getAllUserApi(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }
  return (
    <CCard className="mb-4">
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
  )
}

export default UserList
