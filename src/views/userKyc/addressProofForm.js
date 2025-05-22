import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
  CCol,
  CFormLabel,
  CFormInput,
  CRow,
  CCardBody,
  CCard,
  CButton,
  CSpinner,
  CForm,
  CTooltip,
  CLink,
  CFormTextarea,
} from '@coreui/react'

//import api
import { approveUserKyc, rejectUserKyc } from '../../api/user'

//import action
import { toast } from '../../redux/toast/toast.action'

//import lib
import { capitalize } from '../../lib/string'

//import config
import config from '../../config/index'

const initialFormValue = {
  formType: '',
  addressType: '',
  addressFrontImage: '',
  idBackImage: '',
  idSlfiImage: '',
  addressStatus: '',
  proofNumber: '',
  idProofReason: '',
  addressProofReason: '',
  reason: '',
  userId: '',
  addressBackImage: '',
}

const ProfileForm = (props) => {
  const dispatch = useDispatch()
  const { record, fetchUserKycDetails } = props
  const [formValue, setFormValue] = useState(initialFormValue)
  const [errors, setErrors] = useState({})
  const [approveLoader, setapproveLoader] = useState(false)
  const [rejectLoader, setrejectLoader] = useState(false)

  const { addressType, addressStatus, addressFrontImage, reason, userId, addressBackImage } =
    formValue

  //function

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    if (name == 'addressProofReason') {
      let formData = { ...formValue, ...{ ['reason']: value } }
      setFormValue(formData)
    }
  }

  const handleApprove = async (e, formType) => {
    e.preventDefault()
    try {
      setapproveLoader(true)
      let reqData = {
        userId,
        formType,
      }
      const { success, message } = await approveUserKyc(reqData)
      if (success) {
        setapproveLoader(false)
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchUserKycDetails()
      } else {
        toast(
          {
            message: message,
            type: 'error',
          },
          dispatch,
        )
      }
    } catch (err) { }
  }

  const handleReject = async (e, formType) => {
    e.preventDefault()
    setrejectLoader(true)

    try {
      let reqData = {
        userId,
        formType,
        reason,
      }
      const { success, message, errors } = await rejectUserKyc(reqData)
      if (success) {
        setrejectLoader(false)
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        fetchUserKycDetails()
      } else {
        if (errors) {
          setrejectLoader(false)
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
    } catch (err) { }
  }

  useEffect(() => {
    let formData = {
      addressType: record && record.addressProof && record.addressProof.type,
      addressStatus: record && record.addressProof && record.addressProof.status,
      addressFrontImage: `${config.USER_SERVICE.URL}/kyc/${record && record.addressProof && record.addressProof.frontImage
        }`,
      addressBackImage: `${config.USER_SERVICE.URL}/kyc/${record && record.addressProof && record.addressProof.backImage
        }`,
      userId: record && record.userId && record && record.userId._id,
    }
    setFormValue(formData)
  }, [record])
  console.log('-------------addressBackImage', addressBackImage)
  return (
    <>
      <div className="mb-3">
        <CCardBody>
          <CForm className="row g-1 needs-validation">
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Id Type
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput type="text" id="name" value={addressType} disabled />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Status
              </CFormLabel>
              <CCol sm={5}>
                <CFormLabel>{capitalize(addressStatus)}</CFormLabel>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Front Image
              </CFormLabel>
              {record?.addressProof?.frontImage != '' && (
                <CCol sm={5}>
                  <CTooltip content="View Id proof front image">
                    <CLink href={addressFrontImage} target={'_blank'} rel="noopener noreferrer">
                      {' '}
                      View{' '}
                    </CLink>
                  </CTooltip>
                </CCol>
              )}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Back Image
              </CFormLabel>
              {record?.addressProof?.backImage != '' && (
                <CCol sm={5}>
                  <CTooltip content="View Id proof front image">
                    <CLink href={addressBackImage} target={'_blank'} rel="noopener noreferrer">
                      {' '}
                      View{' '}
                    </CLink>
                  </CTooltip>
                </CCol>
              )}
            </CRow>

            {addressStatus == 'pending' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Reason
                </CFormLabel>
                <CCol sm={5}>
                  <CFormTextarea
                    name="addressProofReason"
                    value={reason}
                    onChange={handleChange}
                  ></CFormTextarea>
                  <span className="text-danger">{errors.addressProofReason}</span>
                </CCol>
              </CRow>
            )}

            <CCol xs={12}>
              {approveLoader && (
                <CButton disabled>
                  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                  Loading...
                </CButton>
              )}
              {!approveLoader && addressStatus == 'pending' && (
                <CButton
                  type="submit"
                  className="margin_right"
                  onClick={(e) => handleApprove(e, 'addressProof')}
                >
                  Approve
                </CButton>
              )}
              {rejectLoader && (
                <CButton disabled>
                  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                  Loading...
                </CButton>
              )}
              {!rejectLoader && addressStatus == 'pending' && (
                <CButton type="submit" onClick={(e) => handleReject(e, 'addressProof')}>
                  Reject
                </CButton>
              )}
            </CCol>
          </CForm>
        </CCardBody>
      </div>
    </>
  )
}

ProfileForm.propTypes = {
  record: PropTypes.object,
  fetchUserKycDetails: PropTypes.func,
}

export default ProfileForm
