import React, { useMemo, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CImage } from '@coreui/react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
//import action
import ServerSideTable from '../../components/Table/ServerSide'
import { getListing, delListing } from '../../api/Coin/coin'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import lib
import { encryptString } from 'src/lib/cryptoJS'
const CoinList = () => {
  //state
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [filters, setFilters] = React.useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Image',
        accessor: 'symbol',
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          return (
            <CImage align="start" rounded src={config.WALLET_SERVICE.URL + '/currency/' + original.image} width={50} height={50} />

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
            <>
              <CButton
                className="edit-btn"
                size="sm"
                onClick={() => navigate('/edit-list/' + encryptData)}
              >
                {' '}
                <CIcon icon={cilPencil}></CIcon>
              </CButton>
              <CButton color="danger" size="sm">
                <CIcon icon={cilTrash}
                  onClick={() => deleteRecord(original._id, state)}
                ></CIcon>
              </CButton>
            </>
          )
        },
      },
    ],
    [],
  )

  const deleteRecord = async (recordId, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1
      let pageSize = parseInt(state.pageSize)
      let filters = state.filters
      let sortBy = state.sortBy
      let { success, message } = await delListing({ recordId })
      if (success) {
        toast(
          {
            message,
            type: 'success',
          },
          dispatch,
        ),
          fetchListData({ pageIndex, pageSize, filters, sortBy })
      }
    } catch (err) {
      console.log('err: ', err);

    }
  }

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

      const { success, result } = await getListing(reqData)
      setLoading(false)
      if (success) {
        setImgUrl(result.imageUrl)
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
            <CButton className="add-btn" onClick={() => navigate('/add-list')}>
              <CIcon icon={cilPlus}></CIcon>Add List
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
