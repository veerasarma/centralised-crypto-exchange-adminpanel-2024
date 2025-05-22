import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'

export const getsmsLog = async (reqData) => {
  try {
    const respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      url: `/api/admin/smslog`,
      params: reqData,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
