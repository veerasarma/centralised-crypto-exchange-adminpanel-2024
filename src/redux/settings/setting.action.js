// import type
import { SET_SETTING } from "./type";

export const setting = (data, dispatch) => {
  dispatch({
    type: SET_SETTING,
    setting: data,
  });
};