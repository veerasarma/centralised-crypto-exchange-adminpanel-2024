import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
export const orderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.startTime, 'YYYY-MM-DD HH:mm'),
        item._id,
        item.orderId,
        item.buyUniqueId,
        item.sellUniqueId,
        capitalize(item.side),
        item.firstCoin,
        item.secondCoin,
        item.price,
        item.payValue,
        item.receiveValue,
        item.feePct,
        capitalize(item.status),
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Order History'
    const headers = [
      [
        'Date',
        'Reference Id',
        'Order Id',
        'Buyer Id',
        'Seller Id',
        'Post Type',
        'Base Coin',
        'Quote Coin',
        'Price',
        'Pay Value',
        'Get Price',
        'Fee',
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
    doc.save('P2pTrade.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'P2p Trade.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'P2p Trade.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}

export const reportPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat( item.createdAt,'DD-MM-YYYY HH:MM'),
        item._id.toString(),
        item.reportOnCode,
        item.reportedByCode,
        item.orderCode,
        item.reason,
        item.description,
        item.actionTakenOn ? momentFormat( item.actionTakenOn,'DD-MM-YYYY HH:MM'): '-',
        capitalize(item.status)
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Order History'
    const headers = [
      [
        "Date & Time",
        "Reference ID",
        "Reported On",
        "Reported By",
        "Order ID",
        "Reason",
        "Description",
        "Action Took On",
        "Status",
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Reports.pdf')
  } catch (err) {}
}

export const reportCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Reports.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const reportXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Reports.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
