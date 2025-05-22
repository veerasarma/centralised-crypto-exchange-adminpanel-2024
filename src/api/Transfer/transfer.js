//import config
import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'
export const getDepositList = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/depositList`,
      method: 'get',
      params: data,
    })
    // return {
    //   status: true,
    //   loading: false,
    //   result: respData.data.result,
    // }
    console.log('...respData', respData)

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
    // return {
    //   status: 'failed',
    //   loading: false,
    // }
  }
}
export const getInvalidDepositList = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/invalid-depositList`,
      method: 'get',
      params: data,
    })
    // return {
    //   status: true,
    //   loading: false,
    //   result: respData.data.result,
    // }
    console.log('...respData', respData)

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
    // return {
    //   status: 'failed',
    //   loading: false,
    // }
  }
}

export const getWithdrawList = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/withdrawList`,
      method: 'get',
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const approveCoinWithdraw = async (id) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/coinWithdraw/approve/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const rejectCoinWithdraw = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/coinWithdraw/reject`,
      method: 'post',
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const approveFiatWithdraw = async (id) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/fiatWithdraw/approve/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const rejectFiatWithdraw = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/fiatWithdraw/reject`,
      method: 'post',
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const approveFiatDeposit = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/fiatDeposit/approve`,
      method: 'post',
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const rejectFiatDeposit = async (data) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/fiatDeposit/reject`,
      method: 'post',
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const findById = async (id) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/withdraw/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const depositId = async (id) => {
  try {
    const respData = await axios({
      url: config.WALLET_SERVICE.URL + `/api/admin/deposit/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
