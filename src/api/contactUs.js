//import config
import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const cotactusList = async (data) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      url: `/api/admin/contactus`,
      method: 'get',
      params: data,
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
      url: `/api/admin/contact/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const replyContact = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: '/api/admin/replycontact',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
