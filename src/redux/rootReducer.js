//import package
import { combineReducers } from 'redux'

import auth from '../redux/auth/auth.reducer'
import changeState from './changeReducer'
import toast from './toast/toast.reducer'
import role from './role/role.reducer'
import DateFillter from './dateFillter/dateFilter.reducer'
import Setting from "./settings/setting.reducer";
export default combineReducers({
  auth,
  changeState,
  toast,
  role,
  DateFillter,
  Setting
})
