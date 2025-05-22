import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CForm,
  CCardFooter,
  CButton,
  CSpinner,
  CFormTextarea,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
//import action
import { findById, approveFiatWithdraw, rejectFiatWithdraw } from '../../api/Transfer/transfer'
//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'
import { capitalize } from '../../lib/string'
let initialValue = {
  toAddress: '',
  coin: '',
  actualAmount: '',
  commissionFee: '',
  amount: '',
  status: '',
  reason: '',
}

const FiatWithdraw = () => {
  const [formValue, setFormValue] = useState(initialValue)
  const [type, setType] = useState('')
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState({})
  const history = useNavigate()
  let { id } = useParams()
  let dispatch = useDispatch()
  let { toAddress, coin, actualAmount, commissionFee, amount, status, reason } = formValue

  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (success) {
      setFormValue(result)
    }
  }
  const handleChange = (e) => {
    e.preventDefault()
    let { id, value } = e.target

    let formData = { ...formValue, ...{ ['reason']: value } }
    setFormValue(formData)
  }
  const fiatApprove = async () => {
    let decryptData = decryptString(id, true)
    setType('approve')
    setLoader(true)
    let { success, message, errors } = await approveFiatWithdraw(decryptData)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/withdraw-list')
    } else {
      if (errors) {
        setLoader(false)
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
  }
  const fiatReject = async () => {
    let decryptData = decryptString(id, true)
    setType('reject')
    let reqData = {
      decryptData,
      reason,
    }
    setLoader(true)
    let { success, message, errors } = await rejectFiatWithdraw(reqData)
    setLoader(false)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/withdraw-list')
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
  }
  useEffect(() => {
    if (id) {
      fetchPair()
    }
  }, [])
  return (
    <CRow>
      <CCol xs={12} sm={12} md={8}>
        <CCard>
          <CCardBody>
            <CForm>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">To Address</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{toAddress}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Transfer Currency</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{coin}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Transfer Amount</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{actualAmount}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Commission Fee(%)</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{commissionFee}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Total Amount</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{amount}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Status</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{capitalize(status)}</CFormLabel>
                </CCol>
              </CRow>
            </CForm>
            {status === 'pending' && (
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label marginLeft">
                    Reason
                  </CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormTextarea id="reason" value={reason} onChange={handleChange}></CFormTextarea>
                  <span className="text-danger" id="errorleft">
                    {errors.reason}
                  </span>
                </CCol>
              </CRow>
            )}
          </CCardBody>
          {status === 'pending' ? (
            <CCardFooter>
              {loader ? (
                type === 'approve' ? (
                  <CButton color="success" variant="outline" disabled style={{ float: 'right' }}>
                    <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                    Loading...
                  </CButton>
                ) : (
                  <CButton color="danger" variant="outline" disabled style={{ float: 'right' }}>
                    <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                    Loading...
                  </CButton>
                )
              ) : (
                <div style={{ float: 'right' }}>
                  <CButton color="success" variant="outline" onClick={fiatApprove}>
                    Accept
                  </CButton>
                  &nbsp; &nbsp;
                  <CButton color="danger" variant="outline" onClick={fiatReject}>
                    Reject
                  </CButton>
                </div>
              )}
            </CCardFooter>
          ) : null}
        </CCard>
      </CCol>
    </CRow>
  )
}
FiatWithdraw.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default FiatWithdraw
