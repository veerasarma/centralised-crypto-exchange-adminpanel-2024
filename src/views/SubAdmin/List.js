import React, { useMemo, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CBadge, CButton } from '@coreui/react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import ServerSideTable from '../../components/Table/ServerSide'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
//import lib
import { encryptString } from 'src/lib/cryptoJS'

//import api
import { getAdmin } from 'src/api/subadmin'

const Admin = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        // Filter: DefaultColumnFilter,
      },
      // {
      //   Header: 'Admin Id',
      //   accessor: '_id',
      //   // Filter: DefaultColumnFilter,
      // },
      {
        Header: 'Email',
        accessor: 'email',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        accessor: 'action',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <>
              <CButton
                className="edit-btn"
                size="sm"
                onClick={() => history('/update-admin/' + encryptData)}
              >
                <CIcon icon={cilPencil}></CIcon>
              </CButton>{' '}
              <CButton
                className="edit-btn"
                size="sm"
                shape="rounded-pill"
                onClick={() => history('/restriction/' + encryptData)}
              >
                Restriction
                {/* <CIcon icon={cilPencil}></CIcon> */}
              </CButton>
            </>
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

  const history = useNavigate()
  const dispatch = useDispatch()

  //function
  const fetchFaqData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
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

      const { success, result } = await getAdmin(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CButton className="add-btn" onClick={() => history('/add-admin')}>
            <CIcon icon={cilPlus}></CIcon>Add Admin
          </CButton>
        </CCardHeader>
        <CCardBody>
          <ServerSideTable
            columns={columns}
            data={data}
            fetchData={fetchFaqData}
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

Admin.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Admin
