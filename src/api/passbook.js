import axios from '../config/axios'
import { handleResp } from '../config/axios'
import config from '../config'

export const getpassbookList = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: config.WALLET_SERVICE.URL + `/api/admin/getpassbook`,
      params: data,
    })
    if (data.export === 'csv' || data.export === 'xls') {
      return handleResp(respData, 'success', true)
    } else {
      return { success: respData.data.success, result: respData.data, errors: respData.data.errors }
    }
  } catch (err) {
    return handleResp(err, 'error')
  }
}
