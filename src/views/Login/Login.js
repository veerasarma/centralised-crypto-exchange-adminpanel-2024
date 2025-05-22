//import package
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import browser from 'browser-detect'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLowVision, cilUser, cilText } from '@coreui/icons'
import nav from 'src/_nav'

//import api
import { loginApi, getGeoInfoData } from '../../api/auth'

//import lib
import { setAuthToken } from '../../lib/localStorage'
//import action
import { login } from '../../redux/auth/auth.action'

//import action
import { toast } from '../../redux/toast/toast.action'
import { role } from 'src/redux/role/role.action'

//import config
import { setAuthorization } from '../../config/axios'

const initailValue = {
  email: '',
  password: '',
  twoFACode: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { siteLogoUrl } = useSelector((state) => state?.Setting);
  //import state
  const [formValue, setFormValue] = useState(initailValue)
  const [validateError, setValidateError] = useState({})
  const [loginHistory, setloginHistory] = useState({})
  const [showTwoFA, setShowTwoFA] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { email, password, twoFACode } = formValue


  //import function
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
    if (value) {
      let formDataerr = { ...validateError, ...{ [name]: '' } }
      setValidateError(formDataerr)
    }
  }

  const handleSubmit = async (e) => {
    try {
      setLoader(true);
      e.preventDefault();

      let reqData = {
        email,
        password,
        loginHistory,
        twoFACode,
      };

      const { success, message, token, errors, result, twoFA } = await loginApi(reqData, dispatch);

      if (success) {
        // console.log(nav, '...result', result);

        let url = '';
        if (nav && nav.length > 0) {
          for (let el of nav) {
            if (el?.items?.length > 0) {
              const checkIndex = el.items.find(x => x.name == result?.restriction[0]);
              if (checkIndex) {
                url = checkIndex.to;
                break;
              }
            }
          }
        }

        setLoader(false);
        setValidateError({});
        setFormValue(initailValue);
        setAuthToken(token);
        setAuthorization(token);
        // console.log(url,'--url')
        if (url) {
          navigate(url);
        }
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        );
        role(
          {
            role: result.role,
            restriction: result.restriction,
          },
          dispatch,
        );
      } else {
        setLoader(false);
        if (errors) {
          setValidateError(errors);
        } else {
          if (twoFA) setShowTwoFA(twoFA);
          toast(
            {
              message: message,
              type: 'error',
            },
            dispatch,
          );
        }
      }
    } catch (err) {
      console.log(err, '-------error on login');
    }
  };

  const getLoginInfo = async () => {
    try {
      fetch('https://ipapi.co/json/').then((data) => {
        data.json().then((parsed) => {
          // Get the user agent string
          var userAgent = window.navigator.userAgent;

          var osVersionRegex = /(Windows NT|Windows) ?([0-9._]+)/;
          var macOSVersionRegex = /(Mac OS X) ?([0-9._]+)/;
          var iOSVersionRegex = /(CPU(?: iPhone)? OS) ?([0-9._]+)/;
          var androidVersionRegex = /(Android) ?([0-9._]+)/;
          var linuxRegex = /(Linux) [xX] ?([0-9._]+)/;

          // Match the Linux OS and its version in the user agent string
          var osVersion;
          var osName;
          if (osVersionRegex.test(userAgent)) {
            osName = userAgent.match(osVersionRegex)[1];
            osVersion = userAgent.match(osVersionRegex)[2];
          } else if (macOSVersionRegex.test(userAgent)) {
            osName = userAgent.match(macOSVersionRegex)[1];
            osVersion = userAgent.match(macOSVersionRegex)[2];
          } else if (iOSVersionRegex.test(userAgent)) {
            osName = userAgent.match(iOSVersionRegex)[1];
            osVersion = userAgent.match(iOSVersionRegex)[2];
          } else if (androidVersionRegex.test(userAgent)) {
            osName = userAgent.match(androidVersionRegex)[1];
            osVersion = userAgent.match(androidVersionRegex)[2];
          } else if (linuxRegex.test(userAgent)) {
            osName = userAgent.match(linuxRegex)[1];
            osVersion = userAgent.match(linuxRegex)[2];
          }
          else {
            console.log("Operating system version not found.");
          }
          const browserResult = browser()
          let loginHistory = {
            countryName: parsed.country_name,
            countryCode: parsed.country_calling_code,
            ipaddress: parsed.ip,
            region: parsed.region,
            broswername: browserResult.name,
            ismobile: browserResult.mobile,
            os: osName + osVersion,
          }
          setloginHistory(loginHistory)
        })
      })
    } catch (err) {
      console.log(err, 'eeee14')
    }
  }
  const handlePass = () => {
    setShowPass(showPass == false ? true : false)
  }
  useEffect(() => {
    getLoginInfo()
  }, [])

  return (
    <div className="bg-light-purple min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <div className="login-brand">
          <img src={siteLogoUrl} width={20} height={100}  ></img>
        </div>
        <CRow className="justify-content-center">
          <CCol md={6} lg={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h3 className="crediantial-title">Login</h3>
                  <CForm className='form2'>
                    <div className="mb-4">
                      <CFormLabel>Email</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <span className="text-danger">{validateError.email}</span>
                    </div>
                    <div className="mb-4">
                      <CInputGroup className="mb-4 align_ment">
                        <CInputGroupText>
                          {showPass ? <CIcon icon={cilText} onClick={handlePass} /> : <CIcon icon={cilLowVision} onClick={handlePass} />}
                        </CInputGroupText>
                        <CFormInput
                          type={showPass ? "text" : "password"}
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />

                      </CInputGroup>

                      {/* <CFormLabel>Password</CFormLabel>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        /> */}
                      {/* </CInputGroup> */}
                      <span className="text-danger">{validateError.password}</span>
                    </div>
                    {showTwoFA && (
                      <div className="mb-4">
                        <CFormLabel>2FA Code</CFormLabel>
                        <CInputGroup className="mb-4">
                          <CFormInput
                            type="number"
                            name="twoFACode"
                            value={twoFACode}
                            onChange={handleChange}
                          />
                        </CInputGroup>
                        <br />
                        <span className="text-danger">{validateError.twoFACode}</span>
                      </div>
                    )}

                    {loader && (
                      <CButton disabled color="primary" className="btn-big">
                        <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                        Loading...
                      </CButton>
                    )}
                    {!loader && (
                      <CButton
                        color="primary"
                        className="btn-big"
                        onClick={handleSubmit}
                      >
                        Login
                      </CButton>
                    )}
                    <Link to={'/forgetPassword'}>Forgot your password?</Link>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default Login
