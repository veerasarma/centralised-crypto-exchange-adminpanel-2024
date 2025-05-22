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
import PropTypes from 'prop-types'
//import action
import { getCurrency } from '../../api/spot/pair'
import { addPair, editPair, findById } from '../../api/futures/pair'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'
const initialFormValue = {
  firstCurrencyId: ' ',
  firstFloatDigit: '',
  secondCurrencyId: ' ',
  secondFloatDigit: '',
  minPricePercentage: '',
  maxPricePercentage: '',
  minQuantity: '',
  maxQuantity: '',
  maker_rebate: '',
  taker_fees: '',
  markupPercentage: '',
  maintenanceMargin: '',
  markPrice: '',
  status: 'active', //active ,deactive
}
const bot = [{ value: 'binance', label: 'Binance' }]
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'deactive', label: 'DeActive' },
]
const AddPair = () => {
  const [currency, setCurrency] = useState([])
  const [validErr, setValidErr] = useState({})
  const [loader, setLoader] = useState(false)
  const [formValue, setFormValue] = useState(initialFormValue)
  const history = useNavigate()
  let { id } = useParams()
  let dispatch = useDispatch()
  const {
    markupPercentage,
    maker_rebate,
    taker_fees,
    minPricePercentage,
    maxPricePercentage,
    maxQuantity,
    minQuantity,
    firstCurrencyId,
    firstFloatDigit,
    secondCurrencyId,
    secondFloatDigit,
    maintenanceMargin,
    markPrice,
    status,
  } = formValue
  const fetchCurrency = async () => {
    let { success, result } = await getCurrency()
    if (success) {
      // setCurrency(result)
      var currencyArr = [] //filter same value push into as  one value
      result.filter(function (item) {
        var i = currencyArr.findIndex((x) => x.coin == item.coin)
        console.log('...i', i, item)
        if (i <= -1) {
          currencyArr.push(item)
        }
        return null
      })
      setCurrency(currencyArr)
    }
  }
  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (success) {
      setFormValue(result)
    }
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: '' } }
      setValidErr(formDataerr)
    }
  }
  const handleSubmit = async () => {
    let data = {
      markupPercentage,
      maker_rebate,
      taker_fees,
      minPricePercentage,
      maxPricePercentage,
      maxQuantity,
      minQuantity,
      firstCurrencyId,
      firstFloatDigit,
      secondCurrencyId,
      secondFloatDigit,
      maintenanceMargin,
      markPrice,
    }
    setLoader(true)
    let { success, message, errors } = await addPair(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/perpetual-pair')
    } else {
      if (errors) {
        setLoader(false)
        setValidErr(errors)
      }
    }
  }
  const handleEdit = async () => {
    let decryptData = decryptString(id, true)
    let data = {
      pairId: decryptData,
      firstCurrencyId,
      firstFloatDigit,
      secondCurrencyId,
      secondFloatDigit,
      minPricePercentage,
      maxPricePercentage,
      minQuantity,
      maxQuantity,
      maker_rebate,
      taker_fees,
      markupPercentage,
      markPrice,
      maintenanceMargin,
      status,
    }
    setLoader(true)
    let { success, message, errors } = await editPair(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/perpetual-pair')
    } else {
      if (errors) {
        setLoader(false)
        setValidErr(errors)
      }
    }
  }
  useEffect(() => {
    if (id) {
      fetchPair()
    }
    fetchCurrency()
  }, [])
  return (
    <CRow>
      <CCol xs={12} sm={12} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Base Currency</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name="firstCurrencyId"
                  value={firstCurrencyId}
                  onChange={handleChange}
                >
                  <option>Select Base Currency</option>
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
                <span className="text-danger">{validErr && validErr.firstCurrencyId}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Base Currency Decimal</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  name="firstFloatDigit"
                  value={firstFloatDigit}
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.firstFloatDigit}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Quote Currency</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name={'secondCurrencyId'}
                  value={secondCurrencyId}
                  onChange={handleChange}
                >
                  <option>Select Quote Currency</option>
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
                <span className="text-danger">{validErr && validErr.secondCurrencyId}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Quote Currency Decimal
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="Quote Currency Decimal"
                  value={secondFloatDigit}
                  name="secondFloatDigit"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.secondFloatDigit}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Maker Fee(%)</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={maker_rebate}
                  name="maker_rebate"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.maker_rebate}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Taker Fee(%)</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={taker_fees}
                  name="taker_fees"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.taker_fees}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Minimum Price(%)</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={minPricePercentage}
                  name="minPricePercentage"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.minPricePercentage}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Maximum Price(%)</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={maxPricePercentage}
                  name="maxPricePercentage"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.maxPricePercentage}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Minimum Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={minQuantity}
                  name="minQuantity"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.minQuantity}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Maximum Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={maxQuantity}
                  name="maxQuantity"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.maxQuantity}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">MarkPrice</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={markPrice}
                  name="markPrice"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.markPrice}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Maintenance Margin</CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={maintenanceMargin}
                  name="maintenanceMargin"
                  onChange={handleChange}
                />
                <span className="text-danger">{validErr && validErr.maintenanceMargin}</span>
              </div>
              {id && id.length > 0 && (
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
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
                </div>
              )}
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader ? (
              <CButton className="submit-btn" disabled>
                <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                Loading...
              </CButton>
            ) : (
              <>
                {id && id.length > 0 ? (
                  <CButton className="submit-btn" onClick={handleEdit}>
                    Submit
                  </CButton>
                ) : (
                  <CButton className="submit-btn" onClick={handleSubmit}>
                    Submit
                  </CButton>
                )}
                <CButton className="back-btn" onClick={() => history('/perpetual-pair')}>
                  {' '}
                  Go Back
                </CButton>
              </>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
AddPair.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default AddPair
