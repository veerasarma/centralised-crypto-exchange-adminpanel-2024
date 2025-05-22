import config from '../config'
import axios from '../config/axios'

export const get2FAStatus = async () => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.USER_SERVICE.URL + '/api/admin/2fa-status',
    })

    return {
      status: respData.data.status,
      subStatus: respData.data.subStatus,
    }
  } catch (error) {
    return {
      status: false,
      subStatus: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}

export const get2FA = async () => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.USER_SERVICE.URL + '/api/admin/2fa',
    })

    return {
      status: respData.data.success,
      result: respData.data.result,
      message: respData.data.message,
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message ? error.response.data.message : error.message,
    }
  }
}

export const post2FAotp = async (data) => {
  try {
    let respData = await axios({
      method: 'put',
      url: config.USER_SERVICE.URL + '/api/admin/2fa',
      data,
    })
    console.log(respData, 'respp51')
    return {
      status: respData.data.success,
      result: respData.data.result,
      message: respData.data.message,
    }
  } catch (error) {
    return {
      status: 'failed',
      loading: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const postDisable2FA = async (data) => {
  try {
    let respData = await axios({
      method: 'patch',
      url: config.USER_SERVICE.URL + '/api/admin/2fa',
      data,
    })
    return {
      status: respData.data.success,
      result: respData.data.result,
      message: respData.data.message,
    }
  } catch (error) {
    return {
      status: 'failed',
      loading: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const get2FAData = async () => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.USER_SERVICE.URL + '/api/admin/2fa-data',
    })
    return respData.data
  } catch (error) {
    return { uri: '', secret: '' }
  }
}
