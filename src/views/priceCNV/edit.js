import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CForm,
  CCardFooter,
  CFormSelect,
  CButton,
  CSpinner,
  CCardHeader,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
//import action
import { findById, editCnv } from '../../api/priceCnv'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'

let initialValue = {
  baseSymbol: '',
  convertSymbol: '',
  convertPrice: '',
  fetchFrom: '',
}

const UserReply = () => {
  const [formValue, setFormValue] = useState(initialValue)
  const [validErr, setValidErr] = useState({})
  const history = useNavigate()
  const [loader, setLoader] = useState(false)
  let { id } = useParams()
  let dispatch = useDispatch()
  let { baseSymbol, convertSymbol, fetchFrom, convertPrice } = formValue

  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (success) {
      setFormValue(result)
    }
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    console.log('value: ', value);
    console.log('name: ', name);
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      setValidErr({})
    }
  }
  const handleSubmit = async () => {
    let decryptData = decryptString(id, true)

    let data = {
      priceCNVId: decryptData,
      baseSymbol,
      convertSymbol,
      convertPrice,
      fetchFrom,
    }
    console.log(data, 'datadata')
    setLoader(true)
    let { success, message, errors } = await editCnv(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/cnv-list')
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
  }, [])
  console.log('---fetchFrom', fetchFrom)
  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardHeader>Price Conversion</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Base Symbol</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="Disabled input"
                    aria-label="Disabled input example"
                    value={baseSymbol}
                    disabled
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Convert Symbol</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="Disabled input"
                    aria-label="Disabled input example"
                    name="convertSymbol"
                    value={convertSymbol}
                    disabled
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Convert Price</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder=""
                    aria-label="Disabled input example"
                    name="convertPrice"
                    value={convertPrice}
                    onChange={handleChange}
                    disabled={fetchFrom != 'off' ? true : false}
                  />
                  <span className="text-danger">{validErr && validErr.convertPrice}</span>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Price Integration</CFormLabel>

                  <CFormSelect
                    aria-label="Default select example"
                    name="fetchFrom"
                    value={fetchFrom}
                    onChange={handleChange}
                  >
                    <option value={'off'}>Off</option>
                    <option value={'binance'}>Binance</option>
                    {/* <option value={'wazirx'}>Wazirx</option> */}

                  </CFormSelect>
                </CCol>
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
              <CButton className="submit-btn" onClick={handleSubmit}>
                Submit
              </CButton>
            )}
            <button className="btn btn-secondary" onClick={() => history('/cnv-list')}>
              {' '}
              Go Back
            </button>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
UserReply.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default UserReply
