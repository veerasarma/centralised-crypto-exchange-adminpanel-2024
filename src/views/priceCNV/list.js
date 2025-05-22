import React, { useState, useMemo } from 'react'
import { CCard, CCardBody, CButton, CBadge } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import { SelectColumnFilter } from '../../components/Table/ServerSide/columnFillter'
//import action
import { getList } from '../../api/priceCnv'
//import lib
import { capitalize } from '../../lib/string'
import { encryptString } from 'src/lib/cryptoJS'

const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Base Symbol',
        accessor: 'baseSymbol',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Convert Symbol',
        accessor: 'convertSymbol',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Convert Price',
        accessor: 'convertPrice',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => history('/edit-cnv/' + encryptData)}
            >
              {' '}
              <CIcon icon={cilPencil}></CIcon>
            </CButton>
          )
        },
      },
    ],
    [],
  )
  //status
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = React.useState([])
  const history = useNavigate()
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    setLoading(true)
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, { [id === 'convertPrice' ? 'fn_' + id : 'fs_' + id]: value }),
    )
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result } = await getList(reqData)
    setLoading(false)
    if (success) {
      setCount(result.count)
      setData(result.data)
    }
  }
  return (
    <CCard className="mb-4">
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          loading={loading}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  )
}
Pairs.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Pairs
