import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { cilPlus, cilX } from '@coreui/icons'
import Select from 'react-select'
import PropTypes from 'prop-types'

//import action
import { getCurrency } from '../../api/spot/pair'
import { addStaking, findById, editStaking } from '../../api/Staking/staking'
//import lib
import { decryptString } from 'src/lib/cryptoJS'
import isEmpty from 'src/lib/isEmpty'
import { toast } from '../../redux/toast/toast.action'

let TypeOption = [
  {
    label: 'Fixed',
    value: 'fixed',
  },
  {
    label: 'Flexible',
    value: 'flexible',
  },
]
const initialFormValue = {
  _id: '',
  currencyId: '',
  minimumAmount: '',
  maximumAmount: '',
  redemptionPeriod: '',
  type: [],
  flexibleAPY: '',
  periodList: [{ days: '', APY: '' }],
  status: '',
  typeOption: TypeOption,
}

const AddPair = () => {
  const [currency, setCurrency] = useState([])
  const [validErr, setValidErr] = useState({})
  const [alert, setAlert] = useState(false)
  const [formValue, setFormValue] = useState(initialFormValue)
  const [loader, setLoader] = useState(false)
  const history = useNavigate()
  let { id } = useParams()
  let dispatch = useDispatch()
  let {
    currencyId,
    minimumAmount,
    maximumAmount,
    redemptionPeriod,
    type,
    flexibleAPY,
    periodList,
    status,
    typeOption,
  } = formValue
  const fetchCurrency = async () => {
    let { success, result } = await getCurrency()
    if (success) {
      setCurrency(result)
    }
  }
  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (result.periodList.length === 0) {
      result.periodList = [{ days: '', APY: '' }]
    }
    if (success) {
      setFormValue({ ...result, ...{ typeOption: TypeOption } })
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
  const handleSelect = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setFormValue({
        ...formValue,
        type: selectedOption.map((el) => {
          return el.value
        }),
      })
      console.log({
        ...formValue,
        type: selectedOption.map((el) => {
          return el.value
        }),
      })
    } else {
      setFormValue({ ...formValue, type: '' })
    }
  }
  const handleAddClick = () => {
    const list = [...periodList]
    list.push({ days: '', APY: '' })
    setFormValue({ ...formValue, periodList: list })
  }
  const handleRemoveClick = (index) => {
    const list = [...periodList]
    list.splice(index, 1)
    if (list.length === 0) {
      setFormValue({
        ...formValue,
        periodList: [{ days: '', APY: '' }],
        type: type.filter((item) => item !== 'fixed'),
      })
    } else {
      setFormValue({ ...formValue, periodList: list })
    }
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...periodList]
    list[index][name] = value
    setFormValue({ ...formValue, periodList: list })
    if (value) {
      setValidErr({})
    }
  }
  const handleSubmit = async () => {
    let data = {
      currencyId,
      minimumAmount,
      maximumAmount,
      redemptionPeriod,
      type,
      flexibleAPY,
      periodList,
    }
    setLoader(true)
    let { success, message, errors } = await addStaking(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/stake-list')
    } else {
      if (errors) {
        setLoader(false)
        setValidErr(errors)
        setAlert(true)
      }
    }
  }
  const handleEdit = async () => {
    let decryptData = decryptString(id, true)
    let data = {
      stakingId: decryptData,
      currencyId,
      minimumAmount,
      maximumAmount,
      redemptionPeriod,
      type,
      flexibleAPY,
      periodList,
      status,
    }
    setLoader(true)
    let { success, result, message, errors } = await editStaking(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/stake-list')
    } else {
      if (errors) {
        setLoader(false)
        setValidErr(errors)
        setAlert(true)
      }
    }
  }
  useEffect(() => {
    if (id) {
      fetchPair()
    }
    fetchCurrency()
  }, [])

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'null' : null,
      }
    },
  }
  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardHeader>Staking Add/Edit Pair</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Staking Currency</CFormLabel>
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
                    <span className="text-danger">{validErr && validErr.currencyId}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Minimum Amount</CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="sm input example"
                      name="minimumAmount"
                      value={minimumAmount}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.minimumAmount}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Maximum Amount</CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="Quote Currency Decimal"
                      value={maximumAmount}
                      name="maximumAmount"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.maximumAmount}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Redemption Period (In Days)
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      size="sm"
                      aria-label="sm input example"
                      value={redemptionPeriod}
                      name="redemptionPeriod"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.redemptionPeriod}</span>
                  </div>
                </CCol>

                {id && (
                  <CCol xs={12} sm={12} md={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        name="status"
                        value={status}
                        onChange={handleChange}
                      >
                        <option value={'active'}>Active</option>
                        <option value={'deactive'}>Deactive</option>
                      </CFormSelect>
                      <span className="text-danger">{validErr && validErr.status}</span>
                    </div>
                  </CCol>
                )}
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Type</CFormLabel> &nbsp;&nbsp;
                    <Select
                      styles={colourStyles}
                      value={
                        typeOption && typeOption.length > 0
                          ? typeOption.filter((el) => {
                              if (!isEmpty(type) && type.includes(el.value)) {
                                return el
                              }
                            })
                          : []
                      }
                      isMulti
                      name="colors"
                      options={typeOption}
                      onChange={handleSelect}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <span className="text-danger">{validErr && validErr.type}</span>
                  </div>
                </CCol>

                {formValue && formValue.type.includes('fixed') && (
                  <CCol xs={12} sm={12} md={6}>
                    {periodList &&
                      periodList.length > 0 &&
                      periodList.map((item, key) => {
                        return (
                          <div className="addFieldGroup mb-3" key={key}>
                            <CFormLabel htmlFor="exampleFormControlTextarea1">
                              Period{key + 1}
                            </CFormLabel>
                            <CFormInput
                              placeholder="Days"
                              aria-label="Last name"
                              name="days"
                              value={item.days}
                              type="number"
                              onChange={(e) => handleInputChange(e, key)}
                            />
                            {isEmpty(item.days) && alert === true && (
                              <span className="text-danger">Required</span>
                            )}
                            {item.days < 0 && alert === true && (
                              <>
                                <span className="text-danger">Invalid Value</span>
                              </>
                            )}
                            {item.days && item.days === 0 && alert === true && (
                              <>
                                <span className="text-danger">Invalid Value</span>
                              </>
                            )}
                            <CFormInput
                              placeholder="APY(%)"
                              aria-label="Last name"
                              name="APY"
                              value={item.APY}
                              type="number"
                              onChange={(e) => handleInputChange(e, key)}
                            />
                            {isEmpty(item.APY) && alert === true && (
                              <span className="text-danger">Required</span>
                            )}
                            {item.APY < 0 && alert === true && (
                              <>
                                <span className="text-danger">Invalid Value</span>
                              </>
                            )}
                            {item.APY && item.APY === 0 && alert === true && (
                              <>
                                <span className="text-danger">Invalid Value</span>
                              </>
                            )}
                            <CButton color="success" size="sm" onClick={handleAddClick}>
                              <CIcon icon={cilPlus}></CIcon>
                            </CButton>
                            &nbsp;
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => handleRemoveClick(key)}
                            >
                              <CIcon icon={cilX}></CIcon>
                            </CButton>
                            
                            
                          </div>
                        
                        )
                      })}
                      <div style={{padding:'20px'}}><span className="text-danger">{validErr && validErr.periodList}</span></div>
                  </CCol>
                )}
                {formValue && formValue.type.includes('flexible') && (
                  <CCol xs={12} sm={12} md={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Flexible APY(%)</CFormLabel>
                      <CFormInput
                        type="number"
                        size="sm"
                        aria-label="sm input example"
                        value={flexibleAPY}
                        name="flexibleAPY"
                        onChange={handleChange}
                      />
                      <span className="text-danger">{validErr && validErr.flexibleAPY}</span>
                    </div>
                  </CCol>
                )}
              </CRow>
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
                <button className="btn btn-secondary" onClick={() => history('/stake-list')}>
                  {' '}
                  Go Back
                </button>
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
