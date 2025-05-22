import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CFormInput,
  CImage,
  CButton,
  CCol,
  CRow,
  CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { updateSiteDetail } from 'src/api/sitesetting'
//import config
import config from '../../config/index'
const intialFormValue = {
  twiterLink: '',
  fbLink: '',
  telegramLink: '',
  siteName: '',
  address: '',
  contactNo: '',
  supportMail: '',
  emailLogo: '',
  instaLink: ''
}

const SocialMedia = (props) => {
  const { record } = props

  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [imageShow, setImageShow] = useState('')
  const dispatch = useDispatch()
  const history = useNavigate()
  const { twiterLink, fbLink, telegramLink, siteName, address, contactNo, emailLogo, supportMail, instaLink } =
    formValue

  //function
  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    let formDataerr = { ...error, ...{ [id]: '' } }
    setError(formDataerr)
  }

  const handleFile = (e) => {
    e.preventDefault()
    const { name, files } = e.target
    console.log(name, files, 'filess588')
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
    setImageShow(URL.createObjectURL(files[0]))
  }

  const Submit = async (e) => {
    try {
      const formData = new FormData()
      formData.append('twiterLink', twiterLink)
      formData.append('fbLink', fbLink)
      formData.append('instaLink', instaLink)
      formData.append('telegramLink', telegramLink)
      formData.append('siteName', siteName)
      formData.append('address', address)
      formData.append('contactNo', contactNo)
      formData.append('supportMail', supportMail)
      formData.append('emailLogo', emailLogo)
      const { success, errors, message } = await updateSiteDetail(formData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
      } else if (errors) {
        setError(errors)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    if (record && record !== undefined && record !== '') {
      let data = {
        twiterLink: record.twitterUrl,
        fbLink: record.facebookLink,
        instaLink: record.instaLink,
        telegramLink: record.telegramLink,
        siteName: record.siteName,
        address: record.address,
        contactNo: record.contactNo,
        supportMail: record.supportMail,
        emailLogo: record.emailLogo,
      }
      setFormValue(data)
    }
  }, [record])

  return (
    <>
      <div>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Twitter Link
              </CFormLabel>

              <CFormInput type="text" id="twiterLink" value={twiterLink} onChange={handleChange} />
              <span className="text-danger">{error.twiterLink}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Facebook Link{' '}
              </CFormLabel>

              <CFormInput type="text" id="fbLink" value={fbLink} onChange={handleChange} />
              <span className="text-danger">{error.fbLink}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Instagram Link{' '}
              </CFormLabel>

              <CFormInput type="text" id="instaLink" value={instaLink} onChange={handleChange} />
              <span className="text-danger">{error.instaLink}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Telegram Link
              </CFormLabel>

              <CFormInput
                type="text"
                id="telegramLink"
                value={telegramLink}
                onChange={handleChange}
              />
              <span className="text-danger">{error.telegramLink}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Site Name{' '}
              </CFormLabel>

              <CFormInput type="text" id="siteName" value={siteName} onChange={handleChange} />
              <span className="text-danger">{error.siteName}</span>
            </CCol>
            {/* <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Address{' '}
              </CFormLabel>

              <CFormInput type="text" id="address" value={address} onChange={handleChange} />
              <span className="text-danger">{error.address}</span>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                ContactNo{' '}
              </CFormLabel>

              <CFormInput type="text" id="contactNo" value={contactNo} onChange={handleChange} />
              <span className="text-danger">{error.contactNo}</span>
            </CCol> */}
            <CCol md={6}>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Support Email{' '}
              </CFormLabel>
              <CFormInput
                type="text"
                id="supportMail"
                value={supportMail}
                onChange={handleChange}
              />
              <span className="text-danger">{error.supportMail}</span>{' '}

            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Site Logo
              </CFormLabel>

              {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
              <div className="input-group btn-file-group">
                <span className="input-group-btn">
                  <label className="btn btn-secondary btn-file">
                    <div className="input required">
                      <input type="file" name="emailLogo" onChange={handleFile} />
                    </div>{' '}
                    <span className="browse-btn">Browse</span>
                  </label>
                </span>
                <span className="file-input-label"></span>
              </div>
              <div className="reply-preview"> <span className="text-warning">
                Note: MAX 1MB (only .jpeg, .png, .jpg, .pdf, .svg)
              </span>
              </div>
              
              {imageShow && (
                <CImage className="logoPreview" rounded src={imageShow} width={80} height={80} />
              )}
              {emailLogo && !emailLogo.name && (
                <CImage
                  className="logoPreview"
                  rounded
                  src={config.API_URL + '/settings/' + emailLogo}
                />
              )}
              <span className="text-danger">{error.emailLogo}</span>
             
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton className="btn btn-primary m-0 mt-3" onClick={Submit}>
            Submit
          </CButton>
        </CCardFooter>
      </div>
    </>
  )
}

SocialMedia.propTypes = {
  record: PropTypes.any,
}

export default SocialMedia
