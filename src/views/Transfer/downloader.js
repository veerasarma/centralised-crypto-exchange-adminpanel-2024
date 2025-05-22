import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import {convert}from '../../lib/convert'
export const orderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        // item._id,
        item.userCode,
        item.toAddress,
        item.coin,
        item.paymentType,
        item.amount,
        item.paymentType == 'coin_deposit' ? item.txid : item._id,
        capitalize(item.status),
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(10)

    const title = 'Deposit Report'
    const headers = [
      [
        'Date',
        // 'Reference Id',
        'UserId',
        'To Address',
        'Currency',
        'Payment Type',
        'Transfer Amount',
        'Transaction ID',
        'Status',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Deposit Report.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Deposit Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Deposit Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const WithdrawPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        // item._id,
        item._id,
        item.userCode,
        item.toAddress,
        item.coin,
        item.paymentType,
        convert(item.actualAmount),
        // item.amount,
        // item.commissionFee,
        // item.bankDetail == null
        //   ? ''
        //   : item.bankDetail == undefined
        //   ? ''
        //   : `bankName--${item.bankDetail.bankName}/accountNo--${item.bankDetail.bankName}/holderName--${item.bankDetail.bankName}/bankcode--${item.bankDetail.bankName}/city--${item.bankDetail.bankName}`,

        // item && item.destTag ? item.destTag : '-',
        // item.paymentType == 'coin_withdraw' ? item.txid : item._id,
        capitalize(item.status),
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(10)

    const title = 'Withdraw Report'
    const headers = [
      [
        'Date',
        'Reference Id',
        'User Id',
        'ToAddress',
        'Currency',
        'Payment Type',
        'Transfer Amount',
        // 'Amount',
        // 'CommissionFee',
        // 'BankDetail',

        // 'destTag',
        'Status',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
      columnStyles: {
        0: { cellWidth: 100 },
      },
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Withdraw Report.pdf')
  } catch (err) {}
}
export const withdrawCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Withdraw Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const withdrawXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Withdraw Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
