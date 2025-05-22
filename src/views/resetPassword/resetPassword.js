import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLowVision, cilLockLocked, cilUser, cilText } from '@coreui/icons'

//import api
import { CheckTokenAuth, resetPasswordApi } from '../../api/auth'

//import action
import { toast } from '../../redux/toast/toast.action'

const intailValue = {
  password: '',
  confirmPassword: '',
}

const ResetPassword = () => {
  const [params, _] = useSearchParams()
  const authToken = params.get('auth')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(intailValue)
  const [validateError, setValidateError] = useState({})
  const [loader, setLoader] = useState(false)
  const { password, confirmPassword } = formValue

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  //function
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleCheckAuthToken = async (authToken) => {
    try {
      let reqData = {
        authToken,
      }
      const { result, error, status, message } = await CheckTokenAuth(reqData)
      if (status == 'success') {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
        navigate('/login')
      }
    } catch (err) { }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoader(true)
      let reqData = {
        password,
        confirmPassword,
        authToken,
      }
      const { result, error, status, message } = await resetPasswordApi(reqData)
      if (status == 'success') {
        setValidateError({})
        setLoader(false)
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        navigate('/login')
      } else {
        if (error) {
          setLoader(false)
          setValidateError(error)
        } else {
          toast(
            {
              message: message,
              type: 'success',
            },
            dispatch,
          )
        }
      }
    } catch (err) { }
  }

  const handlePass = () => {
    setShowPass(showPass == false ? true : false)
  }
  const handleConfirmPass = () => {
    setShowConfirmPass(showConfirmPass == false ? true : false)
  }

  useEffect(() => {
    if (authToken) {
      handleCheckAuthToken(authToken)
    }
  }, [])

  return (
    <div className="bg-light-purple min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-light">Reset Password</h1>
                    <CInputGroup className="mb-3 align_ment bddr">
                      <CInputGroupText>
                        <CIcon icon={cilUser} style={{ color: "white" }} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <CInputGroupText>
                        {/* <CIcon icon={cilLowVision} onClick={handlePass} /> */}
                        {showPass ? <CIcon icon={cilText} onClick={handlePass} style={{ color: "white" }} /> : <CIcon icon={cilLowVision} style={{ color: "white" }} onClick={handlePass} />}
                      </CInputGroupText>
                    </CInputGroup>
                    <span className="text-danger">{validateError.password}</span>

                    <CInputGroup className="mb-4 align_ment bddr">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} style={{ color: "white" }} />
                      </CInputGroupText>
                      <CFormInput
                        type={showConfirmPass ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                      />
                      <CInputGroupText>
                        {/* <CIcon icon={cilLowVision} onClick={handleConfirmPass} /> */}
                        {showConfirmPass ? <CIcon style={{ color: "white" }} icon={cilText} onClick={handleConfirmPass} /> : <CIcon style={{ color: "white" }} icon={cilLowVision} onClick={handleConfirmPass} />}
                      </CInputGroupText>
                    </CInputGroup>
                    <span className="text-danger">{validateError.confirmPassword}</span>

                    <CRow>
                      <CCol xs={3}>
                        {loader && (
                          <CButton disabled>
                            <CSpinner
                              component="span"
                              size="sm"
                              variant="grow"
                              aria-hidden="true"
                            />
                            Loading...
                          </CButton>
                        )}
                        {!loader && (
                          <CButton color="primary" className="px-4" onClick={handleSubmit}>
                            Reset Password
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to={'/login'}>
                          <CButton color="link" className="px-0 text-light">
                            Login
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
