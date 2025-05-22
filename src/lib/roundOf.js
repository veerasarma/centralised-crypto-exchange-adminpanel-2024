// import lib
import isEmpty from './isEmpty';

export const toFixed = (item, type = 2) => {
  try {
    if (!isEmpty(item) && !isNaN(item)) {
      item = parseFloat(item)
      return item.toFixed(type)
    }
    return ''
  } catch (err) {
    return ''
  }
}
export const toFixedDown = (item, type = 2) => {
  try {
    if (!isEmpty(item) && !isNaN(item)) {
      item = parseFloat(item)
      let decReg = new RegExp("(\\d+\\.\\d{" + type + "})(\\d)"),
        m = item.toString().match(decReg);
      return m ? parseFloat(m[1]) : item.valueOf();
    }
    return ''
  } catch (err) {
    return ''
  }
}

export const currencyFormat = (item) => {
  try {
    if (!isEmpty(item) && !isNaN(item)) {
      item = item.toString();
      let splitValue = item.split('.')
      return splitValue[1] ? `${splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${splitValue[1]}` : splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return ''
  } catch (err) {
    return ''
  }
}

Number.prototype.toFixedNoRounding = function (n) {
  const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");
  const a = this.toString().match(reg)[0];
  const dot = a.indexOf(".");
  if (dot === -1) {
    // integer, insert decimal dot and pad up zeros
    return a + "." + "0".repeat(n);
  }
  const b = n - (a.length - dot) + 1;
  return b > 0 ? a + "0".repeat(b) : a;
};



export const longNumbers = (x, n) => {
  try {

    if (!isEmpty(x) && !isNaN(x)) {
      if (x < 0.000001) {
        return 0.0
      } else if (x > 100) {
        if (n < 2) {
          x = x.toFixedNoRounding(n);
          return x
        }
        x = x.toFixedNoRounding(2);
        return x;
      }
      return x.toFixedNoRounding(n);
    }
    return ""
  } catch (err) {
    return "";
  }
};


// export const truncateDecimals = function (number, digits) {
//   var multiplier = Math.pow(10, digits),
//       adjustedNum = number * multiplier,
//       truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

//   return truncatedNum / multiplier;
// };




export const toFixedNoRound = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
};


export const convert = (n) => {
  try {
    var sign = +n < 0 ? '-' : '',
      toStr = n.toString()
    if (!/e/i.test(toStr)) {
      return n
    }
    var [lead, decimal, pow] = n
      .toString()
      .replace(/^-/, '')
      .replace(/^([0-9]+)(e.*)/, '$1.$2')
      .split(/e|\./)
    return +pow < 0
      ? sign + '0.' + '0'.repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal
      : sign +
      lead +
      (+pow >= decimal.length
        ? decimal + '0'.repeat(Math.max(+pow - decimal.length || 0, 0))
        : decimal.slice(0, +pow) + '.' + decimal.slice(+pow))
  } catch (err) {
    return 0
  }
}

export const truncateDecimals = (num, decimals) => {
  num = convert(num)
  let
    s = num.toString()
    , p = s.indexOf('.')
    ;
  s += (p < 0 ? (p = 1 + s.length, '.') : '') + '0'.repeat(decimals)
  return s.slice(0, p + 1 + decimals)
}