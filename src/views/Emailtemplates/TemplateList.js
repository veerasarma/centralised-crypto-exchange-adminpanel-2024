import React, { useMemo, useState } from 'react'
import { CCard, CCardBody, CBadge, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { cilPencil } from '@coreui/icons'
import { StatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import ServerSideTable from '../../components/Table/ServerSide'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

//import lib
import { encryptString } from 'src/lib/cryptoJS'
import { capitalize } from 'src/lib/string'

//import api
import { templateList } from '../../api/emailTemplate'

const Emailtemplate = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Identifier',
        accessor: 'identifier',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Subject',
        accessor: 'subject',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Language Code',
        accessor: 'langCode',
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
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          return (
            <CButton
              className="edit-btn"
              size="sm"
              onClick={() => history('/updatetemplate/' + encryptData)}
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

  //state
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])
  const history = useNavigate()

  //function
  const fetchTemplateData = async ({ pageIndex, pageSize, filters, sortBy }) => {
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

      const { success, result } = await templateList(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {}
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchTemplateData}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  )
}

Emailtemplate.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Emailtemplate
