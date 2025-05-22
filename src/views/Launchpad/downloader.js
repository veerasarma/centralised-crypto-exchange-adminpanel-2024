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
        item.userCode,
        item.coin,
        item.sendCoin,
        item.price,
        item.quantity,
        item.discount,
        item.total,
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(10)

    const title = 'Purchase History Report'
    const headers = [
      [
        'Purchase Date',
        'UserId',
        'Buy Currency',
        'Sell Coin',
        'Price',
        'Quantity',
        'Discount',
        'Total',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Purchase History.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Purchase History.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Purchase History.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}

