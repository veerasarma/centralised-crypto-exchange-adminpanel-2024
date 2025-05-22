import axios from '../../config/axios'
import { handleResp } from '../../config/axios'
import config from '../../config'

export const List = async (data) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/staking`,
      method: 'get',
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const addStaking = async (data) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/staking`,
      method: 'post',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const editStaking = async (data) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/staking`,
      method: 'put',
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const findById = async (id) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/staking/find-id/` + id,
      method: 'get',
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const StakeOrderList = async (data) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/stakingorderHistory`,
      method: 'get',
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

export const StakeSettleList = async (data) => {
  try {
    const respData = await axios({
      url: config.STAKING_SERVICE.URL + `/api/admin/stakingsettlementHistory`,
      method: 'get',
      params: data,
    })
   console.log(respData,'respData')
   if (data.export === 'csv' || data.export === 'xls') {
    return handleResp(respData, 'success', true)
  } else {
    return { success: respData.data.success, result: respData.data, errors: respData.data.errors }
  }
    
    
  } catch (err) {
    return handleResp(err, 'error')
  }
}
