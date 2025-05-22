import React, { useEffect, useRef, useState } from 'react'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import config from "../config/index.js"
// import action
import { toast } from '../redux/toast/toast.action'

const ToastCAlert = () => {
  const dispatch = useDispatch()

  // state
  const [display, addDisplay] = useState(0)
  const toaster = useRef()

  //redux-state
  const { type, message } = useSelector((state) => state.toast)
  const { siteName } = useSelector((state) => state?.Setting);
  const exampleToast = (
    <CToast show="true" position="static">
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
        <strong className="me-auto">{siteName}</strong>
      </CToastHeader>
      <CToastBody style={{ color: type === 'success' ? 'green' : 'red' }}>{message}</CToastBody>
    </CToast>
  )

  useEffect(() => {
    if (type && type !== undefined) {
      addDisplay(exampleToast)
      toast({}, dispatch)
    }
  }, [type])

  return <CToaster ref={toaster} push={display} placement="top-end" />
}

export default ToastCAlert
