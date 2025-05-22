import React, { useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardFooter,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { AddCategory } from '../../api/support'

const intialFormValue = {
  categoryName: '',
}

const Add = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const history = useNavigate()

  const { categoryName } = formValue

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

  const Submit = async (e) => {
    try {
      let reqData = {
        categoryName,
      }
      const { success, error, message } = await AddCategory(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/support-category')
        setFormValue(intialFormValue)
        setError({})
      } else {
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1"> Category name</CFormLabel>
                <CFormInput
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={handleChange}
                />
                <span className="text-danger">{error && error.categoryName}</span>
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
