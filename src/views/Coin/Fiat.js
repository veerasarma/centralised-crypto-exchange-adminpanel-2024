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
} from '@coreui/react'

// import action
import { addCurrency, updateCurrency } from '../../api/Coin/coin'
import { toast } from '../../redux/toast/toast.action'

//import config
import config from '../../config/index'

const initialFormValue = {
  name: '',
  coin: '',
  symbol: '',
  type: 'crypto',
  withdrawFee: '',
  minimumWithdraw: '',
  maximumWithdraw: '',
  minimumDeposit: '',
  maximumDeposit: '',
  contractDecimal: '',
  // maximumWithdrawLimit: '',
  image: '',
  currencyId: '',
  currencyType: 'fiat',
  status: 'active',
  bankName: '',
  accountNo: '',
  holderName: '',
  bankcode: '',
  country: '',
  isTradeFee: 'not_ignore'
}

const Crypo = (props) => {
  const { record } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState({})
  const [toaster, setToast] = useState({})
  const [imageShow, setImageShow] = useState('')

  //function
  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    var numberRegex = /^[0-9\b]+$/
    if (id == 'accountNo') {
      if (!(value == '' || numberRegex.test(value))) {
        return
      }
    }
    if (id == "withdrawFee" || id == "minimumWithdraw" || id == "maximumDeposit" || id == "maximumWithdraw" || id == "minimumDeposit") {
      if (/[^0-9.]/.test(value)) return;
    }
    if (id == "contractDecimal") {
      if (/[^0-9]/.test(value)) return;
    }
    if (id == "name" || id == "symbol" || id == 'coin') {
      if (/[^a-zA-Z0-9 ]/.test(value)) return;
    }
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
  }

  const handleFile = (e) => {
    e.preventDefault()
    const { id, files } = e.target
    let formData = { ...formValue, ...{ [id]: files[0] } }
    setFormValue(formData)
    setImageShow(URL.createObjectURL(files[0]))
  }

  const editSubmit = async (e) => {
    e.preventDefault()

    const {
      name,
      coin,
      symbol,
      contractDecimal,
      withdrawFee,
      minimumDeposit,
      minimumWithdraw,
      maximumWithdraw,
      status,
      image,
      currencyType,
      currencyId,
      bankName,
      accountNo,
      holderName,
      // maximumWithdrawLimit,
      bankcode,
      country,
      isTradeFee
    } = formValue
    if (image) {
      if (image.size > 20480) {
        toast(
          {
            message: 'Image size should be less than  20 Kb',
            type: 'error',
          },
          dispatch,
        )
        return false
      }
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('coin', coin)
    formData.append('symbol', symbol)
    formData.append('contractDecimal', contractDecimal)
    formData.append('withdrawFee', withdrawFee)
    formData.append('minimumWithdraw', minimumWithdraw)
    formData.append('maximumWithdraw', maximumWithdraw)
    formData.append('minimumDeposit', minimumDeposit)
    formData.append('status', status)
    formData.append('image', image)
    formData.append('currencyType', currencyType)
    formData.append('currencyId', currencyId)
    formData.append('bankName', bankName)
    formData.append('accountNo', accountNo)
    formData.append('holderName', holderName)
    formData.append('bankcode', bankcode)
    formData.append('country', country)
    // formData.append('maximumWithdrawLimit', maximumWithdrawLimit)
    formData.append('isTradeFee', isTradeFee)
    setLoader(true)
    try {
      const { status, message, error } = await updateCurrency(formData)
      setLoader(false)
      if (status === 'success') {
        toast(
          {
            message: message,
            type: status,
          },
          dispatch,
        )
        setFormValue(initialFormValue)
        setErrors({})
        navigate('/coin-list')
      } else if (status === 'failed') {
        if (error) {
          setErrors(error)
        }
      }
    } catch (err) { }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      name,
      coin,
      symbol,
      contractDecimal,
      withdrawFee,
      minimumDeposit,
      minimumWithdraw,
      maximumWithdraw,
      status,
      image,
      currencyType,
      bankName,
      accountNo,
      holderName,
      bankcode,
      country,
      // maximumWithdrawLimit,
      isTradeFee
    } = formValue
    if (image) {
      if (image.size > 20480) {
        toast(
          {
            message: 'Image size should be less than  20 Kb',
            type: 'error',
          },
          dispatch,
        )
        return false
      }
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('coin', coin)
    formData.append('symbol', symbol)
    formData.append('contractDecimal', contractDecimal)
    formData.append('withdrawFee', withdrawFee)
    formData.append('minimumWithdraw', minimumWithdraw)
    formData.append('minimumDeposit', minimumDeposit)
    formData.append('maximumWithdraw', maximumWithdraw)
    formData.append('status', status)
    formData.append('image', image)
    formData.append('currencyType', currencyType)
    formData.append('bankName', bankName)
    formData.append('accountNo', accountNo)
    formData.append('holderName', holderName)
    formData.append('bankcode', bankcode)
    formData.append('country', country)
    // formData.append('maximumWithdrawLimit', maximumWithdrawLimit)
    formData.append('isTradeFee', isTradeFee)
    setLoader(true)
    try {
      const { status, message, error } = await addCurrency(formData)
      setLoader(false)
      if (status == 'success') {
        toast(
          {
            message: message,
            type: status,
          },
          dispatch,
        )
        setFormValue(initialFormValue)
        setErrors({})
        navigate('/coin-list')
      } else if (status == 'failed') {
        if (error) {
          setErrors(error)
        }
      }
    } catch (err) { }
  }
  useEffect(() => {
    if (record && record != undefined && record != '') {
      let formData = {
        name: record.name,
        coin: record.coin,
        symbol: record.symbol,
        type: 'crypto',
        withdrawFee: record.withdrawFee,
        minimumWithdraw: record.minimumWithdraw,
        maximumWithdraw: record.maximumWithdraw,
        // maximumWithdrawLimit: record.maximumWithdrawLimit,
        minimumDeposit: record.minimumDeposit,
        contractDecimal: record.contractDecimal,
        image: record.image,
        status: record.status,
        currencyType: record.type,
        currencyId: record._id,
        bankName: record && record.bankDetails && record.bankDetails.bankName,
        accountNo: record && record.bankDetails && record.bankDetails.accountNo,
        holderName: record && record.bankDetails && record.bankDetails.holderName,
        bankcode: record && record.bankDetails && record.bankDetails.bankcode,
        country: record && record.bankDetails && record.bankDetails.country,
        isTradeFee: record.isTradeFee,
      }
      setFormValue(formData)
    }
  }, [record])
  const {
    name,
    coin,
    symbol,
    contractDecimal,
    withdrawFee,
    minimumDeposit,
    minimumWithdraw,
    maximumWithdraw,
    status,
    image,
    bankName,
    accountNo,
    holderName,
    bankcode,
    country,
    // maximumWithdrawLimit,
    isTradeFee
  } = formValue
  return (
    <>
      <CCard className="mb-3">
        <CCardBody>
          <CForm
            className="row g-1 needs-validation"
          // onSubmit={handleSubmit}
          >
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-form-label">
                  Currency Name
                </CFormLabel>

                <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                <span className="text-danger">{errors.name}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Coin
                </CFormLabel>

                <CFormInput type="text" id="coin" value={coin} onChange={handleChange} />
                <span className="text-danger">{errors.coin}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Symbol
                </CFormLabel>

                <CFormInput type="text" id="symbol" value={symbol} onChange={handleChange} />
                <span className="text-danger">{errors.symbol}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Decimal
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="contractDecimal"
                  value={contractDecimal}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.contractDecimal}</span>
              </CCol>
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Withdrawal Fee(%)
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="withdrawFee"
                  value={withdrawFee}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.withdrawFee}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Minimum Withdrawal
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="minimumWithdraw"
                  value={minimumWithdraw}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.minimumWithdraw}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Maximum Withdrawal
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="maximumWithdraw"
                  value={maximumWithdraw}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.maximumWithdraw}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Maximum Withdrawal Limit (per day)
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="maximumWithdrawLimit"
                  value={maximumWithdrawLimit}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.maximumWithdrawLimit}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Minimum Deposit
                </CFormLabel>

                <CFormInput
                  type="text"
                  id="minimumDeposit"
                  value={minimumDeposit}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.minimumDeposit}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Bank Name
                </CFormLabel>

                <CFormInput type="text" id="bankName" value={bankName} onChange={handleChange} />
                <span className="text-danger">{errors.bankName}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Account Numer
                </CFormLabel>

                <CFormInput type="text" id="accountNo" value={accountNo} onChange={handleChange} />
                <span className="text-danger">{errors.accountNo}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Holder Name
                </CFormLabel> */}

              {/* <CFormInput
                  type="text"
                  id="holderName"
                  value={holderName}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.holderName}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Bank Code
                </CFormLabel>

                <CFormInput type="text" id="bankcode" value={bankcode} onChange={handleChange} />
                <span className="text-danger">{errors.bankcode}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Country
                </CFormLabel>

                <CFormInput type="text" id="country" value={country} onChange={handleChange} />
                <span className="text-danger">{errors.country}</span>
              </CCol> */}
              {/* <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword">Trade Fee Option</CFormLabel>

                <CFormSelect
                  size="sm"
                  className="mb-3"
                  aria-label="Small select example"
                  value={isTradeFee}
                  id="isTradeFee"
                  onChange={handleChange}
                >
                  <option value="ignore">Ignore</option>
                  <option value="not_ignore">Not Ignore</option>
                </CFormSelect>
              </CCol> */}
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Status
                </CFormLabel>
                <CFormSelect
                  size="sm"
                  className="mb-3"
                  aria-label="Small select example"
                  value={status}
                  id="status"
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-form-label">
                  Currency Icon
                </CFormLabel>

                {/* <CFormInput type="file" id="image" onChange={handleFile} /> */}
                <div className="input-group btn-file-group">
                  <span className="input-group-btn">
                    <label className="btn btn-secondary btn-file">
                      <div className="input required">
                        <input type="file" onChange={handleFile} id="image" />
                      </div>{' '}
                      <span className="browse-btn">Browse</span>
                    </label>
                  </span>
                  <span className="file-input-label"></span>
                </div>
                <span className="text-danger">{errors.image}</span>
                {imageShow && <CImage className="logoPreview" rounded src={imageShow} />}
                {image && !image.name && (
                  <CImage
                    className="logoPreview"
                    rounded
                    src={config.WALLET_SERVICE.URL + '/currency/' + image}
                  />
                )}
              </CCol>

              <CCol xs={12}>
                {loader && (
                  <CButton disabled>
                    <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                    Loading...
                  </CButton>
                )}
                {!loader && record && (
                  <CButton type="submit" onClick={editSubmit}>
                    Submit
                  </CButton>
                )}
                {!loader && !record && (
                  <CButton type="submit" onClick={handleSubmit}>
                    Add Currency
                  </CButton>
                )}
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

Crypo.propTypes = {
  record: PropTypes.object,
}

export default Crypo
