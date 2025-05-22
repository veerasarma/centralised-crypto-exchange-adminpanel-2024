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
        momentFormat(item.createdDate, 'YYYY-MM-DD HH:mm'),
        item.countryCode,
        item.countryName,
        item.ipaddress,
        item.os
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Login History'
    const headers = [
      [
        'Create Date',
        'country Code',
        'country Name',
        'Ipaddress',
        'Device'

      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Login History.pdf')
  } catch (err) {
    console.log(err, 'errrr')
  }
}
export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Login History.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Login History.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}


export const suborderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdDate, 'YYYY-MM-DD HH:mm'),
        item.adminId,
        item.countryCode,
        item.countryName,
        item.ipaddress,
        item.os
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Login History'
    const headers = [
      [
        'Create Date',
        'Admin Id',
        'country Code',
        'country Name',
        'Ipaddress',
        'Device'

      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Login History.pdf')
  } catch (err) {
    console.log(err, 'errrr')
  }
}