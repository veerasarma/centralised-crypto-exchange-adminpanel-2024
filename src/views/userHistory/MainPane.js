import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { CCard, CCardBody, CHeader } from '@coreui/react'
import {
  tradeHeader,
  orderHeader,
  withdrawHeader,
  depositHeader,
  passbookHeader,
  AdminprofitHeader,
} from './headers'
import { useParams } from 'react-router-dom'
import { decryptString } from 'src/lib/cryptoJS'
import {
  orderHistory,
  orderHistoryDoc,
  tradeHistory,
  tradeHistoryDoc,
  tradeUserHistory,
} from 'src/api/spot/history'
import { toast } from '../../redux/toast/toast.action'
import { orderCSV, orderPDF, orderXLS, tradeCSV, tradePDF, tradeXLS } from './downloader'
import SerachDateFillter from '../searchDateFillter/searchDateFillter'
import DropDown from '../../components/Table/dropdown'
import ServerSideTable from '../../components/Table/ServerSide'
import { getDepositList, getWithdrawList } from 'src/api/Transfer/transfer'
import { getpassbookList } from 'src/api/passbook'
import { getAdminprofit } from 'src/api/AdminProfit'

import {
  orderPDF as orderDepoPdf,
  orderCSV as orderDepoCSV,
  orderXLS as orderDepoXLS,
  withdrawCSV,
  withdrawXLS,
  WithdrawPDF,
} from '../Transfer/downloader'
import { orderHistoryDoc as depoHistoryDoc, withdarwHistoryDoc } from '../../api/Transfer/history'

