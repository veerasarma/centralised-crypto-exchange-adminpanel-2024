import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CCard, CCardBody, CFormLabel, CBadge, CTooltip, CInputGroupText } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilBan, cilLockLocked, cilLockUnlocked, cilSend, cilMoney } from '@coreui/icons'
import PropTypes from 'prop-types'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'

//import api
import { getAllUserApi, resendMailApi, disable2FaApi, userLockStatus } from '../../api/user'

//import lib
import { isEmpty } from '../../lib/validate'
import { momentFormat } from '../../lib/date'
import { capitalize } from '../../lib/string'
import { encryptString } from '../../lib/cryptoJS'

import {
  DateColumnFilter,
  SelectColumnFilter,
  StatusColumnFilter,
  UserSatusFillter,
} from '../../components/Table/ServerSide/columnFillter'

//import action
import { toast } from '../../redux/toast/toast.action'

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
        Header: 'User Id',
        accessor: 'userId',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Email Status',
        accessor: 'emailStatus',
        Filter: UserSatusFillter,
        Cell: ({ state, row: { original } }) => {
          if (original.emailStatus == 'unverified') {
            return (
              <CBadge color="danger" shape="rounded-pill">
                {capitalize(original.emailStatus)}
              </CBadge>
            )
          } else {
            return (
              <CBadge color="success" shape="rounded-pill">
                {capitalize(original.emailStatus)}
              </CBadge>
            )
          }
        },
      },
      {
        Header: 'Phone Number Status',
        accessor: 'phoneStatus',
        Filter: UserSatusFillter,

        Cell: ({ state, row: { original } }) => {
          if (original.phoneStatus == 'unverified') {
            return (
              <CBadge color="danger" shape="rounded-pill">
                {capitalize(original.phoneStatus)}
              </CBadge>
            )
          } else {
            return (
              <CBadge color="success" shape="rounded-pill">
                {capitalize(original.phoneStatus)}
              </CBadge>
            )
          }
        },
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNo',
      },

      {
        Header: 'Google2Fa',
        accessor: 'google2Fa.secret',
        Filter: SelectColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let reqData = {
            id: original._id,
          }
          if (original.google2Fa && !isEmpty(original.google2Fa.secret)) {
            return (
              <Fragment>
                <CBadge color="success" shape="rounded-pill">
                  {'Enabled'}
                </CBadge>{' '}
                <CTooltip content="click here to disable if user enable 2FA" placement="top">
                  <a href="#">
                    <CIcon icon={cilBan} onClick={() => disable2FA(reqData, state)}></CIcon>
                  </a>
                </CTooltip>
              </Fragment>
            )
          } else {
            return (
              <CBadge color="info" shape="rounded-pill">
                {'Disabled'}
              </CBadge>
            )
          }
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: UserSatusFillter,
        Cell: ({ state, row: { original } }) => {
          // let status = original && original.status == 'unverified' ? 'Unverified' : 'Verified'
          let status
          let reqData = {
            _id: original._id,
            email: original.email,
          }

          original && original.status == 'unverified'
            ? (status = (
                <CTooltip content="Click here to send email to unverified user" placement="top">
                  <a href="#">
                    <CIcon icon={cilSend} onClick={() => activateMailSend(reqData, state)}></CIcon>
                  </a>
                </CTooltip>
              ))
            : (status = (
                <CBadge color="success" shape="rounded-pill">
                  {capitalize(original && original.status)}{' '}
                </CBadge>
              ))
          return status
        },
      },
      {
        Header: 'User Asset ',
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CTooltip content="Click here to view user's Asset details" placement="top">
              <a href="#">
                <CIcon
                  icon={cilMoney}
                  onClick={() => navigate('/userAsset/' + encryptData)}
                ></CIcon>
              </a>
            </CTooltip>
          )
        },
      },
      {
        Header: 'Action',
        accessor: 'userLocked',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          let reqData = {
            id: original._id,
          }

          if (original.userLocked == 'false') {
            return (
              <Fragment>
                <a href="#">
                  <CInputGroupText>
                    <CTooltip content="Locked User's Account" placement="top">
                      <CIcon
                        icon={cilLockUnlocked}
                        onClick={() => handleLocked(reqData, state)}
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a>
              </Fragment>
            )
          } else {
            return (
              <a href="#">
                <CInputGroupText>
                  <CTooltip content="UnLocked User's Account" placement="top">
                    <CIcon
                      icon={cilLockLocked}
                      onClick={() => handleLocked(reqData, state)}
                    ></CIcon>
                  </CTooltip>
                </CInputGroupText>
              </a>
            )
          }
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
  const [test, setTest] = useState(false)

  //fuunction

  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      console.log('...filtters', filters)
      //  array of Object into object
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
      const { success, result } = await getAllUserApi(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }
  const activateMailSend = async (reqData, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)

      const { success, message } = await resendMailApi(reqData)
      if (success) {
        setTest(true)
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchListData({ pageIndex, pageSize })
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      }
    } catch (err) {}
  }

  const disable2FA = async (reqData, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)

      const { success, message, error, errors } = await disable2FaApi(reqData)
      console.log('...message', message, success, error, errors)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchListData({ pageIndex, pageSize })
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      }
    } catch (err) {}
  }
  const handleLocked = async (reqData, state) => {
    try {
      console.log('----state', state)
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)
      const { success, message } = await userLockStatus(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchListData({ pageIndex, pageSize })
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
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
          tt={test}
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
