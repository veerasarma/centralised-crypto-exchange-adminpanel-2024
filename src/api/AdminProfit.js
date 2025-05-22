import axios from '../config/axios'
import { handleResp } from '../config/axios'
import config from '../config'

export const getAdminprofit = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.USER_SERVICE.URL + `/api/admin/admin-profit`,
      params: data,
    })
    if (data.export === 'csv' || data.export === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      console.log(respData, 'respData')
      return {
        success: respData.data.success,
        result: respData.data,
        errors: respData.data.errors,
        count: respData.count,
      }
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
