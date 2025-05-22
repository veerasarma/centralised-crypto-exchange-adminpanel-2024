import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'

const ToastCAlert = (props) => {
  const { message, type } = props

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast autohide={false} visible={true}>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">CoinBank Exchange</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast >
  )
  useEffect(() => {
    addToast(exampleToast)
  }, [])
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

ToastCAlert.propTypes = {
  message: PropTypes.any,
  type: PropTypes.any,
}

export default ToastCAlert
