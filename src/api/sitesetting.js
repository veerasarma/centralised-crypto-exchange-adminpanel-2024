// import config
import config from '../config'
import axios from '../config/axios'
import { handleResp } from '../config/axios'
import { setting } from "src/redux/settings/setting.action";
export const getSiteSettingRedux = async (dispatch) => {
  try {
    let respData = await axios({
      method: "get",
      url: `/api/admin/getSiteSetting`,
    });

    setting(respData.data.result,dispatch);
    
    return {
      status: true,
      result: respData.data.result,
    };
  } catch (err) {
    handleResp(err, "error");
    return {
      status: false,
    };
  }
};
export const getSiteSetting = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getSiteSetting`,
      params: data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const updateSetting = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/updateSiteSetting`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const updateSiteDetail = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/updateSiteDetails`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const updateBanner = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/updateSiteDetails`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const updateUsrDash = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'put',
      url: `/api/admin/updateUsrDash`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const getPairDropdown = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getPairDropdown`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const updateMailIntegrate = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/updatemailintegrate`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const getMailIntegrate = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/getemailintegrate`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}
export const updatesmsConfig = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/updatesmsconfig`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const GetSliderManage = async () => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'get',
      url: `/api/admin/slider`,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const UpdateSliderManage = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'post',
      url: `/api/admin/slider`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

export const DeleteSliderManage = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.USER_SERVICE.URL,
      method: 'delete',
      url: `/api/admin/slider`,
      data,
    })
    return handleResp(respData, 'success')
  } catch (err) {
    return handleResp(err, 'error')
  }
}

