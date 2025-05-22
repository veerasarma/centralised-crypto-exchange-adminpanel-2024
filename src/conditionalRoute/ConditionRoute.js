import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import nav from 'src/_nav'
import { useSelector } from 'react-redux'

// import lib
import { isLogin } from '../lib/localStorage'

const ConditionRoute = (props) => {
  const { type, children } = props
  const currentLocation = useLocation()
  let { restriction, role } = useSelector((state) => state.role)
  const [restrictData, setresData] = useState('')

  useEffect(() => {
    if (restriction && restriction.length > 0) {
      let Data =
        nav &&
        nav.length > 0 &&
        nav.find((el) =>
          el.items
            ? el.to == currentLocation.pathname ||
            el.items.find((data) => data.to == currentLocation.pathname)
            : el.to == currentLocation.pathname,
        )
      if (Data) {
        setresData(
          restriction &&
          restriction.length > 0 &&
          restriction.find((el) =>
            Data.items
              ? Data.name == el &&
              Data.items.find((data) => {
                restriction && restriction.length > 0 && restriction.includes(data.name)
              })
              : Data.name == el,
          ),
        )
      }

    }
  }, [restriction])

  if (type === 'auth' && isLogin() === true) {
    return <Navigate to="/dashboard" />
  } else if (type === 'private' && isLogin() !== true) {
    return <Navigate to="/login" />
  }
  // else if (role != 'superadmin' && restrictData == undefined) {
  //   return <Navigate to="/404" />
  // }

  return children
}

ConditionRoute.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default React.memo(ConditionRoute)
