import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const orderHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.WALLET_SERVICE.URL + `/api/admin/depositList`,
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
export const withdarwHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.WALLET_SERVICE.URL + `/api/admin/withdrawList`,
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
