import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptString } from 'src/lib/cryptoJS'
import { capitalize } from '../../lib/string'
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
  CCardHeader,
} from '@coreui/react'
import PropTypes from 'prop-types'
import Select from 'react-select'
//import action
import { getCurrency, addPair, editPair, findById } from '../../api/p2p/pair'
import { toast } from '../../redux/toast/toast.action'
import { toastAlert } from 'src/lib/toastAlert'
const initialFormValue = {
  firstCoinId: ' ',
  secondCoinId: ' ',
  feePct: '',
  markupPercentage: '',
  fetchMarkPrice: 'local',
  payment: [],
  markPrice: '',
  status: '',
}

const paymentOption = [
  { label: 'Bank', value: 'bank' },
  { label: 'UPI', value: 'upi' },
  { label: 'Gpay', value: 'gpay' },
]

const MarkPrice = [{ value: 'local', label: 'Local' }]

const AddPair = () => {
  const [currency, setCurrency] = useState([])
  const [validErr, setValidErr] = useState({})
  const [formValue, setFormValue] = useState(initialFormValue)
  const [oldValue, setOldValue] = useState({})
  const [pairstatus, setpairstatus] = useState('')
  let { id } = useParams()
  let dispatch = useDispatch()
  const history = useNavigate()
  let {
    firstCoinId,
    secondCoinId,
    feePct,
    markPrice,
    minPricePerc,
    maxPricePerc,
    payment,
    fetchMarkPrice,
    markupPercentage,
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
      console.log(result, '---re')
      setOldValue(result)
      setpairstatus(result.status)
    }
  }
  const handleChange = (e) => {
    setValidErr()
    let { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: '' } }
      setValidErr(formDataerr)
    }
  }
  const handleSubmit = async () => {
    let data = {
      firstCoinId,
      secondCoinId,
      feePct,
      markPrice,
      minPricePerc,
      maxPricePerc,
      fetchMarkPrice,
      markupPercentage,
      payment,
    }
    setValidErr();
    let { status, errors, message } = await addPair(data)
    if (status) {
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/p2p-pair')
    }
    if (errors) {
      errors && setValidErr(errors);
    } if (!status) {
      message && toast({ message: message, type: "error" }, dispatch);

    }
  }

  const handleEdit = async () => {

    let decryptData = decryptString(id, true)
    let data = {
      pairId: decryptData,
      firstCoinId,
      secondCoinId,
      feePct,
      markPrice,
      minPricePerc,
      maxPricePerc,
      fetchMarkPrice,
      markupPercentage,
      payment,
      status,
      oldFirstCurrencyId: oldValue.firstCoinId,
      oldSecondCurrencyId: oldValue.secondCoinId
    }
    let { success, message, errors } = await editPair(data)
    if (success) {
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/p2p-pair')
    } if (!success) {
      console.log("message", message)
      console.log("success", success);
      errors && setValidErr(errors)
      message && toast({ message: message, type: "error" }, dispatch)
    }
  }

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'null' : null,
      }
    },
  }

  const handlePayment = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      let formData = { ...formValue, 'payment': selectedOption.map((el) => { return el.value }) };
      setFormValue(formData);
    } else {
      let formData = { ...formValue, 'payment': [] };
      setFormValue(formData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPair()
    }
    fetchCurrency()
  }, [])
  // console.log(pairstatus, 'pairstatus')
  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardHeader>P2P Add/Edit Pair</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Base Currency</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="firstCoinId"
                      value={firstCoinId}
                      onChange={handleChange}
                    >
                      <option>Select Base Currency</option>
                      {currency &&
                        currency.length > 0 &&
                        currency.map((item, key) => {
                          if (item.type == 'crypto') {
                            return (
                              <option key={key} value={item._id}>
                                {item.coin}
                              </option>
                            )
                          }
                        })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.firstCoinId}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Quote Currency</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name={'secondCoinId'}
                      value={secondCoinId}
                      onChange={handleChange}
                    >
                      <option>Select Quote Currency</option>
                      {currency &&
                        currency.length > 0 &&
                        currency.map((item, key) => {
                          if (item.type == 'fiat') {
                            return (
                              <option key={key} value={item._id}>
                                {item.coin}
                              </option>
                            )
                          }
                        })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.secondCoinId}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Fee(%)</CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="sm input example"
                      value={feePct}
                      name="feePct"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.feePct}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Payment Type</CFormLabel>
                    <Select
                      styles={colourStyles}
                      value={
                        paymentOption && paymentOption.length > 0 ? paymentOption.filter((el) => {
                          if (payment.includes(el.value)) {
                            return el;
                          }
                        }) : []
                      }
                      isMulti
                      onChange={handlePayment}
                      options={paymentOption}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <span className="text-danger">{validErr && validErr.payment}</span>
                    {/*<CFormSelect
                      aria-label="Default select example"
                      name={'payment'}
                      value={payment}
                      onChange={handleChange}
                    >
                      {bot &&
                        bot.length > 0 &&
                        bot.map((item, key) => {
                          return (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.botstatus}</span>
                  */}
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Minimum Price(%)</CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="sm input example"
                      value={minPricePerc}
                      name="minPricePerc"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.markPrice}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Maximum Price(%)</CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="sm input example"
                      value={maxPricePerc}
                      name="maxPricePerc"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.markPrice}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
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
                </CCol>

                {fetchMarkPrice === 'binance' && (
                  <CCol xs={12} sm={12} md={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Markup(%)</CFormLabel>
                      <CFormInput
                        type="number"
                        size="sm"
                        aria-label="sm input example"
                        value={markupPercentage}
                        name="markupPercentage"
                        onChange={handleChange}
                      />
                      <span className="text-danger">{validErr && validErr.markupPercentage}</span>
                    </div>
                  </CCol>
                )}

                {/* <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Fetch MarkPrice</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name={'fetchMarkPrice'}
                      value={fetchMarkPrice}
                      onChange={handleChange}
                    >
                      {MarkPrice &&
                        MarkPrice.length > 0 &&
                        MarkPrice.map((item, key) => {
                          return (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.fetchMarkPrice}</span>
                  </div>
                </CCol> */}
                <CCol xs={12} sm={12} md={6}>
                  {pairstatus !== '' && (
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Status</CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        name={'status'}
                        value={status}
                        onChange={handleChange}
                      >
                        <option value={pairstatus}>{capitalize(pairstatus)}</option>
                        {pairstatus === 'active' && <option value={'deactive'}>Deactive</option>}
                        {pairstatus === 'deactive' && <option value={'active'}>Active</option>}
                      </CFormSelect>
                    </div>
                  )}
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {id && id.length > 0 ? (
              <CButton className="submit-btn" onClick={handleEdit}>
                Submit
              </CButton>
            ) : (
              <CButton className="submit-btn" onClick={handleSubmit}>
                Submit
              </CButton>
            )}
            <button className="btn btn-secondary" onClick={() => history('/p2p-pair')}>
              {' '}
              Go Back
            </button>
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
