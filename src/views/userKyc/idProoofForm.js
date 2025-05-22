import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

//import config

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
  idType: '',
  addressType: '',
  idFrontImage: '',
  idBackImage: '',
  idSlfiImage: '',
  addressFrontImage: '',
  idStatus: '',
  addressStatus: '',
  proofNumber: '',
  idProofReason: '',
  addressProofReason: '',
  reason: '',
  userId: '',
  country: '',
}

const ProfileForm = (props) => {
  const dispatch = useDispatch()
  const { record, fetchUserKycDetails } = props
  const [formValue, setFormValue] = useState(initialFormValue)
  const [errors, setErrors] = useState({})
  const [approveLoader, setapproveLoader] = useState(false)
  const [rejectLoader, setrejectLoader] = useState(false)
  const {
    idType,
    proofNumber,
    idStatus,
    idFrontImage,
    idBackImage,
    idSlfiImage,
    reason,
    userId,
    country,
  } = formValue

  //function

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    if (name == 'idProofReason') {
      let formData = { ...formValue, ...{ ['reason']: value } }
      setFormValue(formData)
    }
  }

  const handleApprove = async (e, formType) => {
    e.preventDefault()
    setapproveLoader(true)
    try {
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
      idType: record && record.idProof && record.idProof.type,
      proofNumber: record && record.idProof && record.idProof.proofNumber,
      country: record && record.idProof && record.idProof.country,
      idStatus: record && record.idProof && record.idProof.status,
      idFrontImage: `${config.USER_SERVICE.URL}/kyc/${record && record.idProof && record.idProof.frontImage
        }`,
      idBackImage: `${config.USER_SERVICE.URL}/kyc/${record && record.idProof && record.idProof.backImage
        }`,
      idSlfiImage: `${config.USER_SERVICE.URL}/kyc/${record && record.idProof && record.idProof.selfiImage
        }`,
      userId: record && record.userId && record && record.userId._id,
    }
    setFormValue(formData)
  }, [record])

  console.log(formValue, 'formValueformValue')

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
                <CFormInput type="text" id="name" value={idType} disabled />
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Proof Number
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput type="text" id="coin" value={proofNumber} disabled />
              </CCol>
            </CRow> */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Country
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput type="text" id="coin" value={country} disabled />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Status
              </CFormLabel>
              <CCol sm={5}>
                <CFormLabel>{capitalize(idStatus)}</CFormLabel>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Front Image
              </CFormLabel>

              {record?.idProof?.frontImage != '' && (
                <CCol sm={5}>
                  <CTooltip content="View Id proof front image">
                    <CLink href={idFrontImage} target={'_blank'} rel="noopener noreferrer">
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
              {record?.idProof?.backImage != '' && (
                <CCol sm={5}>
                  <CTooltip content="View Id proof back image">
                    <CLink href={idBackImage} target={'_blank'} rel="noopener noreferrer">
                      {' '}
                      View{' '}
                    </CLink>
                  </CTooltip>
                </CCol>
              )}
            </CRow>


            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Selfi Image
              </CFormLabel>
              {record?.idProof?.selfiImage != '' && (
                <CCol sm={5}>
                  <CTooltip content="View Id proof selfi image">
                    <CLink href={idSlfiImage} target={'_blank'} rel="noopener noreferrer">
                      {' '}
                      View{' '}
                    </CLink>
                  </CTooltip>
                </CCol>
              )}
            </CRow>
            {idStatus == 'pending' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Reason
                </CFormLabel>
                <CCol sm={5}>
                  <CFormTextarea
                    name="idProofReason"
                    value={reason}
                    onChange={handleChange}
                  ></CFormTextarea>
                  <span className="text-danger">{errors.idProofReason}</span>
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
              {!approveLoader && idStatus == 'pending' && (
                <CButton
                  type="submit"
                  className="margin_right"
                  onClick={(e) => handleApprove(e, 'idProof')}
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
              {!rejectLoader && idStatus == 'pending' && (
                <CButton type="submit" onClick={(e) => handleReject(e, 'idProof')}>
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
