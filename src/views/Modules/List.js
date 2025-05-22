import React, { useMemo, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CBadge, CButton } from '@coreui/react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import ServerSideTable from '../../components/Table/ServerSide'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import lib
import { capitalize } from 'src/lib/string'
import { encryptString } from 'src/lib/cryptoJS'

//import api
import { getModulesList, DeleteModule } from 'src/api/modules'

const List = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Module Name',
        accessor: 'pagename',
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
        accessor: 'action',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <>
              <CButton
                className="edit-btn"
                size="sm"
                onClick={() => history('/update-modules/' + encryptData)}
              >
                <CIcon icon={cilPencil}></CIcon>
              </CButton>{' '}
              <CButton color="danger" size="sm">
                <CIcon icon={cilTrash} onClick={() => deleteRecord(original, state)}></CIcon>
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

      const { success, result } = await getModulesList(reqData)
      // console.log(result, 'result')
      if (success) {
        setLoading(false)
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }

  const deleteRecord = async (record, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)
      let filters = state.filters
      let sortBy = state.sortBy

      let data = { id: record._id }
      const { success, message } = await DeleteModule(data)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchFaqData({ pageIndex, pageSize, filters, sortBy })
      } else {
      }
    } catch (err) {}
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CButton className="add-btn" onClick={() => history('/add-modules')}>
            <CIcon icon={cilPlus}></CIcon>Add module
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

List.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default List
