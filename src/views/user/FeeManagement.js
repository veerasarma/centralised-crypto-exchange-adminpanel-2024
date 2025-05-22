import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
  CSpinner,
  CCardHeader,
} from '@coreui/react'
import PropTypes from 'prop-types'
//import action
import { addFeeManagement, findById } from '../../api/user'
import { getCurrency, editPair } from '../../api/spot/pair'
//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'

const AddPair = () => {
  const [currency, setCurrency] = useState([])
  const [ids, setIds] = useState([])
  const [validErr, setValidErr] = useState({})
  const [loader, setLoader] = useState(false)

  const history = useNavigate()
  let { id } = useParams()
  let dispatch = useDispatch()
  const fetchCurrency = async () => {
    let { success, result } = await getCurrency()
    if (success) {
      var optionArr = []
      result.filter(function (item) {
        var i = optionArr.findIndex((x) => (x.label == item.coin))
        if (i <= -1) {
          optionArr.push({
            label: item.coin,
            value: item._id,
          })
        }
        return null
      })
      setCurrency(optionArr)
    }
  }
  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (success) {
      setIds(result)
    }
  }
  const handleSubmit = async () => {
    let decryptData = decryptString(id, true)
    let data = {
      id: decryptData,
      currArr: ids
    }
    setLoader(true)
    let { success, message, errors } = await addFeeManagement(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/userList')
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
  const handlePairChange = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setIds(
        selectedOption.map((el) => {
          return el.value
        })
      )

    } else {
      setIds([])
    }
  }
  const colourStyles = {
    option: (styles, { isFocused }) => {
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
          <CCardHeader>Select currency</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <Select
                      styles={colourStyles}
                      value={
                        currency && currency.length > 0
                          ? currency.filter((el) => {
                            if (ids.includes(el.value)) {
                              return el
                            }
                          })
                          : []
                      }
                      isMulti
                      options={currency}
                      onChange={handlePairChange}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    ></Select>

                    <span className="text-danger">{validErr && validErr.firstCurrencyId}</span>
                  </div>
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
              <>
                <CButton className="submit-btn" onClick={handleSubmit}>
                  Submit
                </CButton>
                <button className="btn btn-secondary" onClick={() => history('/spot-pair')}>
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
