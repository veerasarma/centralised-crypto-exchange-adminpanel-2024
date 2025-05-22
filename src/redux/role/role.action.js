// import type
import { ROLE_DATA } from './type'

export const role = (data, dispatch) => {
  dispatch({
    type: ROLE_DATA,
    role: {
      role: data.role,
      restriction: data.restriction,
    },
  })
}
