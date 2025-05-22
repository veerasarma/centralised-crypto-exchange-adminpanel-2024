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
import { UpdateSubmodule, getModules, SingleSubModule } from 'src/api/submodules'

const intialFormValue = {
  mainmodule: '',
  subModule: '',
  status: '',
}

const Update = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [data, setData] = useState()
  const [option, setOptions] = useState('')
  const [moduleName, setModuleName] = useState('')

  const [SubModules, setSubModules] = useState([])

  const dispatch = useDispatch()
  const history = useNavigate()
  const { id } = useParams()
  const { mainmodule, subModule, status } = formValue

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
      let check = false
      let decryptData = decryptString(id, true)
      let reqData = {
        id: decryptData,
        mainmodule,
        subModule,
        status,
      }
      nav && nav.length > 0 && nav.map(el => {
        if (el?.items?.length > 0) {
          let checkIndex = el.items.some(x => x.name == subModule)
          if (checkIndex) {
            if (el.name == moduleName) {
              check = true
            }
          }
        }
      })

      if (!check) {
        return setError({ subModule: 'Invalid submodule name' })
      }
      const { success, error, message } = await UpdateSubmodule(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        history('/sub-modules')
        setFormValue(intialFormValue)
        setError({})
      } else {
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchData = async () => {
    try {
      const { success, result } = await getModules()
      // console.log(result, 'result')
      if (success) {
        setOptions(result)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSingleData = async () => {
    try {
      let decryptData = decryptString(id, true)

      const { success, result } = await SingleSubModule(decryptData)
      if (success) {
        let data = {
          mainmodule: result.mainmoduleId._id,
          subModule: result.subModule,
          status: result.status,
        }
        setModuleName(result.mainmoduleId.pagename)
        setFormValue(data)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    fetchData()
    fetchSingleData()
  }, [])

  useEffect(() => {
    if (mainmodule && nav && nav.length > 0)
      setSubModules(nav.find(module => module.name == mainmodule))
  }, [mainmodule])

  useEffect(() => {
    if (mainmodule && option && option.length > 0) {
      let findData = option.find(module => module._id == mainmodule);
      if (findData) {
        setSubModules(nav.find(module => module.name == findData.pagename))
      }
    }

  }, [mainmodule])
  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Module Name</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      id="mainmodule"
                      value={mainmodule}
                      onChange={handleChange}
                    >
                      <option>Select Module</option>
                      {option &&
                        option.length > 0 &&
                        option.map((item, key) => {
                          //   console.log('currecyOption', key)
                          return (
                            <option key={key} value={item._id}>
                              {item.pagename}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    <span className="text-danger">{error && error.mainmodule}</span>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">SubModule Name</CFormLabel>
                    {/* <CFormInput
                      id="subModule"
                      value={subModule}
                      onChange={handleChange}
                      rows="3"

                    // text="Must be 8-20 words long."
                    ></CFormInput> */}
                    <CFormSelect
                      aria-label="Default select example"
                      id="subModule"
                      value={subModule}
                      onChange={handleChange}
                    >
                      <option>Select Sub Module</option>
                      {
                        SubModules && SubModules.items && SubModules.items.length > 0 &&
                        SubModules.items.map((item, key) => {
                          return (
                            <option key={key} value={item.name}>
                              {item.name}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    <span className="text-danger">{error && error.subModule}</span>
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
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Update
