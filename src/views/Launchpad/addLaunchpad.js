import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptString } from 'src/lib/cryptoJS'
import {checkduplicate} from 'src/lib/checkduplicate'
import CKEditor from 'react-ckeditor-component'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
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
  CImage,
  CNavLink,
} from '@coreui/react'
import PropTypes from 'prop-types'
//import action
import { getCurrency } from '../../api/p2p/pair'
import {
  addLaunchpad,
  findLaunchpadById,
  editlaunchpad,
} from '../../api/Launchpad/launchpadController'
import { toast } from '../../redux/toast/toast.action'
//import config
import config from '../../config/index'
const initialFormValue = {
  currencyId: '',
  availableCoin: [],
  launchCoin: '',
  whitePaper: '',
  launchPrice: '',
  minAmount: '',
  discount: '',
  availableSupply: '',
  maxSupply: '',
  industry: '',
  website: '',
  telegram: '',
  twitter: '',
  youtube: '',
  linkedIn: '',
  facebook: '',
  content: '',
  startTimeStamp: '',
  endTimeStamp: '',
}
const heightVar = window.innerHeight - 190
const toolbarConfig = {
  height: heightVar,
  toolbar: 'Full',
  allowedContent: true,
  startupFocus: true,
}

const AddPair = () => {
  const [currency, setCurrency] = useState('')
  const [validErr, setValidErr] = useState({})
  const [formValue, setFormValue] = useState(initialFormValue)
  const [tokenoption, setTokenoption] = useState([])
  const [currencyOption, setcurrencyOption] = useState([])
  const [fiatoption, setFiatoption] = useState([])
  const [content, setContent] = useState('')
  const [imageShow, setImageShow] = useState('')
  let { id } = useParams()
  let dispatch = useDispatch()
  const history = useNavigate()
  let {
    currencyId,
    launchCoin,
    availableCoin,
    whitePaper,
    launchPrice,
    minAmount,
    discount,
    availableSupply,
    maxSupply,
    industry,
    website,
    telegram,
    twitter,
    youtube,
    linkedIn,
    facebook,
    startTimeStamp,
    endTimeStamp,
  } = formValue
  let option = []
  let tokenOption = []
  let fiatOption = []
  const fetchCurrency = async () => {
    let { success, result } = await getCurrency()
    if (success) {
      {
        result &&
          result.length > 0 &&
          result.map((item, key) => {
            if (item.type == 'token') {
              tokenOption.push({
                label: item.coin,
                value: item._id,
              })
            }
            var checktoken = checkduplicate(tokenOption)
            setTokenoption(checktoken)
            if (item.type == 'crypto' || item.type == 'token') {
              option.push({
                label: item.coin,
                value: item._id,
              })
            }
           var checkcurrency = checkduplicate(option)
            setcurrencyOption(checkcurrency)
            if (item.type == 'fiat') {
              fiatOption.push({
                label: item.coin,
                value: item._id,
              })
            }
            var checkfiat = checkduplicate(fiatOption)
            setFiatoption(checkfiat)
          })
      }

      setCurrency(result)
    }
  }
  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findLaunchpadById(decryptData)
    if (success) {
      setFormValue(result)
      setContent(result.content)
      console.log(result, '---re')
    }
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      setValidErr({})
    }
  }
  const handleFile = (e) => {
    e.preventDefault()
    const { name, files } = e.target
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
    setImageShow(URL.createObjectURL(files[0]))
  }
  const handleAvalCoin = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      let formData = {
        ...formValue,
        availableCoin: selectedOption.map((el) => {
          return el.value
        }),
      }
      setFormValue(formData)
    } else {
      let formData = {
        ...formValue,
        availableCoin: [],
      }
      setFormValue(formData)
    }
  }
  const handleEditorchange = (e) => {
    var newContent = e.editor.getData()
    setContent(newContent)
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('currencyId', formValue.currencyId)
    formData.append('availableCoin', formValue.availableCoin)
    formData.append('whitePaper', formValue.whitePaper)
    formData.append('launchPrice', formValue.launchPrice)
    formData.append('launchCoin', formValue.launchCoin)
    formData.append('discount', formValue.discount)
    formData.append('minAmount', formValue.minAmount)
    formData.append('availableSupply', formValue.availableSupply)
    formData.append('maxSupply', formValue.maxSupply)
    formData.append('industry', formValue.industry)
    formData.append('website', formValue.website)
    formData.append('startTimeStamp', formValue.startTimeStamp)
    formData.append('endTimeStamp', formValue.endTimeStamp)
    formData.append('telegram', formValue.telegram)
    formData.append('twitter', formValue.twitter)
    formData.append('facebook', formValue.facebook)
    formData.append('youtube', formValue.youtube)
    formData.append('linkedIn', formValue.linkedIn)
    formData.append('content', content)
    let { success, message, errors } = await addLaunchpad(formData)
    if (success) {
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/launchpad-Management')
    }
    if (errors) {
      setValidErr(errors)
    }
  }
  const handleEdit = async () => {
    let decryptData = decryptString(id, true)
    const formData = new FormData()
    formData.append('launchId', decryptData)
    formData.append('currencyId', formValue.currencyId)
    formData.append('availableCoin', formValue.availableCoin)
    formData.append('whitePaper', formValue.whitePaper)
    formData.append('launchPrice', formValue.launchPrice)
    formData.append('launchCoin', formValue.launchCoin)
    formData.append('discount', formValue.discount)
    formData.append('minAmount', formValue.minAmount)
    formData.append('availableSupply', formValue.availableSupply)
    formData.append('maxSupply', formValue.maxSupply)
    formData.append('industry', formValue.industry)
    formData.append('website', formValue.website)
    formData.append('startTimeStamp', formValue.startTimeStamp)
    formData.append('endTimeStamp', formValue.endTimeStamp)
    formData.append('telegram', formValue.telegram)
    formData.append('twitter', formValue.twitter)
    formData.append('facebook', formValue.facebook)
    formData.append('youtube', formValue.youtube)
    formData.append('linkedIn', formValue.linkedIn)
    formData.append('content', content)
    let { success, message, errors } = await editlaunchpad(formData)
    if (success) {
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/launchpad-Management')
    } else {
      if (errors) {
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
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Token</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="currencyId"
                      value={currencyId}
                      onChange={handleChange}
                    >
                      <option>Select Token</option>
                      {tokenoption.map((item, key) => {
                        return (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.currencyId}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Available Currency</CFormLabel>{' '}
                    <a href="/coin-list">Add currency</a>
                    <Select
                      styles={colourStyles}
                      name="availableCoin"
                      value={
                        currencyOption && currencyOption.length > 0
                          ? currencyOption.filter((el) => {
                              console.log(currencyOption, 'currencyOption')
                              console.log(availableCoin, 'availableCoin')
                              if (availableCoin.includes(el.value)) {
                                return el
                              }
                            })
                          : []
                      }
                      isMulti
                      options={currencyOption}
                      onChange={handleAvalCoin}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <span className="text-danger">{validErr && validErr.availableCoin}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">White Paper</CFormLabel>
                    <CFormInput name="whitePaper" type="file" id="image" onChange={handleFile} />
                    <span className="text-danger">{validErr && validErr.whitePaper}</span>
                    {imageShow && (
                      <a href={imageShow} download={whitePaper}>
                        <CButton>{formValue.whitePaper.name}</CButton>
                      </a>
                    )}
                    {whitePaper && !whitePaper.name && (
                      // <CImage
                      //   align="end"
                      //   rounded
                      //   src={config.STAKING_SERVICE.URL + '/launchpad/' + whitePaper}
                      //   width={100}
                      //   height={100}
                      // />

                      <a
                        href={config.LAUNCHPAD_SERVICE.URL + '/launchpad/' + whitePaper}
                        download={whitePaper}
                      >
                        <CButton>{whitePaper}</CButton>
                      </a>
                    )}
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Launch Price</CFormLabel>
                    <CFormInput
                      type="=number"
                      size="sm"
                      aria-label="sm input example"
                      value={launchPrice}
                      name="launchPrice"
                      onChange={handleChange}
                    />
                     <span className="text-danger">{validErr && validErr.launchPrice}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Launch Coin</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="launchCoin"
                      value={launchCoin}
                      onChange={handleChange}
                    >
                      <option>Select coin</option>
                      {fiatoption.map((item, key) => {
                        return (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.launchCoin}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Minimum Purchase Amount
                    </CFormLabel>
                    <CFormInput
                      type="=number"
                      size="sm"
                      aria-label="sm input example"
                      value={minAmount}
                      name="minAmount"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.minAmount}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Discount(%)</CFormLabel>
                    <CFormInput
                      type="=number"
                      size="sm"
                      aria-label="sm input example"
                      value={discount}
                      name="discount"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.discount}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Token Available to Sale
                    </CFormLabel>
                    <CFormInput
                      type="=number"
                      size="sm"
                      aria-label="sm input example"
                      value={availableSupply}
                      name="availableSupply"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.availableSupply}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Token Max Supply</CFormLabel>
                    <CFormInput
                      type="=number"
                      size="sm"
                      aria-label="sm input example"
                      value={maxSupply}
                      name="maxSupply"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.maxSupply}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Industry</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={industry}
                      name="industry"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.industry}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Website</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={website}
                      name="website"
                      placeholder="Example: https://www.que.exchange"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.website}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Start Date</CFormLabel>

                    <DatePicker
                      selected={startTimeStamp}
                      onChange={(date) => {
                        let newDate = new Date(date)
                        newDate.setMilliseconds(0)
                        let formData = {
                          ...formValue,
                          startTimeStamp: newDate.getTime(),
                        }
                        setFormValue(formData)
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <span className="text-danger">{validErr && validErr.startTimeStamp}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">End Date</CFormLabel>

                    <DatePicker
                      selected={endTimeStamp}
                      onChange={(date) => {
                        let newDate = new Date(date)
                        newDate.setMilliseconds(0)
                        let formData = {
                          ...formValue,
                          endTimeStamp: newDate.getTime(),
                        }
                        setFormValue(formData)
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <span className="text-danger">{validErr && validErr.endTimeStamp}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Telegram Link</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={telegram}
                      name="telegram"
                      placeholder="Example: https://telegram.org/"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.telegram}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Twitter Link</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={twitter}
                      name="twitter"
                      placeholder="Example: https://twitter.com/"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.twitter}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Facebook Link</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={facebook}
                      name="facebook"
                      placeholder="Example: https://www.facebook.com/"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.facebook}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Youtube Link</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={youtube}
                      name="youtube"
                      placeholder="Example: https://www.youtube.com/"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.youtube}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">LinkedIn Link</CFormLabel>
                    <CFormInput
                      type="=text"
                      size="sm"
                      aria-label="sm input example"
                      value={linkedIn}
                      name="linkedIn"
                      placeholder="Example: https://in.linkedin.com/"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.linkedIn}</span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={12}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Message Content</CFormLabel>
                    <CKEditor
                      activeClass="p10"
                      config={toolbarConfig}
                      content={content}
                      events={{
                        // blur: onBlur,
                        // afterPaste: afterPaste,
                        change: handleEditorchange,
                      }}
                    />
                    <span className="text-danger">{validErr && validErr.content}</span>
                  </div>
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
