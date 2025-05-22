import React, { Fragment, useMemo, useState } from 'react'

import DropDown from '../../components/Table/dropdown'

import PropTypes from 'prop-types'
import {
  CCard,
  CCardBody,
  CFormLabel,
  CBadge,
  CTooltip,
  CInputGroupText,
  CHeader,
} from '@coreui/react'
//import compoent
import ServerSideTable from '../../components/Table/ServerSide'

//import api
import { loginHistoryApi } from '../../api/common'
import { orderXLS, orderCSV, orderPDF } from './downloader'
//import lib
import { momentFormat } from '../../lib/date'

import { DateColumnFilter } from '../../components/Table/ServerSide/columnFillter'

const UserList = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Create Date',
        accessor: 'createdDate',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.createdDate)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'Country Code',
        accessor: 'countryCode',
      },

      {
        Header: 'Country Name',
        accessor: 'countryName',
      },
      {
        Header: 'Ipaddress',
        accessor: 'ipaddress',
      },
      {
        Header: 'Device',
        accessor: 'os',
        Cell: ({ state, row: { original } }) => {
          console.log(original, 'originaloriginal')
          return (
            <>
              {/* <p>{original.broswername}</p> */}
              <p> {original.os}</p>
            </>
          )
        },
      },
      // {
      //   Header: 'OS',
      //   accessor: 'os',
      // },
      //   {
      //     Header: 'Region Name',
      //     accessor: 'regionName',
      //   },
    ],
    [],
  )
  //state

  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])
  const [test, setTest] = useState(false)
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [filterState, setFilterState] = useState({})
  const [type, setType] = useState('pdf')
  //fuunction
  const docType = (type) => {
    setType(type)
    handleDoc(type)
  }
  const handleDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }


    let { result, data } = await loginHistoryApi(docType)
    console.log(result, 'result104')
    if (type && type === 'pdf') {
      orderPDF(result.pdfData)
    } else if (type && type === 'csv') {
      orderCSV(data)
    } else if (type && type === 'xls') {
      orderXLS(data)
    }

  }
  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      //  array of Object into object
      setFilterState({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        filters: filters,
        type: type,
      })
      const fillterObj = {}
      const sortObj = {}

      sortBy &&
        sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc == false ? 1 : -1 }))

      filters &&
        filters.length > 0 &&
        filters.forEach(({ id, value }) =>
          Object.assign(fillterObj, { [id == 'createdDate' ? 'fd_' + id : 'fs_' + id]: value }),
        )
      setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))
      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      }
      const { success, result } = await loginHistoryApi(reqData)
      if (success) {
        setData(result.data)
        setCount(result.count)
      }
    } catch (err) { }
  }

  return (
    <CCard className="mb-4">
      <CHeader>

        {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}
      </CHeader>
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
