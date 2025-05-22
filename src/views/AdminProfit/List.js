import React, { useMemo, useState, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import ServerSideTable from '../../components/Table/ServerSide'
import PropTypes from 'prop-types'
import DropDown from '../../components/Table/dropdown'
import { useDispatch } from 'react-redux'
import { convert } from 'src/lib/convert'
//import searchDateFillter
import SerachDateFillter from '../searchDateFillter/searchDateFillter'
import { orderXLS, orderCSV, orderPDF } from './downloader'

//import lib
import { capitalize } from 'src/lib/string'
import { momentFormat } from '../../lib/date'

//import api
import { getAdminprofit } from 'src/api/AdminProfit'
import {
  DateColumnFilter,
  SelectColumnFilter,
  StatusColumnFilter,
  UserSatusFillter,
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { toast } from '../../redux/toast/toast.action'
import { PassbookTypeFilter } from 'src/components/Table/ServerSide/filters'

const List = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
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
      { Header: 'UserId', accessor: 'userCode' },
      { Header: 'Pair', accessor: 'pair' },
      { Header: 'Currency', accessor: 'coin' },
      {
        Header: 'Fee',
        accessor: 'fee',
        Cell: ({ state, row: { original } }) => {
          return convert(original.fee)
        },
      },
      {
        Header: 'Type', accessor: 'ordertype',
        Cell: ({ state, row: { original } }) => {
          return original && capitalize(original.ordertype)
        },
      },
    ],

    [],
  )
  const dispatch = useDispatch()
  //db.getCollection('passbook').updateMany({"type":"p2p_trade_newAdd"},{$set:{userId:ObjectId("61a46a48655f2419bc904fda")}})
  //state
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [filters, setFilters] = React.useState([])
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [type, setType] = useState('pdf')

  //function
  const fetchFaqData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    try {
      console.log('adminpppppppp', filters)
      setFilterState({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        filters: filters,
        type: type,
      })
      console.log('...fillterr', filters)

      //  array of Object into object
      const fillterObj = {}
      const sortObj = {}
      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))
      filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, {
          // id === 'beforeBalance' || 'amount' || 'afterBalance' || 'userCodeId'
          //   ? 'fn_' + id
          //   :

          [id == 'createdAt'
            ? 'fd_' + id
            : id === 'beforeBalance' || id === 'fee' || id === 'afterBalance' || id === 'userCodeId'
              ? 'fn_' + id
              : id === 'sefd_'
                ? id + 'createdAt'
                : id == 'userId'
                  ? 'fid' + id
                    ? id == 'userCode'
                    : 'fs_' + id
                  : 'fs_' + id]: value,
        }),
      )

      console.log('...fillterobj', fillterObj)
      setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))

      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
        type,
      }

      const { success, result, errors } = await getAdminprofit(reqData)
      console.log(result, 'result', success)
      if (success == true) {
        console.log('iggggggggg')
        setData(result.data)
        setCount(result.count)
        setdownloadDisable(false)
      } else {
        setdownloadDisable(true)

        toast(
          {
            message: errors.date,
            type: 'error',
          },
          dispatch,
        )
      }
    } catch (err) { }
  }
  const docType = (type) => {
    setType(type)
    handleDoc(type)
  }
  const handleDoc = async (type) => {
    try {
      let docType = {
        export: type,
        page: parseInt(filterState.pageIndex),
        limit: parseInt(filterState.pageSize),
        fillter: filterState.fillterObj,
        sortObj: filterState.sortObj,
      }
      console.log('...handleDoc', docType)
      if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
        docType['fillter'] = {
          ...filterState.fillterObj,
          sefd_createdAt: {
            startDate: dateObj.startDate,
            endDate: dateObj.endDate,
          },
        }
        // docType["Download"]="download_option"
        let { result, data } = await getAdminprofit(docType)
        if (type && type === 'pdf') {
          orderPDF(result.result.pdfData)
        } else if (type && type === 'csv') {
          console.log('...csv', data, result)
          orderCSV(data)
        } else if (type && type === 'xls') {
          orderXLS(data)
        }
      } else {
        let { result, data } = await getAdminprofit(docType)
        if (type && type === 'pdf') {
          orderPDF(result.result.pdfData)
        } else if (type && type === 'csv') {
          console.log('...result', data, result)

          orderCSV(data)
        } else if (type && type === 'xls') {
          orderXLS(data)
        }
      }
    } catch (err) {
      console.log('...err', err)
    }
  }
  return (
    <>
      {console.log(data, 'data12')}
      <CCard className="mb-4">
        <CHeader>
          <SerachDateFillter
            fetchData={fetchFaqData}
            setdateObj={setdateObj}
            filterState={filterState}
          />
          {!downloadDisable && <DropDown docType={docType} handleDoc={handleDoc} />}
        </CHeader>
        <CCardBody>
          <ServerSideTable
            columns={columns}
            data={data}
            fetchData={fetchFaqData}
            loading={loading}
            pageCount={count}
            filters={filters}
            // setFilters={setFilters}
            filterState={filterState}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

List.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default List
