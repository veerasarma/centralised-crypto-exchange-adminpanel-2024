import React, { useMemo, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CBadge, CButton } from '@coreui/react'
import { cilPlus, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { cilPencil } from '@coreui/icons'
import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import ServerSideTable from '../../components/Table/ServerSide'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

//import lib
import { encryptString } from 'src/lib/cryptoJS'
import { capitalize } from 'src/lib/string'

//import api
import { getCategoryList, DeleteCategory } from '../../api/faqCategory'
import { toastAlert } from 'src/lib/toastAlert'

const Category = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Category Name',
        accessor: 'name',
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
                onClick={() => history('/updatecategory/' + encryptData)}
              >
                <CIcon icon={cilPencil}></CIcon>
              </CButton>{' '}
              <CButton color="danger" size="sm" onClick={() => deleteRecord(original, state)}>
                <CIcon icon={cilTrash}></CIcon>
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
  const fetchCategoryData = async ({ pageIndex, pageSize, filters, sortBy }) => {
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

      const { success, result } = await getCategoryList(reqData)
      // console.log(result, 'result')
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }
  const toastAlert = (message, type) => {
    toast(
      {
        message: message,
        type: type,
      },
      dispatch,
    )
  }

  const deleteRecord = async (record, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)
      let filters = state.filters
      let sortBy = state.sortBy

      let data = {
        id: record._id,
      }
      const { success, message } = await DeleteCategory(data)
      if (success) {
        toastAlert(message, 'success')

        fetchCategoryData({ pageIndex, pageSize, filters, sortBy })
      } else {
      }
    } catch (err) {}
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton className="add-btn" onClick={() => history('/addcategory')}>
          <CIcon icon={cilPlus}></CIcon>Add Faq Category
        </CButton>
      </CCardHeader>
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchCategoryData}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  )
}

Category.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Category
