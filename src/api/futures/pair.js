import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const getPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.FUTURES_SERVICE.URL,
      method: 'get',
      url: `/api/admin/perpetualPair`,
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
      baseURL: config.FUTURES_SERVICE.URL,
      method: 'post',
      url: `/api/admin/perpetualPair`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const editPair = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.FUTURES_SERVICE.URL,
      method: 'put',
      url: `/api/admin/perpetualPair`,
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
      baseURL: config.FUTURES_SERVICE.URL,
      url: `/api/admin/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
