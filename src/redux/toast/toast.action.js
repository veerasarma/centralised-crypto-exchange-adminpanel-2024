// import type
import { capitalize } from 'src/lib/string'
import { DISPLAY_TOAST } from './type'

export const toast = (data, dispatch) => {
  dispatch({
    type: DISPLAY_TOAST,
    toast: {
      message: capitalize(data.message),
      type: data.type,
    },
  })
}
