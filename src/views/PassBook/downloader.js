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
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item.userCodeId,
        item.tableId,
        item.coin,
        item.beforeBalance,
        item.afterBalance,
        item.amount,
        item.type,
        item.category,
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Passbook Report'
    const headers = [
      [
        'Date',
        'User ID',
        'Reference ID',
        'Currency',
        'Before Balance',
        'After Balance',
        'Amount',
        'Type',
        'Category'
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
    doc.save('Passbook Report.pdf')
  } catch (err) { }
}
export const orderCSV = (data) => {
  try {
    console.log('...report', data)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Passbook Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Passbook Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}
