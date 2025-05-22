import React from 'react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
//import lib
import { capitalize } from '../../lib/string'
import { momentFormat } from '../../lib/date'
import { convert } from '../../lib/convert'
export const orderPDF = (data) => {
  try {
    let resultArr = []
    data.map((item) => {
      resultArr.push([
        momentFormat(item.orderDate, 'YYYY-MM-DD HH:mm'),
        item.userId,
        item._id,
        item.firstCurrency,
        item.secondCurrency,
        capitalize(item.orderType),
        capitalize(item.buyorsell),
        item.averagePrice,
        item.price,
        item.filledQuantity,
        item.openQuantity,
        item.averagePrice * item.filledQuantity,
        capitalize(item.status),
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
        'Date',
        'User Id',
        'Reference Id',
        'Base Currency',
        'Quote Currency',
        'Type',
        'Side',
        'Executed price',
        'Price',
        'Filled Amount',
        'Amount',
        'Total',
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
    doc.save('Order History.pdf')
  } catch (err) {}
}

export const orderCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Order History.csv')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
export const orderXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Order History.xls')
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
        momentFormat(item.createdAt.toString()),
        item._id,
        item.isMaker,
        item.sellUserId,
        item.firstCurrency,
        item.secondCurrency,
        item.isMaker,
        String(item.tradePrice),
        String(item.tradeQty),
        String(item.orderValue),
        convert(item.buyerFee),
        convert(item.sellerFee),
      ])
    })
    const unit = 'pt'
    const size = 'A3' // Use A1, A2, A3 or A4
    const orientation = 'landscape' // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(13)

    const title = 'Trade History'
    const headers = [
      [
        'Date',
        'Reference Id',
        'Buyer Id',
        'Seller Id',
        'Base Currency',
        'Quote Currency',
        'Side',
        'Price',
        'Executed',
        'Total',
        'Buy Fee',
        'Sell Fee',
      ],
    ]
    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('Trade History.pdf')
  } catch (err) {}
}

export const tradeCSV = (data,type) => {
  try {
    // const url = window.URL.createObjectURL(new Blob([data]))
    // const link = document.createElement('a')
    // link.href = url
    // link.setAttribute('download', 'Trade History.csv')
    // document.body.appendChild(link)
    // link.click()
    console.log(data,'datatat157',type)

    var Data = data && data.result && data.result.data
    console.log(Data,'Data')
   
    let title = "Trade History";
    const headers = [
     
        'Date',
        'Reference Id',
        'Buyer Id',
        'Seller Id',
        'Base Currency',
        'Quote Currency',
        'Side',
        'Price',
        'Executed',
        'Total',
        'Buy Fee',
        'Sell Fee',
     
    ]
    let rows = []
    Data.map((item) =>
      rows.push({
       "Date": momentFormat(item.createdAt.toString()),
       'Reference Id': item._id,
       'Buyer Id': item.buyUserCode,
       'Seller Id':item.sellUserCode,
       'Base Currency': item.firstCurrency,
       'Quote Currency': item.secondCurrency,
       'Side': item.isMaker,
       'Price':String(item.tradePrice),
       'Executed':String(item.tradeQty),
       'Total':String(item.orderValue),
       'Buy Fee': convert(item.buyerFee),
       'Sell Fee': convert(item.sellerFee),
      })
    )
    console.log(rows,'rows')
   exportCSV(title, headers, rows, type);
  } catch (err) {
    console.log(err,'eee')
  }
}
export const tradeXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Trade History.xls')
    document.body.appendChild(link)
    link.click()
  } catch (err) {}
}
const exportCSV = async (title, headers, rows, type) => {
  let separator = ";";
console.log(title, headers, rows, type,'title, headers, rows, type')
  let csvContent = `${headers.join(separator)}\n${rows.map((row) => headers.map((k) => {
    console.log(row[k],'row[k]')
      let cell = row[k] === null || row[k] === undefined ? "" : row[k];

      cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');

      if (cell.search(/("|,|\n)/g) >= 0)
        cell = `"${cell}"`;
      
      return cell;
    }).join(separator)
  ).join("\n")}`;

  let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // In case of IE 10+
    navigator.msSaveBlob(blob, title);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", type == "csv" ? title : `${title}.xlsx`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};