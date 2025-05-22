//import config
import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const loginHistoryApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/login-history`,
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
export const SubloginHistoryApi = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/sub-login-history`,
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
export const addIpAddress = async (data) => {
  try {
    console.log('datadata', data)
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/IpRestriction`,
      data: data,
    })

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getIpList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/IpRestriction`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const deleteIpAddress = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/IpRestriction`,
      data: data,
    })

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getUsersEmail = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: `/api/admin/news-letter`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const sendNewsLetter = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: `/api/admin/news-letter`,
      data: data,
    })

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const searchDateFillter = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: `/adminapi/searchDateFillter`,
      data: data,
    })

    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
