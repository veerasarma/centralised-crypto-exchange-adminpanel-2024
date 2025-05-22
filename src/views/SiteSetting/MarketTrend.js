import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CImage,
  CButton,
  CCol,
  CRow,
  CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { getPairDropdown, updateSetting } from 'src/api/sitesetting'
const intialFormValue = {
  marketTrend: '',
}
const Trend = (props) => {
  const { record } = props
  const history = useNavigate()
  //state
  const [pairoption, setOptions] = useState('')
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const { marketTrend } = formValue
  //function
  const handlePairChange = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setFormValue({
        marketTrend: selectedOption.map((el) => {
          return el.value
        }),
      })
    } else {
      setFormValue({ marketTrend: [] })
    }
  }

  const Submit = async (e) => {
    try {
      let reqData = {
        marketTrend,
      }
      const { success, error, message } = await updateSetting(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        history('/dashboard')
      } else {
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchPairDropdown = async () => {
    try {
      const { success, result } = await getPairDropdown()
      if (success) {
        let option = []
        result &&
          result.length > 0 &&
          result.map((item, key) => {
            option.push({
              label: item.firstCurrencySymbol + item.secondCurrencySymbol,
              value: item._id,
            })
          })
        setOptions({ pairListOption: option })
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (record && record !== undefined && record !== '') {
      setFormValue({ marketTrend: record.marketTrend, records: record })
    }
    fetchPairDropdown()
  }, [record])

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'null' : null,
      }
    },
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Pair Name
              </CFormLabel>
              <CCol sm={5}>
                <Select
                  styles={colourStyles}
                  value={
                    pairoption.pairListOption && pairoption.pairListOption.length > 0
                      ? pairoption.pairListOption.filter((el) => {
                          if (marketTrend.includes(el.value)) {
                            return el
                          }
                        })
                      : []
                  }
                  isMulti
                  options={pairoption.pairListOption}
                  onChange={handlePairChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                ></Select>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter>
          {' '}
          <CButton className="submit-btn" onClick={Submit}>
            Submit
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

Trend.propTypes = {
  record: PropTypes.any,
}

export default Trend
