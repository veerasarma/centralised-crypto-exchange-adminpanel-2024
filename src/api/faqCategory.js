import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const getCategoryList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/faqCategory`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getSingleCategory = async (id) => {
  try {
    // console.log(id, 'idddddddddd')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getcategory/` + id,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const addCategory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/faqCategory`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const UpdateCategory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/faqCategory`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const DeleteCategory = async (data) => {
  try {
    // console.log(data, 'datttttttttt')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/faqCategory`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getFaqList = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/faq`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getSingleFaq = async (id) => {
  try {
    // console.log(id, 'idddddddddd')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getFaq/` + id,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getFaqCategory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getFaqCategory`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const AddFaq = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/faq`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const UpdateFaq = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/faq`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const DeleteFaq = async (data) => {
  try {
    // console.log(data, 'datttttttttt')
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/faq`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
