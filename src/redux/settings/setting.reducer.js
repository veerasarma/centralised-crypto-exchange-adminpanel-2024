import { SET_SETTING } from "./type";

const initialState = {};

const setting = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      return {
        ...action.setting,
      };
    default:
      return state;
  }
};

export default setting;