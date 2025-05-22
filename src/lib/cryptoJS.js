import { isEmpty } from './validate'
//Including all libraries, for access to extra methods.
var CryptoJS = require('crypto-js')

export const encryptString = (encryptValue, isSpecialCharacters = false) => {
  try {
    encryptValue = encryptValue.toString()
    let ciphertext = CryptoJS.AES.encrypt(encryptValue, '1234567812345678').toString()
    if (isSpecialCharacters) {
      return replaceSpecialCharacter(ciphertext, 'encrypt')
    }
    return ciphertext
  } catch (err) {
    return ''
  }
}

export const decryptString = (decryptValue, isSpecialCharacters = false) => {
  try {
    if (isSpecialCharacters) {
      decryptValue = replaceSpecialCharacter(decryptValue, 'decrypt')
    }

    let bytes = CryptoJS.AES.decrypt(decryptValue, '1234567812345678')
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  } catch (err) {
    console.log(err)
    return ''
  }
}

export const replaceSpecialCharacter = (value, type) => {
  try {
    let textValue = value
    if (!isEmpty(textValue)) {
      if (type === 'encrypt') {
        // textValue = textValue.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
        textValue = textValue
          .toString()
          .replace(/\+/g, 'xMl3Jk')
          .replace(/\//g, 'Por21Ld')
          .replace(/\=/g, 'Ml32')
      } else if (type === 'decrypt') {
        // textValue = textValue.replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
        textValue = textValue
          .replace(/\xMl3Jk/g, '+')
          .replace(/\Por21Ld/g, '/')
          .replace(/\Ml32/g, '=')
      }
    }
    return textValue
  } catch (err) {
    return ''
  }
}
