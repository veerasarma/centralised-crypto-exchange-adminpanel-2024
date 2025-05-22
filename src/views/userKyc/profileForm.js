import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

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
} from '@coreui/react'

const ProfileForm = (props) => {
  const { record } = props

  return (
    <>
      <CCard className="mb-3">
        <CCardBody>
          <CForm className="row g-1 needs-validation">
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                First Name
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="name"
                  value={record && record.userId && record.userId.firstName}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Last Name
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="coin"
                  value={record && record.userId && record.userId.lastName}
                  disabled
                />
              </CCol>
            </CRow> */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="coin"
                  value={record && record.userId && record.userId.email}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Phone Code
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="coin"
                  value={record && record.userId && record.userId.phoneCode}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Phone No
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="coin"
                  value={record && record.userId && record.userId.phoneNo}
                  disabled
                />
              </CCol>
            </CRow>

            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Address
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="symbol"
                  value={record && record.userId && record.userId.address}
                  disabled
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Country
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="minimumWithdraw"
                  value={record && record.userId && record.userId.country}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                State
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="withdrawFee"
                  value={record && record.userId && record.userId.state}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                City
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="contractDecimal"
                  value={record && record.userId && record.userId.city}
                  disabled
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                PostalCode
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="text"
                  id="minimumDeposit"
                  value={record && record.userId && record.userId.postalCode}
                  disabled
                />
              </CCol>
            </CRow> */}
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

ProfileForm.propTypes = {
  record: PropTypes.object,
}

export default ProfileForm
