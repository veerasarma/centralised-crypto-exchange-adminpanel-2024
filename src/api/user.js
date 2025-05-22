//import config
import axios from '../config/axios'
import config from '../config'
import { handleResp } from '../config/axios'

export const getAllUserApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/user`,
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
export const getLoginHist = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/userLoginHist`,
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
export const addFeeManagement = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: '/api/admin/fee-management',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const findById = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      url: `/api/admin/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const ignoreTradeFee = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: '/api/admin/ingore-trade-fee',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const announcement = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: '/api/admin/anouncement',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const resendMailApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: '/api/admin/resendMail',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const disable2FaApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: '/api/admin/disable-2fa',
      data,
    })
    console.log(respData, 'respData123')
    return {
      status: respData.data.status,
      message: respData.data.message,
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getUserAssetApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getUserAsset`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const userLockStatus = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: '/api/admin/user-locked',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getAdminProfile = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: 'api/admin/adminProfile',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const updateProfile = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: 'api/admin/adminProfile',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const changePassword = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `api/admin/adminProfile`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getAllUserKycApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/userKyc`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getAllUserRegKycApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/userKycRejections`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getUserKycDetails = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/userKycDetails`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const approveUserKyc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/userKyc`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const rejectUserKyc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/userKyc`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const userActivate = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: '/api/admin/userActivate',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const updateUserAsset = async (data) => {
  try {
    let respdata = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'put',
      url: '/api/admin/updateUserAsset',
      data,
    })
    return respdata.data
  } catch (error) {
    return handleResp(error, 'error')
  }
}

export const forceRejectionKYC = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL + '/api/admin/forceRejectKyc',
      method: 'post',
      data,
    })
    return respData.data
  } catch (error) {
    return handleResp(error, 'error')
  }
}

export const getSingleUserApi = async (id) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL + `/api/admin/getsingleuser/` + id,
      method: 'get',
    })
    return respData.data
  } catch (error) {
    return handleResp(error, 'error')
  }
}