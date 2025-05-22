import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CRow,
  CCardBody,
  CCard,
  CButton,
  CSpinner,
  CForm,
  CImage,
  CTooltip,
  CLink,
  CFormTextarea,
} from '@coreui/react'

//import api
import { addIpAddress } from '../../api/common'

//import action
import { toast } from '../../redux/toast/toast.action'

const initialFormValue = {
  ipAddress: '',
}

const AddIpAddress = (props) => {
  const { record } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)

  const { ipAddress } = formValue

  //function

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      let reqData = {
        ipAddress,
      }

      const { success, message, errors } = await addIpAddress(reqData)

      if (success) {
        setLoader(false)
        setErrors({})
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        navigate('/ipList')
      } else {
        if (errors) {
          setLoader(false)
          setErrors(errors)
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
    } catch (err) {}
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardBody>
          <CForm className="row g-1 needs-validation">
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Ip Address
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  name="ipAddress"
                  value={ipAddress}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.ipAddress}</span>
              </CCol>
            </CRow>

            <CCol xs={12}>
              {loader && (
                <CButton disabled>
                  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                  Loading...
                </CButton>
              )}
              {!loader && (
                <CButton type="submit" onClick={handleSubmit}>
                  Submit
                </CButton>
              )}
              <CButton className="margin_right" onClick={() => navigate('/ipList')}>
                {' '}
                Go Back
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

AddIpAddress.propTypes = {
  record: PropTypes.object,
}

export default AddIpAddress
