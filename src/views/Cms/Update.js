import React, { useEffect, useState } from 'react'
import CKEditor from 'react-ckeditor-component'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardFooter,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { cilArrowLeft, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
//import api
import { getSingleCms, UpdateCms } from '../../api/cms'

//import lib
import { decryptString } from 'src/lib/cryptoJS'

const heightVar = window.innerHeight - 190
const toolbarConfig = {
  height: heightVar,
  toolbar: 'Full',
  allowedContent: true,
  startupFocus: true,
}

const intialFormValue = {
  identifier: '',
  title: '',
  status: '',
  content: '',
}

const Update = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [Cdata, setContent] = useState('')
  const navigate = useNavigate()
  const { identifier, status, content, title } = formValue
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

  const handleEditorchange = (e) => {
    var newContent = e.editor.getData()
    setContent(newContent)
  }

  const Submit = async (e) => {
    try {
      let decryptData = decryptString(id, true)

      let reqData = {
        id: decryptData,
        identifier,
        title,
        content: Cdata,
        status,
      }
      const { success, error, message } = await UpdateCms(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        history('/cmsList')
      } else {
        // console.log(error, 'error')
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSingleCms = async () => {
    try {
      let decryptData = decryptString(id, true)

      const { success, result } = await getSingleCms(decryptData)
      if (success) {
        // console.log(result, 'result')
        let data = {
          identifier: result.identifier,
          status: result.status,
          title: result.title,
          content: result.content,
        }
        setContent(result.content)
        setFormValue(data)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    fetchSingleCms()
  }, [])

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <CButton
              className="add-btn"
              onClick={() => navigate('/cmsList')}
              style={{ 'margin-right': '10px' }}
            >
              <CIcon icon={cilArrowLeft}></CIcon> Back
            </CButton>
          </div>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Identifier</CFormLabel>
                <CFormInput type="text" id="identifier" value={identifier} />
              </div>
              {identifier == 'home' || identifier == 'about' ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput type="text" id="title" value={title} />
                </div>
              ) : (
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                  <CFormInput type="text" id="title" value={title} onChange={handleChange} />
                  <span className="text-danger">{error && error.title}</span>
                </div>
              )}

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option>Status</option>
                  <option value={'active'}>Active</option>
                  <option value={'deactive'}>Deactive</option>
                </CFormSelect>
                <span className="text-danger">{error && error.Status}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Content</CFormLabel>
                <CKEditor
                  activeClass="p10"
                  config={toolbarConfig}
                  content={Cdata}
                  events={{
                    // blur: onBlur,
                    // afterPaste: afterPaste,
                    change: handleEditorchange,
                  }}
                />
                <span className="text-danger">{error && error.content}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>{' '}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Update
