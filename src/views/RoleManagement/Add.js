import React, { useEffect, useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CButton,
  CCardFooter,
} from '@coreui/react'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

//import api
import { getSubModules, addRole } from 'src/api/role'

const intialFormValue = {
  role: '',
  restriction: '',
}

const Add = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [option, setOptions] = useState('')

  const dispatch = useDispatch()
  const history = useNavigate()

  const { role, restriction } = formValue

  //function
  const handleChange = (e) => {
    e.preventDefault()
    let { id, value } = e.target
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    if (value) {
      setError({})
    }
  }

  const selectorChange = (selectedOption) => {
    if (selectedOption && selectedOption.length > 0) {
      setFormValue({
        ...formValue,
        ...{
          restriction: selectedOption.map((el) => {
            return el.value
          }),
        },
      })
    } else {
      setFormValue({ restriction: [] })
    }
  }

  const Submit = async (e) => {
    try {
      let reqData = {
        role,
        restriction,
      }
      const { success, error, message } = await addRole(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setFormValue(intialFormValue)
        setError({})
        history('/role-management')
      } else {
        // console.log(error, 'error')
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchData = async () => {
    try {
      const { success, result } = await getSubModules()
      // console.log(result, 'result')
      if (success) {
        let option = []
        result &&
          result.length > 0 &&
          result.map((item, key) => {
            option.push({
              label: item.subModule,
              value: item.subModule,
            })
          })
        setOptions({ option })
      }
    } catch (err) {}
  }

  useEffect(() => {
    fetchData()
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
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Module Name</CFormLabel>
                <Select
                  styles={colourStyles}
                  value={
                    restriction && restriction.length > 0
                      ? option.option.filter((el) => {
                          if (restriction.includes(el.value)) {
                            return el
                          }
                        })
                      : []
                  }
                  isMulti
                  onChange={selectorChange}
                  options={option.option}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <span className="text-danger">{error && error.restriction}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Role</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="role"
                  value={role}
                  onChange={handleChange}
                >
                  <option>Select role</option>
                  <option value={'admin'}>Admin</option>
                  <option value={'subadmin'}>Sub Admin</option>
                </CFormSelect>
                <span className="text-danger">{error && error.role}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Add
