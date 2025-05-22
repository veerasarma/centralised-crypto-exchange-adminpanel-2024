/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CFormLabel } from '@coreui/react'

import { Fragment } from 'react'
import {
  DateColumnFilter,
  TradeStatusColumnFilter,
} from 'src/components/Table/ServerSide/columnFillter'
import {
  DepositPaymentType,
  DepositStatusFilter,
  PassbookTypeFilter,
  StatusColumnFilter,
  WithdrawPaymentType,
} from 'src/components/Table/ServerSide/filters'
import { encryptString } from 'src/lib/cryptoJS'
import { momentFormat } from 'src/lib/date'
import { capitalize } from 'src/lib/string'
import { convert } from 'src/lib/convert'


export const orderHeader = [
  {
    Header: 'Date',
    accessor: 'orderDate',
    Filter: DateColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return (
        <Fragment>
          <CFormLabel>{momentFormat(original.orderDate)}</CFormLabel>
        </Fragment>
      )
    },
  },
  {
    Header: 'Reference Id',
    accessor: '_id',
    // Filter: DefaultColumnFilter,
  },
  // {
  //   Header: 'User Id',
  //   accessor: 'userId',
  //   // Filter: DefaultColumnFilter,
  // },
  {
    Header: 'Base Currency',
    accessor: 'firstCurrency',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Quote Currency',
    accessor: 'secondCurrency',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Type',
    accessor: 'orderType',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && capitalize(original.orderType)
    },
  },
  {
    Header: 'Side',
    accessor: 'buyorsell',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && capitalize(original.buyorsell)
    },
  },
  {
    Header: 'Execute price',
    accessor: 'execPrice',
    Cell: ({ state, row: { original } }) => {
      return original && original.execPrice ? parseFloat(original.execPrice).toFixed(8) : '0'
    },
  },
  {
    Header: 'Price',
    accessor: 'Price',

    Cell: ({ state, row: { original } }) => {
      // console.log('original: ', original)
      return original.flag == true ? 'market' : original.price
    },
  },
  {
    Header: 'Filled Amount',
    accessor: 'filledQuantity',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && parseFloat(original.filledQuantity).toFixed(8)
    },
  },
  {
    Header: 'Amount',
    accessor: 'openQuantity',

    Cell: ({ state, row: { original } }) => {
      return original.orderType == 'market' && original.buyorsell == 'buy'
        ? parseFloat(original.filledQuantity).toFixed(8)
        : parseFloat(original.openQuantity).toFixed(8)
    },
  },

  {
    Header: 'Total',
    accessor: 'averagePrice',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      if (original.filledQuantity) {
        return parseFloat(
          (original.averagePrice / original.filledQuantity) * original.filledQuantity,
        ).toFixed(8)
      } else {
        return '0.000'
      }
    },
  },
  {
    Header: 'status',
    accessor: 'status',
    Filter: TradeStatusColumnFilter,
    Cell: ({ state, row: { original } }) => {
      let status = original.status == 'cancel' ? "Cancelled" : original.status
      return <p>{capitalize(status)}</p>
    },
  },
]

export const tradeHeader = [
  {
    Header: 'Date',
    accessor: 'createdAt',
    Filter: DateColumnFilter,
    maxWidth: 70,
    Cell: ({ state, row: { original } }) => {
      return (
        <Fragment>
          <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
        </Fragment>
      )
    },
  },
  {
    Header: 'Reference Id',
    accessor: '_id',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Buyer ID',
    accessor: 'buyUserCode',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Seller ID',
    accessor: 'sellUserCode',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Base Currency',
    accessor: 'firstCurrency',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Quote Currency',
    accessor: 'secondCurrency',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Side',
    accessor: 'isMaker',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && original.isMaker == 'buy' ? 'Buy' : 'Sell'
    },
  },
  {
    Header: 'Price',
    accessor: 'tradePrice',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && parseFloat(original.tradePrice).toFixed(8)
    },
  },
  {
    Header: 'Executed',
    accessor: 'tradeQty',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && parseFloat(original.tradeQty).toFixed(8)
    },
  },
  {
    Header: 'Total',
    accessor: 'orderValue',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return original && parseFloat(original.orderValue).toFixed(8)
    },
  },
  {
    Header: 'Buy Fee',
    accessor: 'buyerFee',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return convert(original.buyerFee.toFixed(8))
    },
  },
  {
    Header: 'Sell Fee',
    accessor: 'sellerFee',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return convert(original.sellerFee.toFixed(8))
    },
  },
]

