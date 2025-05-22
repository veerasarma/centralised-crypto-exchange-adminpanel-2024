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
        momentFormat(item.settleDate, 'YYYY-MM-DD HH:mm'),
        item.userCode,
        item.stakeOrderId,
        item.coin,

        item.amount,
        item.type,
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'StakeSettle Report'
    const headers = [
      [
        'createdAt',
        'User ID',
        'Stake Id',
        'Currency',
        'Amount',
        'Type',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('StakeSettle Report.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    console.log('...report', data)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'StakeSettle Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'StakeSettle.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const satkeorderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item.userCode,
        item.stakeId,
        item.coin,
        item.amount,
        item.type,
       momentFormat(item.settleEndDate, 'YYYY-MM-DD HH:mm'),
        item.status
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'StakeOrder Report'
    const headers = [
      [
        'Date',
        'User ID',
        'Stake Id',
        'Currency',
        'Amount',
        'Type',
        'End Date',
        'Status'
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('StakeOrder Report.pdf')
  } catch (err) {}
}