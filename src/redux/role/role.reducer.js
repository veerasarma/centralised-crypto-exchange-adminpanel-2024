import { ROLE_DATA } from './type'

const initialState = {
  role: '',
  restriction: '',
}

const role = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_DATA:
      return {
        ...action.role,
      }
    default:
      return state
  }
}

export default role
