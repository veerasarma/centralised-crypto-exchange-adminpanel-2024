//import config
import config from '../../config'
import axios from '../../config/axios'

export const getDashboard = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getDashboard`,
      params: data,
    })
    return {
      status: true,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
export const getAdminBal = async () => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getAdminBal`,
    })
    return {
      status: true,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
export const getUserData = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getUserData`,
    })
    return {
      status: true,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
export const getDashChart = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getDashChart`,
      params: data,
    })
    return {
      status: true,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}

export const getUserChart = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getUserChart',
    })
    return {
      success: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getDepositChart = async () => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getDepositChart',
    })
    return {
      success: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getWithdrawChart = async () => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getWithdrawChart',
    })
    return {
      success: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getTicketChart = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getTicketChart',
    })
    return {
      success: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getNotification = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getNotification',
    })
    return {
      status: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getWalletNotify = async () => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getNotification',
    })
    console.log(respData)
    return {
      status: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}

export const getTradeNotify = async () => {
  try {
    console.log('caller')
    let respData = await axios({
      baseURL: config.SPOT_SERVICE.URL,
      method: 'get',
      url: '/api/admin/getNotification',
    })
    console.log(respData)
    return {
      status: respData.data.success,
      result: respData.data.result,
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: error.response.data.message,
      error: error.response.data.errors,
    }
  }
}
