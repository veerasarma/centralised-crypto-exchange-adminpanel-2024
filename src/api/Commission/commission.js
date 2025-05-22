//import config
import axios from '../../config/axios'

export const getCommisssion = async (data) => {
  try {
    const respData = await axios({
      url: `/adminapi/get-commission`,
      method: 'get',
      params: data,
    })
    return {
      status: true,
      message: respData.data.message,
      result: respData.data.result,
    }
  } catch (err) {
    return {
      status: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}
