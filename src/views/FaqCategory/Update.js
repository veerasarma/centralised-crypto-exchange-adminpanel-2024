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
import { getSingleCategory, UpdateCategory } from '../../api/faqCategory'

const intialFormValue = {
  name: '',
  status: '',
}

const Update = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [validated, setValidated] = useState(false)

  const { name, status } = formValue
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
        status,
      }
      let regex = /^[A-Za-z0-9]*$/

      if (!regex.test(name)) {
        return setError({ name: 'Only allow alphabets and positive numbers' })
      }
      const { success, error, message } = await UpdateCategory(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/faq-category')
        setError({})
      } else {
        // console.log(error, 'error')
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSingleCategory = async () => {
    try {
      let decryptData = decryptString(id, true)

      const { success, result } = await getSingleCategory(decryptData)
      if (success) {
        // console.log(result, 'result')
        let data = {
          name: result.name,
          status: result.status,
        }
        setFormValue(data)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

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
                <CFormLabel htmlFor="exampleFormControlInput1"> Category name</CFormLabel>
                <CFormInput type="text" id="name" value={name} onChange={handleChange} />
                <span className="text-danger">{error && error.name}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value={'active'}>Active</option>
                  <option value={'deactive'}>Deactive</option>
                </CFormSelect>
                <span className="text-danger">{error && error.Status}</span>
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
