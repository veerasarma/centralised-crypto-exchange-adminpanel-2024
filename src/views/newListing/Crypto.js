import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
  CCardHeader,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'src/lib/validate'
// import action
import { addListing, updateListing } from '../../api/Coin/coin'
import { toast } from '../../redux/toast/toast.action'

//import config
import config from '../../config/index'

const initialFormValue = {
  name: '',
  image: '',
}
const Crypo = (props) => {
  const { record } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState({})
  const [imageShow, setImageShow] = useState('')

  //function
  const handleChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
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
      image,
    } = formValue
    if (image) {
      if (image.size > 51200) {
        toast(
          {
            message: 'Image size should be less than  50 Kb',
            type: 'error',
          },
          dispatch,
        )
        return false
      }
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('id', record._id)
    setLoader(true)
    try {
      const { status, message, error } = await updateListing(formData)
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
        navigate('/new-list')
      } else if (status === 'failed') {
        if (error) {
          setErrors(error)
        }
      }
    } catch (err) {
      console.log('...err', err)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      name,
      image,
    } = formValue
    if (image) {
      if (image.size > 51200) {
        toast(
          {
            message: 'Image size should be less than  50 Kb',
            type: 'error',
          },
          dispatch,
        )
        return false
      }
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    setLoader(true)
    try {
      const { status, message, error } = await addListing(formData)
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
        navigate('/new-list')
      } else if (status === 'failed') {
        if (error) {
          setErrors(error)
        }
      }
    } catch (err) { }
  }
  useEffect(() => {
    if (record && record !== undefined && record !== '') {
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
        isTradeFee: record.isTradeFee,
      }
      setFormValue(formData)
    }
  }, [record])
  const {
    name,
    image,
  } = formValue
  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Add Crypto</CCardHeader>
        <CCardBody>
          <CForm className="row g-1 needs-validation">
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="staticEmail">Currency Name</CFormLabel>

                <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                <span className="text-danger">{errors.name}</span>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="inputPassword">Currency Icon</CFormLabel>
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
                {/* <CFormInput type="file" id="image" onChange={handleFile} /> */}
                <span className="text-danger">{errors.image}</span>
                {imageShow && (
                  <CImage align="start" rounded src={imageShow} width={100} height={100} />
                )}
                {image && !image.name && (
                  <CImage
                    align="start"
                    rounded
                    src={config.WALLET_SERVICE.URL + '/currency/' + image}
                    width={100}
                    height={100}
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
