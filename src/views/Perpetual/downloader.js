import React from 'react'
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
        momentFormat(item.orderDate, 'YYYY-MM-DD HH:mm'),
        item._id,
        item.firstCurrency,
        item.secondCurrency,
        capitalize(item.orderType),
        capitalize(item.buyorsell),
        item.averagePrice,
        item.price,
        item.filledQuantity,
        item.quantity,
        item.averagePrice * item.filledQuantity,
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
        'Base Currency',
        'Quote Currency',
        'Type',
        'Side',
        'Average',
        'Price',
        'Excuted',
        'Amount',
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
    doc.save('PerpetualOrder.pdf')
  } catch (err) {}
}

export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Perpetual Order.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Perpetual Order.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}

/////////////////trade history
export const tradePDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
        item._id,
        item.firstCurrency,
        item.secondCurrency,
        capitalize(item.buyorsell),
        item.price,
        item.filledQuantity,
        item.orderValue,
        item.Fees,
      ])
    })
    const unit = 'pt'
    const size = 'A4' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Trade History'
    const headers = [
      [
        'Date',
        'Reference Id',
        'Base Currency',
        'Quote Currency',
        'Side',
        'Price',
        'Excuted',
        'Total',
        'Fees',
      ],
    ]

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Perpetual Trade.pdf')
  } catch (err) {}
}

export const tradeCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Perpetual Trade.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const tradeXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Perpetual Trade.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
