import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import isEmpty from 'src/lib/isEmpty'
export const orderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item.userId,
        item.email,
        capitalize(item.emailStatus),
        capitalize(item.phoneStatus),
        String(item.phoneCode) + String(item.phoneNo),
        !isEmpty(item.google2Fa.secret) ? 'Enabled' : 'Disabled',
        capitalize(item.status),
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'User Report'
    const headers = [
      [
        'Create Date',
        'User Id',
        'Email',
        'Email Status',
        'Phone Status',
        'Phone Number',
        'Google 2FA',
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
    doc.save('User Report.pdf')
  } catch (err) {}
}
export const orderCSV = (data) => {
  try {
    console.log('...data', data)
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'User Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'User Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
