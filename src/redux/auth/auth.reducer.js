import { SET_AUTHENTICATION } from './type'

const initialState = {
  isAuth: false,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        ...action.authData,
      }
    default:
      return state
  }
}

export default auth
