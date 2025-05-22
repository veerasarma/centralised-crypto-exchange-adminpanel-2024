import axios from '../../config/axios'
import config from "../../config";
import { handleResp } from '../../config/axios'
export const orderHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: "get",
      url: `/api/admin/p2p/orderReport`,
      params: data,
    });
    if (data.export === 'csv' || data.export === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      return handleResp(respData, 'success')
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const reportHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: "get",
      url: `/api/admin/p2p/getReports`,
      params: data,
    });
    if (data.export === 'csv' || data.export === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      return handleResp(respData, 'success')
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getsingleReport = async (reportId) => {
  try {
    
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'get',
      url: `/api/admin/p2p/single-report/${reportId}`
    })

    return { success: respData.data.success, result: respData.data.result }

  } catch (error) {
    return { success: false, result: '' }
  }
}

export const updatesingleReport = async (reportId, data) => {
  try {
    
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'put',
      url: `/api/admin/p2p/single-report/${reportId}`,
      data
    })

    return { success: respData.data.success, message: respData.data.message }

  } catch (error) {
    return { success: false, message: error.response.data.message }
  }
}