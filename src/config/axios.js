// import packages
import axios from 'axios'

// import lib
import config from './index'
import { getAuthToken } from '../lib/localStorage'
import { logout } from "src/redux/auth/auth.action";
axios.defaults.baseURL = config.API_URL
axios.defaults.headers.common['Authorization'] = getAuthToken()
// axios.defaults.headers.common['timezone'] = Number(new Date().getTimezoneOffset())
axios.defaults.headers.common['timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

export const setAuthorization = (token) => {
  axios.defaults.headers.common['Authorization'] = token
}
export const handleResp = (respData, type = 'success', doc) => {
  try {
    // console.log('...ttt', respData.data)
    if (doc === true && type == 'success' && respData && respData.data) {
      return { data: respData.data }
    }
    if (type == 'success' && respData && respData.data) {
      return respData.data
    } else if (type == 'error' && respData && respData.response && respData.response.data) {
      return respData.response.data
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      }
    }
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

// axios.interceptors.response.use((response) => response, (error) => {
//   if (error.response && error.response.status === 401) {
//     localStorage.removeItem('admin_token')
//     logout({}, store.dispatch)
//     setTimeout(() => {
//       window.location.href = '/login'
//     }, 500);
//     // window.location.href = '/login'
//   }
//   return Promise.reject(error);
// });
export default axios
