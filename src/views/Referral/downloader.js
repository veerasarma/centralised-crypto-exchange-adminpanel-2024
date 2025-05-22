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
        item.parentCode,
        item.child_Code,
        item.currency,
        item.amount,
        item.rewardCurrency,
        item.ust_value,
        item.rewardStatus ? 'Rewarded' : 'Not Rewarded',
        capitalize(item.status),
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(10)

    const title = 'Referral Report'
    const headers = [
      [
        'Date',
        'Referred By',
        'Referred To',
        'Deposit Currency',
        'Deposit Amount',
        'Reward Currency',
        'Reward Amount',
        'Reward Status',
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
    doc.save('Referral Report.pdf')
  } catch (err) { }
}
export const bonusPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item.parentCode,
        item.child_Code,
        item.rewardCurrency,
        item.amount,

      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(10)

    const title = 'Referral Report'
    const headers = [
      [
        'Date',
        'Referred By',
        'Referred To',
        'Reward Currency',
        'Reward Amount',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Referral Report.pdf')
  } catch (err) { }
}
export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Referral Report.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Referral Report.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) { }
}
