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
// import api
import { addCategory } from '../../api/faqCategory'

const intialFormValue = {
  name: '',
}

const Add = () => {
  // state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const history = useNavigate()

  const { name } = formValue

  // function
  const handleChange = (e) => {
    e.preventDefault()
    let { id, value } = e.target
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    if (value) {
      setError({})
    }
  }

  const submit = async (e) => {
    try {
      let regex = /^[A-Za-z0-9]*$/
      let reqData = {
        name,
      }
      if (!regex.test(name)) {
        return setError({ name: 'Only allow alphabets and positive numbers' })
      }
      const { success, error, message } = await addCategory(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/faq-category')
        setFormValue(intialFormValue)
        setError({})
      } else {
        // console.log(error, 'error')
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
                <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                <span className="text-danger">{error && error.name}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={submit}>
              Submit
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Add
