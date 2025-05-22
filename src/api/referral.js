import config from '../config'
import axios, { handleResp } from '../config/axios'

export const getReferral = async () => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/referrals',
      method: 'get',
    })
    return respData.data
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}

export const postReferralSetting = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/referrals',
      method: 'put',
      data,
    })
    return respData.data
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message ? error.response.data.message : error.message,
      errors: error.response.data.errors,
    }
  }
}

export const getRefferalList = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/referralList',
      method: 'get',
      params: reqData,
    })
    if (reqData.export && (reqData.export === 'xls' || reqData.export === 'csv')) {
      return { result: '', ...handleResp(respData, 'success', true) }
    } else {
      return respData.data
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}

export const getRefferalBonus = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/getRefferalBonus',
      method: 'get',
      params: reqData,
    })
    if (reqData.export && (reqData.export === 'xls' || reqData.export === 'csv')) {
      return { result: '', ...handleResp(respData, 'success', true) }
    } else {
      return respData.data
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}

export const getRefferalTradeBonus = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/getRefferalTradeBonus',
      method: 'get',
      params: reqData,
    })
    if (reqData.export && (reqData.export === 'xls' || reqData.export === 'csv')) {
      return { result: '', ...handleResp(respData, 'success', true) }
    } else {
      return respData.data
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}
