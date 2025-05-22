import React, { useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardFooter,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CButton,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
// import api
import { addAdmin } from 'src/api/subadmin'

const intialFormValue = {
  name: '',
  email: '',
  password: '',
  role: '',
}

const Add = () => {
  // state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const history = useNavigate()

  const { name, email, password, role } = formValue

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
      let reqData = {
        name,
        email,
        password,
        role,
      }
      const { success, error, message } = await addAdmin(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/sub-admin')
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
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                    <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                    <span className="text-danger">{error && error.name}</span>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput type="text" id="email" value={email} onChange={handleChange} />
                    <span className="text-danger">{error && error.email}</span>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Password</CFormLabel>
                    <CFormInput
                      type="text"
                      id="password"
                      value={password}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{error && error.password}</span>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Role</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      id="role"
                      value={role}
                      onChange={handleChange}
                    >
                      <option> Select Role</option>
                      {/* <option value={'admin'}>Admin</option> */}
                      <option value={'subadmin'}>Sub Admin</option>
                    </CFormSelect>
                    <span className="text-danger">{error && error.role}</span>
                  </div>
                </CCol>
                <CCol col md={12}>
                  <CButton className="submit-btn" onClick={submit}>
                    Submit
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Add
