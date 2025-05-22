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
  CFormInput,
} from '@coreui/react'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import nav from 'src/_nav'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
//import api
import { Updatemodule, getSingleModule } from 'src/api/modules'

const intialFormValue = {
  pagename: '',
  status: '',
}

const Update = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const history = useNavigate()
  const { id } = useParams()
  const { pagename, status } = formValue

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
        pagename,
        status,
      }
      let checkIndex = nav.findIndex(x => x.name == pagename)
      if (checkIndex < 0) {
        return setError({ pagename: 'Invalid module name' })
      }

      const { success, error, message } = await Updatemodule(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/modules')
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

  const fetchSingleData = async () => {
    try {
      let decryptData = decryptString(id, true)

      const { success, result } = await getSingleModule(decryptData)
      if (success) {
        let data = {
          pagename: result.pagename,
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
    fetchSingleData()
  }, [])

  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={6} sm={6} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Modules name</CFormLabel>
                    {/* <CFormInput
                      id="pagename"
                      value={pagename}
                      onChange={handleChange}
                      rows="3"

                    // text="Must be 8-20 words long."
                    ></CFormInput> */}
                    <CFormSelect
                      aria-label="Default select example"
                      id="pagename"
                      value={pagename}
                      onChange={handleChange}
                    >
                      <option>Select Modules</option>
                      {nav && nav.length > 0 && nav.map((item, key) => {
                        return (
                          <option value={item.name} key={key}>{item.name}</option>
                        )
                      })}

                    </CFormSelect>
                    <span className="text-danger">{error && error.pagename}</span>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      id="status"
                      value={status}
                      onChange={handleChange}
                    >
                      <option>Select status</option>
                      <option value={'active'}>Active</option>
                      <option value={'deactive'}>Deactive</option>
                    </CFormSelect>
                    <span className="text-danger">{error && error.status}</span>
                  </div>
                </CCol>
                <CCol md={12}>
                  <CButton className="submit-btn" onClick={Submit}>
                    Submit
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Update
