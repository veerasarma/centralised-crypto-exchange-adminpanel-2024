import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilPlus } from '@coreui/icons'

//import compoent
import ServerSideTable from '../../components/Table/ServerSide'

//import api
import { getUserAssetApi, getSingleUserApi } from '../../api/user'

//import lib
import { decryptString } from '../../lib/cryptoJS'
import { convert } from '../../lib/convert'
import Modal from './Modal'
import { useEffect } from 'react'

const UserAssetList = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [dispModal, setDispModal] = useState('')
  const [show, setShow] = useState(false)
  const [modalCurrency, setModalCurrency] = useState('')
  const [keys, setKeys] = useState(Math.random())

  const columns = useMemo(
    () => [
      {
        Header: 'Currency',
        accessor: 'coin',
        Filter: false,
      },
      {
        Header: 'Spot Balance',
        accessor: 'spotBal',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          return convert(original.spotBal)
        }
      },
      {
        Header: 'Future Balance',
        accessor: 'derivativeBal',
        Filter: false,
      },
      {
        Header: 'Inverse Balance',
        accessor: 'inverseBal',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          return convert(original.inverseBal)
        }
      },
      {
        Header: ' ',
        Cell: ({ state, row: { original } }) => {
          return (
            <div className="d-flex justify-content-start">
              <CButton
                onClick={() => {
                  console.log(original._id)
                  setDispModal('Deposit')
                  setModalCurrency(String(original._id))
                  setShow(true)
                }}
              >
                Deposit
              </CButton>
              <CButton
                onClick={() => {
                  console.log(original)
                  setDispModal('Withdraw')
                  setModalCurrency(original._id)
                  setShow(true)
                }}
              >
                Withdraw
              </CButton>
            </div>
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
  const [UserData, setUserData] = useState({})

  const onHide = () => {
    setShow(false)
    // setDispModal('')
    // setModalUser('')
    setKeys(Math.random())
  }
  //fuunction

  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {

      setLoading(true)
      //  array of Object into object
      const fillterObj = {}
      const sortObj = {}

      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc == false ? 1 : -1 }))

      filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, { [id == 'createdAt' ? 'fd_' + id : 'fs_' + id]: value }),
      )

      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
        userId: decryptString(params.id, true),
      }
      console.log('...fitterobj', fillterObj)
      const { success, result } = await getUserAssetApi(reqData)
      if (success) {
        setLoading(false)

        console.log('...result', result)
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) { }
  }

  const fetchUserData = async () => {
    try {
      setLoading(true)
      let Id = decryptString(params.id, true)
      const { success, result } = await getSingleUserApi(Id)
      if (success) {
        setLoading(false)
        console.log('1232332', result)
        setUserData(result)
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    if (params && params.id) {
      fetchUserData()
    }
  }, [params])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton className="add-btn" onClick={() => navigate('/userList')}>
            <CIcon icon={cilArrowLeft}></CIcon> Back
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <ServerSideTable
          key={keys}
          columns={columns}
          data={data}
          fetchData={fetchListData}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
      {show && (
        <Modal
          onHide={onHide}
          show={show}
          user={decryptString(params.id, true)}
          assetId={modalCurrency}
          type={dispModal}
          UserData={UserData}
        />
      )}
    </CCard>
  )
}

UserAssetList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default UserAssetList
