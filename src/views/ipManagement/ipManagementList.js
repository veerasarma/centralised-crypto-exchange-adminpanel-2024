import React, { Fragment, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CCard, CCardBody, CButton, CFormLabel, CCardHeader } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import PropTypes from 'prop-types'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'

//import api
import { getIpList, deleteIpAddress } from '../../api/common'

//import lib
import { momentFormat } from '../../lib/date'
//import action
import { toast } from '../../redux/toast/toast.action'

import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'

const UserList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const columns = useMemo(
    () => [
      {
        Header: 'Create Date',
        accessor: 'createdAt',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
            </Fragment>
          )
        },
      },

      {
        Header: 'Ip Address',
        accessor: 'ip',
      },

      {
        Header: 'Action',
        accessor: 'ACTION',
        Filter: true,
        Cell: ({ state, row: { original } }) => {
          return (
            <CButton color="secondary" size="sm" onClick={() => deleteIp(state, original._id)}>
              {' '}
              <CIcon icon={cilTrash}></CIcon>
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

  //fuunction

  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      setLoading(true)
      //   //  array of Object into object
      const fillterObj = {}
      const sortObj = {}
      sortBy &&
        sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc == false ? 1 : -1 }))

      filters &&
        filters.length > 0 &&
        filters.forEach(({ id, value }) =>
          Object.assign(fillterObj, { [id == 'createdAt' ? 'fd_' + id : 'fs_' + id]: value }),
        )
      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      }
      console.log('...fitterobj', fillterObj)
      const { success, result } = await getIpList(reqData)
      console.log('...result', result)
      if (success) {
        setLoading(false)
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }
  const deleteIp = async (state, id) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)
      let data = {
        id: id,
      }
      const { success, message } = await deleteIpAddress(data)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchListData({ pageIndex, pageSize })
      }
    } catch (err) {}
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton className="add-btn" onClick={() => navigate('/addIpAddress')}>
            <CIcon icon={cilPlus}></CIcon>Add IpAddress
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
  )
}

UserList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default UserList
