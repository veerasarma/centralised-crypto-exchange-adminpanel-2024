//import lib
import { decodeJwt } from '../../lib/jsonWebToken'

//import type
import { SET_AUTHENTICATION } from './type'

export const login = (data, dispatch) => {
  const decodeToken = decodeJwt(data)
  if (decodeToken) {
    dispatch({
      type: SET_AUTHENTICATION,
      authData: {
        isAuth: true,
        userId: decodeToken._id,
        role: decodeToken.role,
        restriction: decodeToken.restriction,
      },
    })
  }
}

export const logout = (data, dispatch) => {
  dispatch({
    type: SET_AUTHENTICATION,
    authData: {
      isAuth: false,
      userId: '',
      role: '',
      restriction: '',
    },
  })
}
