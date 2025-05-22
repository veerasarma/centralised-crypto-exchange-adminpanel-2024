import React, { useMemo, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CBadge } from '@coreui/react'
import { cilPlus, cilPencil } from '@coreui/icons'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

//import action
import ServerSideTable from '../../components/Table/ServerSide'
import { getCommisssion } from '../../api/Commission/commission'

import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'
 
//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'
const CoinList = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Coin',
        accessor: 'coin',
      },
      {
        Header: 'Fee',
        accessor: 'fee',
      },
      {
        Header: 'Converted_Fee',
        accessor: 'convert_INR',
      },
    ],
    [],
  )

  //state
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])

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

      const { status, result } = await getCommisssion(reqData)
      setLoading(false)
      if (status) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }

  return (
    <>
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
    </>
  )
}

CoinList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinList
