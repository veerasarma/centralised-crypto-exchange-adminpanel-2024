import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const getModulesList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/modules`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getSingleModule = async (id) => {
  try {
    // console.log(id, 'idddddddddd')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/singlemodule/` + id,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const addModule = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/modules`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const Updatemodule = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/modules`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const DeleteModule = async (data) => {
  try {
    // console.log(data, 'datttttttttt')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/modules`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