export const withdrawHeader = [
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
  {
    Header: 'Reference Id',
    accessor: '_id',
  },
  // {
  //   Header: 'User Id',
  //   accessor: 'userId',
  //   // Filter: DefaultColumnFilter,
  // },
  {
    Header: 'To Address/Account',
    accessor: 'toAddress',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      if (original.paymentType === 'fiat_withdraw') {
        return original.bankDetail && original.bankDetail.accountNo
          ? original.bankDetail.accountNo
          : ''
      }
      if (original.paymentType === 'coin_withdraw') {
        return original.toAddress
      }
      if (original.paymentType === 'admin_withdraw') {
        return ''
      }
    },
  },
  {
    Header: 'Currency',
    accessor: 'coin',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Payment Type',
    accessor: 'paymentType',
    Filter: WithdrawPaymentType,
    Cell: ({ state, row: { original } }) => {
      return capitalize(original.paymentType)
    },
  },
  {
    Header: 'Actual Amount',
    accessor: 'actualAmount',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    // Filter: DefaultColumnFilter,
  },
  // {
  //   Header: 'Commission Fee',
  //   accessor: 'commissionFee',
  //   // Filter: DefaultColumnFilter,
  // },
  {
    Header: 'Status',
    accessor: 'status',
    Filter: StatusColumnFilter,
    Cell: ({ state, row: { original } }) => {
      let color =
        original.status === 'new'
          ? 'secondary'
          : original.status === 'pending'
            ? 'warning'
            : original.status === 'completed'
              ? 'success'
              : 'danger'
      return (
        <CBadge color={color} shape="rounded-pill">
          {capitalize(original.status)}
        </CBadge>
      )
    },
  },
]

export const depositHeader = [
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
  {
    Header: 'Transaction Id',
    accessor: 'txid',
  },
  // {
  //   Header: 'User Id',
  //   accessor: 'userId',
  // },
  {
    Header: 'To Address',
    accessor: 'toAddress',
    Cell: ({ state, row: { original } }) => {
      if (original.paymentType == 'fiat_deposit') {
        return '-'
      }
      if (original.paymentType == 'coin_deposit') {
        return original.toAddress
      }
      if (original.paymentType == 'admin_deposit') {
        return '-'
      }
    },
  },
  {
    Header: 'Currency',
    accessor: 'coin',
  },
  {
    Header: 'Payment Type',
    accessor: 'paymentType',
    Filter: DepositPaymentType,
    Cell: ({ state, row: { original } }) => {
      return capitalize(original.paymentType)
    },
  },
  {
    Header: 'Transfer Amount',
    accessor: 'amount',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Filter: DepositStatusFilter,
    Cell: ({ state, row: { original } }) => {
      let color =
        original.status === 'new'
          ? 'secondary'
          : original.status === 'pending'
            ? 'warning'
            : original.status === 'completed'
              ? 'success'
              : 'danger'
      return (
        <CBadge color={color} shape="rounded-pill">
          {capitalize(original.status)}
        </CBadge>
      )
    },
  },
]

export const passbookHeader = [
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
  {
    Header: 'User Id',
    accessor: 'userCodeId',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Referenece Id',
    accessor: 'tableId',
    // Filter: DefaultColumnFilter,
  },
  {
    Header: 'Currency',
    accessor: 'coin',
    // Filter: DefaultColumnFilter,
  },

  //   {
  //     Header: 'Category',
  //     accessor: 'category',
  //     // Filter: DefaultColumnFilter,
  //   },
  {
    Header: 'BeforeBalance',
    accessor: 'beforeBalance',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return convert(original.beforeBalance.toFixed(8))
    },
  },
  {
    Header: 'AfterBalance',
    accessor: 'afterBalance',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return convert(original.afterBalance.toFixed(8))
    },
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    // Filter: DefaultColumnFilter,
    Cell: ({ state, row: { original } }) => {
      return convert(original.amount.toFixed(8))
    },
  },
  {
    Header: 'Type',
    accessor: 'type',
    Filter: PassbookTypeFilter,
    Cell: ({ state, row: { original } }) => {
      return <>{capitalize(original.type)}</>
    },
  },
]
export const AdminprofitHeader = [
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
  { Header: 'Pair', accessor: 'pair' },
  {
    Header: 'Fee',
    accessor: 'fee',
    Cell: ({ state, row: { original } }) => {
      return convert(original.fee.toFixed(8))
    },
  },
  {
    Header: 'Type', accessor: 'ordertype',
    Cell: ({ state, row: { original } }) => {
      return original && capitalize(original.ordertype)
    },
  },
  { Header: 'Coin', accessor: 'coin' },
]
