import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const getPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'get',
      url: `/api/admin/p2pPair`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getCurrency = async () => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/getCurrency`,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const addPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'post',
      url: `/api/admin/p2pPair`,
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
      baseURL: config.P2P_SERVICE.URL,
      url: `/api/admin/edit-p2p-pair/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const editPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'put',
      url: `/api/admin/p2pPair`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    console.log('🚀 ~ file: pair.js ~ line 50 ~ editPair ~ err', err)
    return handleResp(err, 'error')
  }
}

export const getP2pTrade = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'get',
      url: `/api/admin/p2p/orderReport`,
      params: data,
    })
    // return handleResp(respData, 'success')
    return {
      success: respData.data.success,
      result: { data: respData.data.result, count: respData.data.count },
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getP2pTradeDispute = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'get',
      url: `/api/admin/p2p/disputeList`,
      params: data,
    })
    return {
      success: respData.data.success,
      result: { data: respData.data.result, count: respData.data.count },
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getDispute = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      url: `/api/admin/p2p/getOrderReport/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const disputeResolve = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'post',
      url: `/api/admin/p2p/disputeResolve`,
      data: data,
    })

    return {
      status: 'success',
      loading: false,
      message: respData.data.message,
    }
  } catch (err) {
    return {
      status: 'failed',
      loading: false,
      message: err.response.data.message,
    }
  }
}
export const adminConversation = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'post',
      url: `/api/admin/p2p/adminConversation`,
      data: data,
    })

    return {
      status: 'success',
      loading: false,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: 'failed',
      loading: false,
      message: err.response.data.message,
    }
  }
}

export const getP2pReports = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.P2P_SERVICE.URL,
      method: 'get',
      url: `/api/admin/p2p/getReports`,
      params: data,
    })
    // return handleResp(respData, 'success')
    return {
      success: respData.data.success,
      result: { data: respData.data.result, count: respData.data.count },
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}