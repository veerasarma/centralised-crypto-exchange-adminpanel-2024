import React, { useEffect, useMemo, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

// import component
import ServerSideTable from '../../components/Table/serverTableFillter'

// import api
import { getAllUserApi } from '../../api/user'

const Author = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNo',
      },
    ],
    [],
  )

  // state
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [data, setData] = useState([])

  // function
  const fetchListData = async ({ pageSize, pageIndex, filters }) => {
    console.log('---filters---fetchListData', filters)
    let reqData = {
      page: pageIndex + 1,
      limit: pageSize,
    }
    try {
      const { success, result } = await getAllUserApi(reqData)
      console.log('fetchListDatafetchListDatafetchListData', result)

      if (success) {
        setData(result.data)
        setPageCount(Math.ceil(result.count / pageSize))
      }
    } catch (err) {}
  }

  const handleStatus = async (reqData, state) => {
    try {
      // const { status, result } = await changeStatus(reqData)
      // if (status == 'success') {
      //   fetchListData(state)
      // }
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
          pageCount={pageCount}
        />
      </CCardBody>
    </CCard>
  )
}

Author.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  state: PropTypes.any,
  row: PropTypes.any,

  //   renderRowSubComponent: PropTypes.func.isRequired,
}

export default Author
