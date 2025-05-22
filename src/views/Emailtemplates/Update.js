import React, { useEffect, useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
  CCardFooter,
  CFormInput,
  CFormLabel,
  CButton,
  CCardHeader,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import CKEditor from 'react-ckeditor-component'

import { toast } from '../../redux/toast/toast.action'
import { cilArrowLeft, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//import lib
import { decryptString } from 'src/lib/cryptoJS'

//import api
import { getSingleTemplate, UpdateTemplate } from '../../api/emailTemplate'
import { useDispatch } from 'react-redux'

import { convertToRaw, EditorState as DraftEditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../template.css"
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const heightVar = window.innerHeight - 190
const toolbarConfig = {
  height: heightVar,
  toolbar: 'Full',
  allowedContent: true,
  startupFocus: true,
}

const intialFormValue = {
  identifier: '',
  subject: '',
  status: '',
  langCode: '',
  content: '',
}

const Update = () => {
  //state
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [Cdata, setContent] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { identifier, status, content, subject, langCode } = formValue

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

  const handleEditorchange = (editorState) => {
    // var newContent = editorState.editor.getData()
    // setContent(newContent)
    setContent(editorState);
  }

  const Submit = async (e) => {
    try {
      let decryptData = decryptString(id, true)
      let reqData = {
        id: decryptData,
        identifier,
        subject,
        content: draftToHtml(convertToRaw(Cdata.getCurrentContent())), // Cdata,
        langCode,
        status,
      }
      const { success, error, message } = await UpdateTemplate(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        history('/templateList')
      } else {
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSingleTemplate = async () => {
    try {
      let decryptData = decryptString(id, true)
      const { success, result } = await getSingleTemplate(decryptData)
      if (success) {
        // console.log(result, 'result')
        let data = {
          identifier: result.identifier,
          subject: result.subject,
          status: result.status,
          langCode: result.langCode,
        }
        setHtmlContent(result.content)
        // setContent(result.content)
        setFormValue(data)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }
  // Function to set HTML content
  const setHtmlContent = (html) => {
    const { contentBlocks, entityMap } = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const newEditorState = DraftEditorState.createWithContent(contentState);
    setContent(newEditorState);
  };

  useEffect(() => {
    fetchSingleTemplate()
  }, [])

  const DNXCustomUploadAdapterPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your back-end here!
      loader.onUpload = editor.onUpload
      loader.accessToken = editor.accessToken
      return new Update(loader)
    }
  }

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <CButton
              className="add-btn"
              onClick={() => navigate('/templateList')}
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Subject</CFormLabel>
                <CFormInput type="text" id="subject" value={subject} onChange={handleChange} />
                <span className="text-danger">{error && error.subject}</span>
              </div>
              {/* <div className="mb-3">
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
              </div> */}
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Language Code</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="langCode"
                  value={langCode}
                  onChange={handleChange}
                >
                  <option>Language Code</option>
                  <option value={'en'}>en</option>
                </CFormSelect>
                <span className="text-danger">{error && error.langCode}</span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Content</CFormLabel>
                <Editor
                  editorState={Cdata}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleEditorchange}
                />
                {/* <CKEditor
                  activeClass="p10"
                  config={toolbarConfig}
                  content={Cdata}
                  events={{
                    // blur: onBlur,
                    // afterPaste: afterPaste,
                    change: handleEditorchange,
                  }}
                /> */}
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
