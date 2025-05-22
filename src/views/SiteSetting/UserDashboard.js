import React, { useState, useEffect, Fragment } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CForm,
} from '@coreui/react'
import { cilMinus, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'src/lib/validate'
// import action
import { updateUsrDash } from 'src/api/sitesetting'
import { getCurrency } from 'src/api/Coin/coin'

const initialFormValue = {
  currencyId: '',
  colorCode: '',
}

const Dashboard = (props) => {
  const { record } = props

  // state
  const [inputFields, setInputFields] = useState([initialFormValue])
  const [validErr, setValidErr] = useState({})
  const [currencydata, setCurrency] = useState()
  const [status, setStatue] = useState(true)
  const dispatch = useDispatch()

  // function

  const handleAddFields = () => {
    if (isEmpty(inputFields.currencyId) && isEmpty(inputFields.colorCode)) {
      setStatue(false)
    }
    const values = [...inputFields]
    values.push({
      currencyId: '',
      colorCode: '',
    })
    setInputFields(values)
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  const handleInputChange = (index, e) => {
    e.preventDefault()
    const { name, value } = e.target
    const values = [...inputFields]
    values[index][name] = value
    setInputFields(values)
    if (value) {
      setValidErr({})
    }
  }

  const fetchCurrency = async () => {
    try {
      const { success, result } = await getCurrency()
      // console.log(result, 'currency')
      if (success) {
        setCurrency(result)
      }
    } catch (err) {}
  }

  const handleSubmit = async (e) => {
    try {
      let reqData = {
        currencyList: inputFields,
      }
      const { success, error, message } = await updateUsrDash(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
      } else {
      }
      if (error) {
        setValidErr(error)
      }
    } catch (err) {
      console.log(err, 'errr')
    }
  }

  useEffect(() => {
    if (record && record.userDashboard !== undefined && record.userDashboard !== '') {
      setInputFields(record.userDashboard)
    }
    fetchCurrency()
  }, [record])

  return (
    <CCard>
      <CCardBody>
        <CForm>
          <CRow>
            {inputFields.map((inputField, index) => {
              return (
                <Fragment key={`${inputField}~${index}`}>
                  <div className="form-group col-sm-6">
                    <CFormLabel htmlFor="firstName">Currency</CFormLabel>
                    <CFormSelect
                      name="currencyId"
                      value={inputField.currencyId}
                      onChange={(e) => handleInputChange(index, e)}
                    >
                      <option value={''}>Select Currency</option>
                      {currencydata &&
                        currencydata.length > 0 &&
                        currencydata.map((item, key) => {
                          //   console.log('currecyOption', key)
                          return (
                            <option key={key} value={item._id}>
                              {item.coin}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    {inputField && inputField.currencyId ? null : (
                      <>
                        <span className="text-danger">{validErr && validErr.currency}</span>
                      </>
                    )}
                  </div>
                  <div className="form-group col-sm-4">
                    <CFormLabel htmlFor="colorCode">Color Coder</CFormLabel>
                    <CFormInput
                      type="text"
                      className="form-control"
                      name="colorCode"
                      value={inputField.colorCode}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    {inputField && inputField.colorCode ? null : (
                      <>
                        <span className="text-danger">{validErr && validErr.colorCode}</span>
                      </>
                    )}
                  </div>
                  {
                    <div className="form-group col-sm-2" id="plus_minus-button">
                      <CButton
                        className="btn btn-danger"
                        type="button"
                        size="sm"
                        onClick={() => handleRemoveFields(index)}
                      >
                        <CIcon icon={cilMinus}></CIcon>
                      </CButton>{' '}
                      <CButton
                        className="btn btn-success"
                        type="button"
                        size="sm"
                        onClick={() => handleAddFields()}
                      >
                        <CIcon icon={cilPlus}></CIcon>
                      </CButton>
                    </div>
                  }
                </Fragment>
              )
            })}
          </CRow>
        </CForm>
      </CCardBody>
      <CCardFooter>
        {inputFields.length <= 0 && status == true ? (
          <>
            <CButton onClick={() => handleAddFields()} className="submit-btn">
              <CIcon icon={cilPlus}></CIcon> Add Currency Color
            </CButton>
          </>
        ) : (
          <CButton
            className="submit-btn"
            type="submit"
            onClick={
              isEmpty(inputFields.currencyId) && isEmpty(inputFields.colorCode)
                ? () => handleSubmit()
                : () => handleAddFields()
            }
          >
            submit
          </CButton>
        )}
      </CCardFooter>
    </CCard>
  )
}

Dashboard.propTypes = {
  record: PropTypes.any,
}

export default Dashboard
