import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCol,
  CFormInput,
  CFormLabel,
  CHeader,
  CImage,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import {

  cilCopy,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { get2FA, get2FAData, get2FAStatus, post2FAotp, postDisable2FA } from 'src/api/2FA'
import { toastAlert } from 'src/lib/toastAlert'
import { toast } from 'src/redux/toast/toast.action'
import { CopyToClipboard } from 'react-copy-to-clipboard'
const Google2FA = () => {
  const [subStatus, setSubStatus] = useState(false)
  const [clickEnable, setEnable] = useState(false)
  const [clickDisable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [g2fa, setG2fa] = useState({})
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)
  const fetch2FAStatus = async () => {
    const { subStatus } = await get2FAStatus()
    setSubStatus(subStatus)
  }

  useEffect(() => {
    fetch2FAStatus()
  }, [])

  const disable2FA = async () => {
    setLoading(true)
    let { secret, uri } = await get2FAData()
    if (!secret && !uri) {
      return
    }
    let reqData = {
      secret,
      uri,
      code: otp,
    }
    let { status, message, error } = await postDisable2FA(reqData)
    if (status == true) {
      setOtp('')
      setDisable(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      setLoading(false)
      setErrors({})
      fetch2FAStatus()
    } else if (status === 'failed') {
      if (error) {
        setErrors(error)
      }
    }
  }

  const enable2FA = async () => {
    try {
      setLoading(true)
      let { status, result, message } = await get2FA()

      if (status) {
        console.log(result)
        setEnable(true)
        setG2fa(result)
      } else {
        console.log('message', message)
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sendOtp2FA = async () => {
    let reqData = {
      code: otp,
      secret: g2fa.secret,
      uri: g2fa.uri,
    }
    let { status, error, message } = await post2FAotp(reqData)
    if (status == true) {
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      setLoading(false)
      setEnable(false)
      setG2fa({})
      fetch2FAStatus()
      setOtp('')
      setErrors({})
    } else if (status === 'failed') {
      if (error) {
        setErrors(error)
      }
    }
  }
  const Copied = () => {
    toast({ type: 'success', message: 'Copied Successfully' }, dispatch)
  }
  return (
    <React.Fragment>
      <CHeader style={{ color: 'white' }}>Two Factor Authentication</CHeader>
      <CRow>
        <CCol xs={6} sm={6} md={6}>
          <CCard>
            <CCardHeader>Status</CCardHeader>
            <CCardBody>
              <CCardText style={{ color: 'white' }}>
                You&apos;ve currently {subStatus ? 'enabled' : 'disabled'} Two factor authentication
              </CCardText>
              <div className="d-flex justify-content-end">
                {subStatus ? (
                  <CButton onClick={() => setDisable(true)} disabled={loading}>
                    Disable 2FA
                  </CButton>
                ) : (
                  <CButton onClick={enable2FA} disabled={loading}>
                    Enable 2FA
                  </CButton>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        {clickEnable && (
          <CCol xs={6} sm={6} md={6}>
            <CCard>
              <CCardHeader>2FA Setup</CCardHeader>
              <CCardBody>
                <CCardText style={{ color: 'white' }}>
                  Scan this QR Image on your authenticator app
                </CCardText>
                <CRow>
                  <CCol sm={12} md={6} lg={4}>
                  {/* <CCardImage src={g2fa.imageUrl} /> */}
                    <CImage src={g2fa?.imageUrl}    alt="QR"
                      className="img-fluid mb-3"  />
                  </CCol>
                  <CCol sm={12} md={6} lg={8}>
                    <div className="text-light mb-4">
                      <p>Scan the QR or enter the code manually</p>
                      <p
                        style={{
                          background: 'rgba(255, 255, 255, 0.25)',
                          width: 'max-content',
                          padding: '2px',
                        }}
                      >
                        {g2fa.secret} <CopyToClipboard text={g2fa.secret} onCopy={() => setCopied(true)}>
                            <CIcon onClick={() => Copied()} icon={cilCopy} />
                          </CopyToClipboard>
                      </p>
                    </div>
                    <CCard>
                      <CCardText style={{ color: 'white' }}>
                        Enter the 2FA code to complete the setup
                      </CCardText>
                      <CFormInput
                        type="number"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                      ></CFormInput>
                      <span className="text-danger">{errors.code}</span>
                      <div className="d-flex justify-content-end">
                        <CButton onClick={sendOtp2FA} style={{ maxWidth: 'max-content' }}>
                          Submit Code
                        </CButton>
                      </div>
                    </CCard>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {clickDisable && (
          <CCol xs={6} sm={6} md={6}>
            <CCard>
              <CCardHeader>2FA Disable</CCardHeader>
              <CCardBody>
                <CCardText style={{ color: 'white' }}>
                  Enter Code on authenticator app to disable 2FA
                </CCardText>
                <CRow>
                  <CCol sm={12}>
                    <CFormInput
                      type="number"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    ></CFormInput>
                    <span className="text-danger">{errors.code}</span>
                    <div className="d-flex justify-content-end">
                      <CButton onClick={disable2FA} style={{ maxWidth: 'max-content' }}>
                        Submit Code
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </React.Fragment>
  )
}

export default Google2FA
