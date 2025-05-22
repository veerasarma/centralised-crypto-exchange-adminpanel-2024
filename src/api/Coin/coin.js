//import config
import config from '../../config'
import axios from '../../config/axios'
import { handleResp } from '../../config/axios'

export const getCurrencyList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: `/api/admin/currency`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const addCurrency = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/currency`,
      method: 'post',
      data: reqData,
    })
    return {
      status: 'success',
      message: respData.data.message,
    }
  } catch (err) {
    return {
      status: 'failed',
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
export const getListing = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: `/api/admin/listing`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const delListing = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/listing`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const addListing = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/listing`,
      method: 'post',
      data: reqData,
    })
    return {
      status: 'success',
      message: respData.data.message,
    }
  } catch (err) {
    return {
      status: 'failed',
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
export const updateListing = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/listing`,
      method: 'put',
      data: reqData,
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
      error: err.response.data.errors,
    }
  }
}

export const updateCurrency = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/currency`,
      method: 'put',
      data: reqData,
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
      error: err.response.data.errors,
    }
  }
}

export const getSingleCurrency = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/singleCurrency/` + id,
      method: 'get',
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

export const getSingleList = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/singleListing/` + id,
      method: 'get',
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

export const getCurrency = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getCurrency`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
