import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CImage,
  CButton,
  CCol,
  CRow,
  CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import PropTypes, { number } from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { updateMailIntegrate, getMailIntegrate, updatesmsConfig } from 'src/api/sitesetting'
const intialFormValue = {
  fromemail: '',
  host: '',
  port: '',
  user: '',
  pass: '',
  secure: '',
  username: '',
  fromemailSB: '',
  api: '',
  mailType: '',
  limit: number,
  interval: number,
  sendinBluefromMail: '',
}
const Trend = (props) => {
  const { record } = props
  const history = useNavigate()
  //state
  const [pairoption, setOptions] = useState('')
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const {
    fromemail,
    host,
    port,
    user,
    pass,
    secure,
    username,
    fromemailSB,
    api,
    mailType,
    limit,
    interval,
    sendinBluefromMail,
  } = formValue
  //function
  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)

    let formDataerr = { ...error, ...{ [id]: '' } }
    setError(formDataerr)
  }
  const secureClick = (e) => {
    let { name, value } = e.target
    let formData = { ...formValue, ...{ secure: value } }
    setFormValue(formData)
  }
  const HandleClick = (e) => {
    let { name, value } = e.target
    let formData = { ...formValue, ...{ mailType: value } }
    setFormValue(formData)
  }
  const Submit = async (e) => {
    try {
      let reqData = {
        fromMail: fromemail,
        host: host,
        port: port,
        secure: secure,
        user: user,
        pass: pass,
        api: api,
        sendinBluefromMail: sendinBluefromMail,
        mailType: mailType,
      }
      const { success, errors, message } = await updateMailIntegrate(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        // history('/dashboard')
      } else {
        setError(errors)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }
  const handleSubmit = async (e) => {
    try {
      let reqData = {
        fromMail: fromemailSB,
        name: username,
        api: api,
        type: 'sendinBlue',
        mailType: mailType,
      }
      const { success, errors, message } = await updateMailIntegrate(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        // history('/dashboard')
      } else {
        setError(errors)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }
  const handleSubmit1 = async (e) => {
    try {
      let reqData = {
        limitval: limit,
        intervalvalue: interval,
      }
      const { success, errors, message } = await updatesmsConfig(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        // history('/dashboard')
      } else {
        setError(errors)
        console.log(errors, 'ers')
      }
      console.log(reqData, '-reqData')
    } catch (err) {}
  }
  const fetchMailIntegration = async () => {
    try {
      const { success, loading, result } = await getMailIntegrate()
      if (success == true) {
        console.log(result, 'r12')
        const setValue = {
          fromemail: result.mailIntegrage.fromMail,
          host: result.mailIntegrage.nodemailer.host,
          port: result.mailIntegrage.nodemailer.port,
          secure: result.mailIntegrage.nodemailer.secure.toString(),
          user: result.mailIntegrage.nodemailer.auth.user,
          pass: result.mailIntegrage.nodemailer.auth.pass,
          fromemailSB: result.sendinBlue.email,
          username: result.sendinBlue.name,
          api: result.sendinBlue.apiKey,
          mailType: result.mailIntegrage.mailType,
          limit: result.smsconfig.smsconfig.limit,
          sendinBluefromMail: result.sendinBlue.email,
          interval: result.smsconfig.smsconfig.interval,
        }
        setFormValue(setValue)
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (record && record !== undefined && record !== '') {
      setFormValue({ marketTrend: record.marketTrend, records: record })
    }
    fetchMailIntegration()
  }, [record])
  return (
    <>
      <CCard>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <div className="radio-group">
                <CFormLabel htmlFor="inputPassword" className="col-form-label radioLabelWidth">
                  Mail Type
                </CFormLabel>
                <div className="radio-choice-group">
                  <input
                    default={mailType}
                    type="radio"
                    className="form-check-input"
                    value="nodeMailer"
                    name="inlineRadioOptions1"
                    onClick={HandleClick}
                    checked={mailType == 'nodeMailer'}
                    id="inlineRadio1"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    nodeMailer
                  </label>
                </div>
                <div className="radio-choice-group">
                  <input
                    default={mailType}
                    type="radio"
                    value="sendinBlue"
                    className="form-check-input"
                    name="inlineRadioOptions1"
                    onClick={HandleClick}
                    checked={mailType == 'sendinBlue'}
                    id="inlineRadio2"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Send in Blue
                  </label>
                </div>
                <p className="text-danger">{error && error.secure}</p>
              </div>
            </CCol>
          </CForm>
          {mailType == 'sendinBlue' && (
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  From Mail
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="sendinBluefromMail"
                  value={sendinBluefromMail}
                  onChange={handleChange}
                />
                <span className="text-danger">{error && error.sendinBluefromMail}</span>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Api
                </CFormLabel>

                <CFormInput type="text" id="api" value={api} onChange={handleChange} />
                <span className="text-danger">{error && error.api}</span>
              </CCol>
            </CForm>
          )}
          {mailType != 'sendinBlue' && (
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  From Mail
                </CFormLabel>
                <CFormInput type="text" id="fromemail" value={fromemail} onChange={handleChange} />
                <span className="text-danger">{error && error.fromemail}</span>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Host
                </CFormLabel>
                <CFormInput type="text" id="host" value={host} onChange={handleChange} />
                <span className="text-danger">{error && error.host}</span>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Port
                </CFormLabel>
                <CFormInput type="number" id="port" value={port} onChange={handleChange} />
                <span className="text-danger">{error && error.port}</span>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  User
                </CFormLabel>
                <CFormInput type="text" id="user" value={user} onChange={handleChange} />
                <span className="text-danger">{error && error.user}</span>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Password
                </CFormLabel>
                <CFormInput type="text" id="pass" value={pass} onChange={handleChange} />
                <span className="text-danger">{error && error.pass}</span>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Secure
                </CFormLabel>
                <div className="radio-group">
                  <div className="radio-choice-group">
                    <input
                      default={secure}
                      type="radio"
                      className="form-check-input"
                      value="true"
                      name="inlineRadioOptions"
                      onClick={secureClick}
                      checked={secure == 'true'}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      True
                    </label>
                  </div>
                  <div className="radio-choice-group">
                    <input
                      default={secure}
                      type="radio"
                      value="false"
                      className="form-check-input"
                      name="inlineRadioOptions"
                      onClick={secureClick}
                      checked={secure == 'false'}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      False
                    </label>
                  </div>
                  <p className="text-danger">{error && error.secure}</p>
                </div>
              </CCol>
              <CCol md={6}>
                <CButton className="btn btn-primary m-0" onClick={Submit}>
                  Submit
                </CButton>
              </CCol>
            </CForm>
          )}
        </CCardBody>

        <CCardBody>
          <h4>SMS config </h4>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword" className="col-form-label">
                Limit
              </CFormLabel>
              <CFormInput type="Number" id="limit" value={limit} onChange={handleChange} />
              <span className="text-danger">{error && error.limit}</span>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword" className="col-form-label">
                Interval(min)
              </CFormLabel>
              <CFormInput type="Number" id="interval" value={interval} onChange={handleChange} />
              <span className="text-danger">{error && error.interval}</span>
            </CCol>
            <CCol md={6}>
              {' '}
              <CButton className="btn btn-primary m-0" onClick={handleSubmit1}>
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

Trend.propTypes = {
  record: PropTypes.any,
}

export default Trend
