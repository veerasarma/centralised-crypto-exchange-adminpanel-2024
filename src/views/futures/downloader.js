import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
//import lib
import { momentFormat } from "../../lib/date";
export const closedPnlPDF = (data) => {
  try {
    let resultArr = [];
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, "YYYY-MM-DD HH:mm"),
        item.userCode,
        item.symbol,
        item.quantity,
        item.entryPrice,
        momentFormat(item.openAt, "YYYY-MM-DD HH:mm"),
        item.exitPrice,
        momentFormat(item.closedAt, "YYYY-MM-DD HH:mm"),
        item.pnl,
      ]);
    });
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(13);

    const title = "Future Closed PNL";
    const headers = [
      [
        "Date",
        "User Id",
        "Symbol",
        "Amount",
        "Entry Price",
        "Open Time",
        "Exit Price",
        "Close Time",
        "Realized PNL",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("FutureClosedPNL.pdf");
  } catch (err) { }
};

export const closedPnlCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "FutureClosedPNL.csv");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};
export const closedPnlXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "FutureClosedPNL.xls");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};

/////////////////trade history
export const tradePDF = (data) => {
  try {
    let resultArr = [];
    data.map((item) => {
      resultArr.push([
        momentFormat(item.orderDate, "YYYY-MM-DD HH:mm"),
        item.userCode,
        item.pair,
        item.buyorsell == 'buy' ? 'Long' : 'Short',
        item.orderCost,
        item.quantity,
        item.volume,
      ]);
    });
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(13);

    const title = "Trade History";
    const headers = [
      ["Date", "User Id", "Contracts", "Side", "Price", "Quantity", "Volume"],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Perpetual Trade.pdf");
  } catch (err) { }
};

export const tradeCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Future Trade.csv");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};
export const tradeXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Future Trade.xls");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};

/////////////////funding history

export const fundingPDF = (data) => {
  try {
    let resultArr = [];
    data.map((item) => {
      resultArr.push([
        momentFormat(item.createdAt, "YYYY-MM-DD HH:mm"),
        item.userCode,
        item.pairName,
        item.leverage,
        item.filledQuantity,
        item.price,
        item.fundingRate,
        item.feePaid,
        item.direction,
        item.type,
      ]);
    });
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(13);

    const title = "Funding Rate History";
    const headers = [
      [
        "createdAt",
        "user Code",
        "pai rName",
        "leverage",
        "filled Quantity",
        "price",
        "funding Rate",
        "fee Paid",
        "direction",
        "type",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: resultArr,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("funding.pdf");
  } catch (err) { }
};

export const fundingCSV = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "funding.csv");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};
export const fundingXLS = (data) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "funding.xls");
    document.body.appendChild(link);
    link.click();
  } catch (err) { }
};
