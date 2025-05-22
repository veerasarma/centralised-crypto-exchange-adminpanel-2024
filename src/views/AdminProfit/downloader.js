import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
//import lib
import { capitalize } from '../../lib/string'
import { convert } from '../../lib/convert'
import { momentFormat } from '../../lib/date'
export const orderPDF = (data) => {
  try {
    console.log(data, 'data')
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item.userCode,
        item.pair,
        item.coin,
        convert(item.fee),
        item.ordertype,
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Profit Report'
    const headers = [['Date', 'User ID', 'Pair', 'Currency', 'Fee', 'Type']]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Profit Report.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    console.log('...report', data)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Profit Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Profit Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
