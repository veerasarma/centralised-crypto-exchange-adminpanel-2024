import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'
export const getTokenHistory = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.LAUNCHPAD_SERVICE.URL + '/api/admin/purchaseToken',
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
