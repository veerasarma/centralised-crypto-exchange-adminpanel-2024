import React, { useMemo, useState, Fragment } from 'react'
import { CCard, CCardBody, CFormLabel, CHeader } from '@coreui/react'
import ServerSideTable from '../../components/Table/ServerSide'
import PropTypes from 'prop-types'
import DropDown from '../../components/Table/dropdown'
import { useDispatch } from 'react-redux'

//import searchDateFillter
import SerachDateFillter from '../../views/searchDateFillter/searchDateFillter'
import { orderXLS, orderCSV, orderPDF } from './downloader'

//import lib
import { capitalize } from 'src/lib/string'
import { momentFormat } from '../../lib/date'

//import api
import { StakeSettleList } from 'src/api/Staking/staking'
import {
  DateColumnFilter,
  SelectColumnFilter,
  StatusColumnFilter,
  UserSatusFillter,
} from '../../components/Table/ServerSide/columnFillter'
//import action
import { toast } from '../../redux/toast/toast.action'
import { stakesettleTypeFilter } from 'src/components/Table/ServerSide/filters'

const List = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'settleDate',
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.settleDate)}</CFormLabel>
            </Fragment>
          )
        },
      },
      {
        Header: 'User Id',
        accessor: 'userCode',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Stake Id',
        accessor: 'stakeOrderId',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'currency',
        accessor: 'coin',
        // Filter: DefaultColumnFilter,
      },

      //   {
      //     Header: 'Category',
      //     accessor: 'category',
      //     // Filter: DefaultColumnFilter,
      //   },
      //   {
      //     Header: 'BeforeBalance',
      //     accessor: 'beforeBalance',
      //     // Filter: DefaultColumnFilter,
      //   },
      //   {
      //     Header: 'AfterBalance',
      //     accessor: 'afterBalance',
      //     // Filter: DefaultColumnFilter,
      //   },
      {
        Header: 'Amount',
        accessor: 'amount',
        // Filter: DefaultColumnFilter,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: stakesettleTypeFilter,
        Cell: ({ state, row: { original } }) => {
          return <>{capitalize(original.type)}</>
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
      console.log('...fetchFaqData', filters)
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
            : id === 'beforeBalance' ||
              id === 'amount' ||
              id === 'afterBalance' ||
              id === 'userCodeId'
            ? 'fn_' + id
            : id === 'sefd_'
            ? id + 'settleDate'
            : id == 'tableId'
            ? 'fid' + id
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

      const { success, result, errors } = await StakeSettleList(reqData)
      console.log('successresulterrors', success, result, errors)
      if (success) {
        setData(result.result.data)
        setCount(result.result.count)
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
    } catch (err) {}
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
        let { result, data } = await StakeSettleList(docType)
        console.log(result,'result196')
        if (type && type === 'pdf') {
          orderPDF(result.pdfData)
        } else if (type && type === 'csv') {
          console.log('...csv', data, result)
          orderCSV(data)
        } else if (type && type === 'xls') {
          orderXLS(data)
        }
      } else {
        let { result, data } = await StakeSettleList(docType)
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
