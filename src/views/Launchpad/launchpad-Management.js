import React, { useState, useMemo, Fragment } from 'react'
import { CCard, CCardBody, CButton, CCardHeader, CBadge, CFormLabel } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil } from '@coreui/icons'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'
import {
  StatusColumnFilter,
  DateColumnFilter,
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { getLaunchpad } from '../../api/Launchpad/launchpadController'
//import lib
import { momentFormat } from '../../lib/date'
import { encryptString } from 'src/lib/cryptoJS'
const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Start Date',
        accessor: 'startTimeStamp',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              {/* <CDateRangePicker /> */}

              <CFormLabel>{momentFormat(original.startTimeStamp)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'End Date',
        accessor: 'endTimeStamp',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              {/* <CDateRangePicker /> */}

              <CFormLabel>{momentFormat(original.endTimeStamp)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Token Name',
        accessor: 'name',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Industry',
        accessor: 'industry',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Website',
        accessor: 'website',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              color="secondary"
              size="sm"
              onClick={() => history('/edit-launchpad/' + encryptData)}
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
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState()
  const [filters, setFilters] = React.useState([])
  const history = useNavigate()
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    //  array of Object into object
    setLoading(true)
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))
    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'startTimeStamp' || id === 'endTimeStamp' ? 'fd_' + id : 'fs_' + id]: value,
      }),
    )
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    }

    let { success, result } = await getLaunchpad(reqData)
    if (success) {
      setLoading(false)
      console.log(data, 'resulty')
      setCount(result.count)
      setData([...result.data])
    }
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton className="add-btn" onClick={() => history('/add-launchpad')}>
          <CIcon icon={cilPlus}></CIcon>Add launchpad
        </CButton>
      </CCardHeader>

      <CCardBody>
        <ServerSideTable
          columns={columns}
          loading={loading}
          data={data}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
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