import {
  orderCSV as orderPassCSV,
  orderPDF as orderPassPDF,
  orderXLS as orderPassXLS,
} from '../PassBook/downloader'
import {
  orderCSV as orderProfitCSV,
  orderPDF as orderProfitPDF,
  orderXLS as orderProfitXLS,
} from '../AdminProfit/downloader'
const MainPane = ({ current }) => {
  const dispatch = useDispatch()

  const params = useParams()
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('pdf')
  const [filters, setFilters] = React.useState([])
  const [filterState, setFilterState] = useState({})
  const [downloadDisable, setdownloadDisable] = useState(false)
  const [userId, setUserId] = useState(params.userid ? params.userid : '')
  const [dateObj, setdateObj] = useState({ startDate: '', endDate: '' })
  const [tableKey, setTableKey] = useState(current)
  const columns = useMemo(() => {
    switch (current) {
      case 'orderhistory':
        setData([])
        setCount(0)
        return orderHeader
      case 'tradehistory':
        setData([])
        setCount(0)
        return tradeHeader
      case 'deposithistory':
        setData([])
        setCount(0)
        return depositHeader
      case 'withdrawhistory':
        setData([])
        setCount(0)
        return withdrawHeader
      case 'passbookhistory':
        setData([])
        setCount(0)
        return passbookHeader
      case 'adminprofit':
        setData([])
        setCount(0)
        return AdminprofitHeader
      default:
        return orderHeader
    }
  }, [current])
  useEffect(() => {
    // setFilters([])
    // setFilterState({})
    // setdateObj({ startDate: '', endDate: '' })
    // setData([])
    // setCount(0)
    // setLoading(true)
    // setTableKey(current)
  }, [current])

  //   useEffect(() => {
  //     let filters = []
  //     console.log(userId, tableKey, 'cwgcdgwuocgwuog')

  //     setPref([...filters])
  //   }, [userId, tableKey])

  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
    setLoading(true)

    if (userId && current === 'orderhistory') {
      filters.push({ id: 'userId', value: decryptString(userId, true) })
      console.log(filters, '==========================ORDER==========================')
    } else if (
      // Future fixing to be done here.....
      userId &&
      (current === 'deposithistory' ||
        current === 'withdrawhistory' ||
        current === 'passbookhistory' ||
        current === 'adminprofit')
    ) {
      filters.push({ id: 'userId', value: decryptString(userId, true) })
    } else if (userId && current === 'tradehistory') {
      console.log(filters)
      let findex = filters.findIndex((item) => item.id === 'userId')
      // filters.splice(findex, 1)
      filters.push({ id: 'buyUserId', value: decryptString(userId, true) })
      filters.push({ id: 'sellUserId', value: decryptString(userId, true) })
      console.log(filters, '==========================TRADE==========================')
    } else {
      console.log('==========================DIFF==========================')
    }
    setFilterState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortBy,
      filters: filters,
      type: type,
    })
    //  array of Object into object
    const fillterObj = {}
    const sortObj = {}
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) => Object.assign(sortObj, { [id]: desc === false ? 1 : -1 }))

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === 'averagePrice' ||
        id === 'Price' ||
        id === 'filledQuantity' ||
        id === 'quantity' ||
        id === 'orderValue' ||
        id === 'Fee' ||
        id === 'afterBalance' ||
        id === 'beforeBalance' ||
        id === 'amount' ||
        id === 'sellerFee' ||
        id === 'buyerFee' ||
        id === 'openQuantity' ||
        id === 'total' ||
        id === 'actualAmount' ||
        id === 'commissionFee' || id === 'execPrice'  || id === 'tradePrice'
          ? 'fn_' + id
          : id === 'orderDate'
          ? 'fd_' + id
          : id === 'sefd_'
          ? id +
            (current === 'orderhistory'
              ? 'orderDate'
              : current === 'passbookhistory'
              ? 'createdAt'
              : 'createdAt')
          : id === '_id'
          ? 'fid' + id
          : id === 'userId' || id === 'users' || id ==='tableId'
          ? 'fid' + id
          : id === 'createdAt'
          ? 'fd_' + id
          : 'fs_' + id]: value,
      }),
    )
    console.log(fillterObj, 'fillterObj186')
    setFilterState((state) => ({ ...state, ['fillterObj']: fillterObj, ['sortObj']: sortObj }))
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
      type,
    }

    console.log('..filldatee', reqData)
    let { success, result, errors } =
      current === 'orderhistory'
        ? await orderHistory(reqData)
        : current === 'tradehistory'
        ? await tradeUserHistory(reqData)
        : current === 'withdrawhistory'
        ? await getWithdrawList({ ...reqData, mode: 'userhistory' })
        : current === 'deposithistory'
        ? await getDepositList({ ...reqData, mode: 'userhistory' })
        : current === 'passbookhistory'
        ? await getpassbookList(reqData)
        : current === 'adminprofit'
        ? await getAdminprofit(reqData)
        : await orderHistory(reqData)
    setLoading(false)
    console.log({ success, result, errors })
    if (success) {
      setCount(result.count)
      setData(result.data)
      setdownloadDisable(false)
    } else {
      console.log(errors)
      setdownloadDisable(true)
      setCount(0)
      setData([])
      // toast(
      //   {
      //     message: errors.date,
      //     type: 'error',
      //   },
      //   dispatch,
      // )
    }
  }

  const docType = (type) => {
    setType(type)
    if (current === 'orderhistory') {
      handleOrderDoc(type)
    } else if (current === 'tradehistory') {
      handleTradeDoc(type)
    } else if (current === 'deposithistory') {
      handleDepositDoc(type)
    } else if (current === 'withdrawhistory') {
      handleWithdrawDoc(type)
    } else if (current === 'passbookhistory') {
      handlePassbookDoc(type)
    } else if (current === 'adminprofit') {
      handleProfitDoc(type)
    }
  }

  const handleOrderDoc = async (type) => {
    let docType = {
      doc: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }
    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_orderDate: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.data)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    } else {
      let { result, data } = await orderHistoryDoc(docType)
      if (type && type === 'pdf') {
        orderPDF(result.data)
      } else if (type && type === 'csv') {
        orderCSV(data)
      } else if (type && type === 'xls') {
        orderXLS(data)
      }
    }
  }

  const handleTradeDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
      mode: 'userhistory',
    }
    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await tradeHistoryDoc(docType)
      console.log('...data', data, result)
      if (type && type === 'pdf') {
        tradePDF(result.data)
      } else if (type && type === 'csv') {
        tradeCSV(data,type)
      } else if (type && type === 'xls') {
        tradeCSV(data,type)
      }
    } else {
      let { result, data } = await tradeHistoryDoc(docType)
      if (type && type === 'pdf') {
        tradePDF(result.data)
      } else if (type && type === 'csv') {
        tradeCSV(data,type)
      } else if (type && type === 'xls') {
        tradeCSV(data,type)
      }
    }
  }

  const handleDepositDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }
    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await depoHistoryDoc(docType)
      console.log('...data', data, result)
      if (type && type === 'pdf') {
        orderDepoPdf(result.pdfData)
      } else if (type && type === 'csv') {
        orderDepoCSV(data)
      } else if (type && type === 'xls') {
        orderDepoXLS(data)
      }
    } else {
      let { result, data } = await depoHistoryDoc(docType)
      console.log('...data', data, result)
      if (type && type === 'pdf') {
        orderDepoPdf(result.pdfData)
      } else if (type && type === 'csv') {
        orderDepoCSV(data)
      } else if (type && type === 'xls') {
        orderDepoXLS(data)
      }
    }
  }

  const handleWithdrawDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }

    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }
      let { result, data } = await withdarwHistoryDoc(docType)
      if (type && type === 'pdf') {
        WithdrawPDF(result.pdfData)
      } else if (type && type === 'csv') {
        withdrawCSV(data)
      } else if (type && type === 'xls') {
        withdrawXLS(data)
      }
    } else {
      let { result, data } = await withdarwHistoryDoc(docType)
      if (type && type === 'pdf') {
        WithdrawPDF(result.pdfData)
      } else if (type && type === 'csv') {
        withdrawCSV(data)
      } else if (type && type === 'xls') {
        withdrawXLS(data)
      }
    }
  }

  const handlePassbookDoc = async (type) => {
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
        let { result, data } = await getpassbookList(docType)
        if (type && type === 'pdf') {
          orderPassPDF(result.result.pdfData)
        } else if (type && type === 'csv') {
          console.log('...csv', data, result)
          orderPassCSV(data)
        } else if (type && type === 'xls') {
          orderPassXLS(data)
        }
      } else {
        let { result, data } = await getpassbookList(docType)
        if (type && type === 'pdf') {
          orderPassPDF(result.result.pdfData)
        } else if (type && type === 'csv') {
          console.log('...csv', data, result)
          orderPassCSV(data)
        } else if (type && type === 'xls') {
          orderPassXLS(data)
        }
      }
    } catch (err) {
      console.log('...err', err)
    }
  }

  const handleProfitDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    }

    if (Object.keys(dateObj).length > 0 && dateObj.startDate != '' && dateObj.endDate != '') {
      docType['fillter'] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      }

      let { result, data } = await getAdminprofit(docType)
      if (type && type === 'pdf') {
        orderProfitPDF(result.result.pdfData)
      } else if (type && type === 'csv') {
        console.log('...result', data, result)

        orderProfitCSV(data)
      } else if (type && type === 'xls') {
        orderProfitXLS(data)
      }
    } else {
      let { result, data } = await getAdminprofit(docType)
      if (type && type === 'pdf') {
        orderProfitPDF(result.result.pdfData)
      } else if (type && type === 'csv') {
        console.log('...result', data, result)

        orderProfitCSV(data)
      } else if (type && type === 'xls') {
        orderProfitXLS(data)
      }
    }
  }

  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          setdateObj={setdateObj}
          fetchData={fetchData}
        />
        {!downloadDisable && (
          <DropDown
            docType={docType}
            handleDoc={current === 'orderhistory' ? handleOrderDoc : handleTradeDoc}
          />
        )}
      </CHeader>
      <CCardBody>
        {current && (
          <ServerSideTable
            mode={'userhistory'}
            key={current}
            columns={columns}
            data={data}
            fetchData={fetchData}
            pageCount={count}
            filters={filters}
            loading={loading}
            setFilters={setFilters}
            filterState={filterState}
          />
        )}
      </CCardBody>
    </CCard>
  )
}

MainPane.propTypes = {
  current: PropTypes.any,
}

export default MainPane
