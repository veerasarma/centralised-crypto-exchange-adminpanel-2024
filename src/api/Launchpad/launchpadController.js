import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const getLaunchpad = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.LAUNCHPAD_SERVICE.URL + `/api/admin/launchpad`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const addLaunchpad = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: config.LAUNCHPAD_SERVICE.URL + `/api/admin/launchpad`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const findLaunchpadById = async (id) => {
  try {
    const respData = await axios({
      url: config.LAUNCHPAD_SERVICE.URL + `/api/admin/edit-launchpad/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const editlaunchpad = async (data) => {
  try {
    let respData = await axios({
      method: 'put',
      url: config.LAUNCHPAD_SERVICE.URL + `/api/admin/launchpad`,
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    console.log('eeeeeeeeeerrr', err)
    return handleResp(err, 'error')
  }
}
