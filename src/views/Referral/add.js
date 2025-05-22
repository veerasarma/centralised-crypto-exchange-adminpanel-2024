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
import { getCurrency } from 'src/api/spot/pair'
import { getReferral, postReferralSetting } from 'src/api/referral'

const initialFormValue = {
  currencyId: '',
  percentage: '',
  usdtAmount: '',
  status: '',
}

const AddIpAddress = (props) => {
  const { record } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [errors, setErrors] = useState({})
  const [loader, setLoader] = useState(false)
  const [currency, setCurrency] = useState([])
  const statusOptions = [
    { value: '1', label: 'Active' },
    { value: '0', label: 'Deactive' },
  ]
  const { percentage, currencyId, usdtAmount, status } = formValue

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
      let reqData = { percentage, currencyId, status }

      const { success, message, errors } = await postReferralSetting(reqData)

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
        fetchReferralSetting()
        // navigate('/referral-list')
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
    } catch (err) { }
  }

  const fetchCurrency = async () => {
    let { success, result } = await getCurrency()
    if (success) {
      // setCurrency(result)
      var currencyArr = [] //filter same value push into as  one value
      result.filter(function (item) {
        if (item.type != "fiat") {
          var i = currencyArr.findIndex((x) => x.coin == item.coin)
          if (i <= -1) {
            currencyArr.push(item)
          }
          return null
        }

      })
      setCurrency(currencyArr)
    }
  }

  const fetchReferralSetting = async () => {
    let { success, result } = await getReferral()
    if (success) {
      setFormValue({
        ...formValue,
        currencyId: result.currencyId,
        percentage: result.percentage,
        status: result.status,
      })
    }
  }

  useEffect(() => {
    fetchCurrency()
    fetchReferralSetting()
  }, [])

  return (
    <>
      <CCard className="mb-3">
        <CCardBody>
          <CForm className="row g-1 needs-validation">
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Currency
              </CFormLabel>
              <CCol sm={5}>
                <CFormSelect
                  aria-label="Default select example"
                  name="currencyId"
                  value={currencyId}
                  onChange={handleChange}
                >
                  <option>Select Currency</option>
                  {currency &&
                    currency.length > 0 &&
                    currency.map((item, key) => {
                      return (
                        <option key={key} value={item._id}>
                          {item.coin}
                        </option>
                      )
                    })}
                </CFormSelect>
                <span className="text-danger">{errors.currencyId}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Percentage
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  // type="number"
                  name="percentage"
                  value={percentage}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.percentage}</span>
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                USDT Amount
              </CFormLabel>
              <CCol sm={5}>
                <CFormInput
                  type="number"
                  name="usdtAmount"
                  value={usdtAmount}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.usdtAmount}</span>
              </CCol>
            </CRow> */}
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Status
              </CFormLabel>
              <CCol sm={5}>
                <CFormSelect
                  aria-label="Default select example"
                  name={'status'}
                  value={status}
                  onChange={handleChange}
                >
                  <option>Status</option>
                  {statusOptions &&
                    statusOptions.length > 0 &&
                    statusOptions.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      )
                    })}
                </CFormSelect>
                <span className="text-danger">{errors.status}</span>
              </CCol>
            </CRow> */}

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
              {/* <CButton className="margin_right" onClick={() => navigate('/dashboard')}>
                {' '}
                Go Back
              </CButton> */}
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
