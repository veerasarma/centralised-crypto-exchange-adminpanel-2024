import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CForm,
  CCardFooter,
  CButton,
  CSpinner,
} from '@coreui/react'

//import api
import { updateProfile, getAdminProfile } from '../../api/user'

//import action
import { toast } from '../../redux/toast/toast.action'

const initialFormValue = {
  name: '',
  email: '',
  phoneNumber: '',
}

const ProfileDetails = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [validErr, setValidErr] = useState({})
  const [loader, setLoader] = useState(false)

  const { email, name, phoneNumber } = formValue

  //function
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: '' } }
      setValidErr(formDataerr)
    }
  }
  const handleSubmit = async () => {
    setLoader(true)
    let data = {
      email,
      name,
      phoneNumber,
    }
    let { success, message, errors } = await updateProfile(data)
    if (success) {
      setLoader(false)
      setValidErr({})
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      // history('/dashboard')
    } else {
      // console.log(errors, 'errorserrorserrors')
      if (errors) {
        setLoader(false)
        setValidErr(errors)
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      }
    }
  }
  const fetchProfile = async () => {
    const { success, result } = await getAdminProfile()
    if (success) {
      let formData = {}
      formData.name = result.name
      formData.email = result.email
      formData.phoneNumber = result.phoneNumber
      setFormValue(formData)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <CRow>
      <CCol xs={12} sm={12} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Enter Name</CFormLabel>
                <CFormInput
                  type="text"
                  size="sm"
                  aria-label="sm input example"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.name}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Enter Email Address</CFormLabel>
                <CFormInput
                  type="email"
                  size="sm"
                  aria-label="Quote Currency Decimal"
                  value={email}
                  name="email"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.email}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Enter Phone Number</CFormLabel>
                <CFormInput
                  type="phoneNumber"
                  size="sm"
                  aria-label="Quote Currency Decimal"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.phoneNumber}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader && (
              <CButton disabled>
                <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                Loading...
              </CButton>
            )}
            {!loader && (
              <CButton className="submit-btn" onClick={handleSubmit}>
                Update
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProfileDetails
