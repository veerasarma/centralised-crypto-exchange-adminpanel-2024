import React, { useMemo, useState } from 'react'
import { CCard, CButton, CCardBody, CBadge, CFormLabel } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { cilSend } from '@coreui/icons'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'
import ServerSideTable from '../../components/Table/ServerSide'
import { SupportStatusColumnFilter } from '../../components/Table/ServerSide/columnFillter'

//import lib
import { encryptString } from 'src/lib/cryptoJS'
import { capitalize } from 'src/lib/string'
import { momentFormat } from 'src/lib/date'

//import api
import { getTicketList } from '../../api/support'

const Ticket = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'Ticket ID',
        accessor: 'tickerId',
      },
      // {
      //   Header: 'Email',
      //   accessor: 'userEmail',
      // },
      // {
      //   Header: 'User Name',
      //   accessor: 'userName',
      // },
      {
        Header: 'UserId',
        accessor: 'userCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Category Name',
        accessor: 'categoryName',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SupportStatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          // console.log(original,'orginal')
          let color = original.status === 'open' ? 'success' : 'danger'
          return (
            <CBadge color={color} shape="rounded-pill">
              {capitalize(original.status)}
            </CBadge>
          )
        },
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ state, row: { original } }) => {
          return <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
        },
        Filter: DateColumnFilter,
      },
      {
        Header: 'Action',
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true)
          if (role != "superadmin" && restricdata?.edit == false) {
            return <>-</>;
          } else {
            return (
              <CButton
                className="edit-btn"
                size="sm"
                variant="outline"
                onClick={() => history('/support-reply/' + encryptData)}
              >
                {' '}
                <CIcon icon={cilSend}></CIcon>
              </CButton>
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
  const history = useNavigate()

  //redux
  let { restriction, role } = useSelector((state) => state.role);
  let restricdata =
    restriction &&
    restriction.length > 0 &&
    restriction.find((el) => el.name == "Support");

  //function
  const fetchTicket = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
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
      }
      const { success, result } = await getTicketList(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }
  return (
    <CCard className="mb-4">
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchTicket}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  )
}

Ticket.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Ticket
