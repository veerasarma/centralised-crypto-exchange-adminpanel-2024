import React, { useEffect, useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CCardFooter,
  CButton,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
//import api
import { getSingleAdmin, UpdateAdmin } from 'src/api/subadmin'

const intialFormValue = {
  name: '',
  email: '',
}

const Update = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const { name, email } = formValue
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useNavigate()

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
      let decryptData = decryptString(id, true)

      let reqData = {
        id: decryptData,
        name,
        email,
      }
      const { success, error, message } = await UpdateAdmin(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/sub-admin')
        setError({})
      } else {
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSingleCategory = async () => {
    try {
      let decryptData = decryptString(id, true)

      const { success, result } = await getSingleAdmin(decryptData)
      if (success) {
        let data = {
          name: result.name,
          email: result.email,
        }
        setFormValue(data)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  let array = []

  useEffect(() => {
    fetchSingleCategory()
  }, [])

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                <span className="text-danger">{error && error.name}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">email</CFormLabel>
                <CFormInput type="text" id="email" value={email} onChange={handleChange} />
                <span className="text-danger">{error && error.email}</span>
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

export default Update
