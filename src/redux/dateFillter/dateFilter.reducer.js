import { SET_DATE_FILLTER } from './type'

const initialState = {
  isDate: false,
  filters: [],
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE_FILLTER':
      return {
        ...state,
        ...action.dateFilter,
      }
    default:
      return state
  }
}

export default auth
