import { DISPLAY_TOAST } from './type'

const initialState = {
  id: '',
  message: '',
  type: '',
}

const toast = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_TOAST:
      return {
        ...action.toast,
      }
    default:
      return state
  }
}

export default toast
