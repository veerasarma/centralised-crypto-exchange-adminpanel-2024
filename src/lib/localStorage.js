export const getAuthToken = () => {
  if (localStorage.getItem('admin_token')) {
    return localStorage.getItem('admin_token')
  }
  return ''
}

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('admin_token', token)
  }
}

export const isLogin = () => {
  if (localStorage.getItem('admin_token')) {
    return true
  }
  return false
}
