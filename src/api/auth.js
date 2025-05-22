//import config
import axios from '../config/axios'
import config from '../config'
import { handleResp } from '../config/axios'
import { role } from 'src/redux/role/role.action'

export const loginApi = async (data, dispatch) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/login`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const forgotPasswordApi = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: config.USER_SERVICE.URL + `/api/admin/forgotPassword`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const resetPasswordApi = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: config.USER_SERVICE.URL + `/api/admin/resetPassword`,
      data,
    })
    return {
      status: 'success',
      loading: false,
      message: respData.data.message,
    }
  } catch (err) {
    return {
      status: 'failed',
      loading: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}

export const getGeoInfoData = async (data) => {
  try {
    // let respData = await axios({
    //   method: 'get',
    //   url: 'https://ipapi.co/json/',
    // });
  } catch (err) {
    console.log(err, 'err68')
    return {
      success: false,
      error: err.response.data.errors,
    }
  }
}

export const getAdminData = async (dispatch) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `api/admin/getadmindetail`,
    })
    // console.log(respData.data.result, 'dataaaaaaaaaaaaaa')

    role(
      {
        role: respData.data.result.role,
        restriction: respData.data.result.restriction,
      },
      dispatch,
    )
    // dispatch(setdata(respData.data.result))
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getPath = async (data) => {
  try {
    let respData = await axios({
      method: 'get',
      url: `/adminApi/getpath`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const CheckTokenAuth = async (data) => {
  try {
    let respData = await axios({
      method: 'post',
      url: config.USER_SERVICE.URL + `/api/admin/checkauthtoken`,
      data,
    })
    return {
      status: 'success',
      loading: false,
      message: respData.data.message,
    }
  } catch (err) {
    return {
      status: 'failed',
      loading: false,
      message: err.response.data.message,
      error: err.response.data.errors,
    }
  }
}