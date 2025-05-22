// import package
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isLogin } from 'src/lib/localStorage'
// import action
import { getAdminData } from 'src/api/auth'
import { getSiteSettingRedux } from "src/api/sitesetting";
const HelperRoute = () => {
  const dispatch = useDispatch()

  // function
  useEffect(() => {
    if (isLogin()) {
      getAdminData(dispatch)
    }
    getSiteSettingRedux(dispatch);
  }, [])

  return <div />
}

export default HelperRoute
