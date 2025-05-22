import config from '../../config'
import axios from '../../config/axios'
import { handleResp } from '../../config/axios'

export const orderHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotOrderHistory`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const orderHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotOrderHistory-doc`,
      params: data,
    })
    if (data.doc === 'csv' || data.doc === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      return handleResp(respData, 'success')
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const tradeHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotTradeHistory`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return !err.response.data.success ? err.response.data : err.message
  }
}

export const tradeUserHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotTradeUserHistory`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const tradeHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotTradeHistory-doc`,
      params: data,
    })
    if (data.export === 'csv' || data.export === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      return handleResp(respData, 'success')
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
