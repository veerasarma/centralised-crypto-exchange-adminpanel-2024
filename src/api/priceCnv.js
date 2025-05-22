import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const getList = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/priceCNV`, //priceCNV -- price conversion
      method: 'get',
      params: reqData,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const findById = async (id) => {
  try {
    const respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      url: `/api/admin/edit-cnv/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const editCnv = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.WALLET_SERVICE.URL,
      method: 'put',
      url: `/api/admin/priceCNV`, //priceCNV -- price conversion
      data: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
