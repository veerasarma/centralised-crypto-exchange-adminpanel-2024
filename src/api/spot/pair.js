import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const getPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotPair`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getPairList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/spotPair-list`,
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
      baseURL: config.SPOT_SERVICE.URL,
      method: 'post',
      url: `/api/admin/spotPair`,
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
      baseURL: config.SPOT_SERVICE.URL,
      url: `/api/admin/find-id/` + id,
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
      baseURL: config.SPOT_SERVICE.URL,
      method: 'put',
      url: `/api/admin/spotPair`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const newBot = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'post',
      url: `/api/admin/newBot`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const newVolBot = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'post',
      url: `/api/admin/newVolBot`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const cancelBot = async (botId) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/bot-order-cancel/` + botId,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const editBot = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'put',
      url: `/api/admin/newBot`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const editVolBot = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'put',
      url: `/api/admin/newVolBot`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getBotList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/botList`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getVolBotList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/volBotList`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const botFindById = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      url: `/api/admin/bot-find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const volBotFindById = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      url: `/api/admin/vol-bot-find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const addBotUser = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'post',
      url: `/api/admin/add-bot-user`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getBotUser = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: `/api/admin/add-bot-user`,
      params: data
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}