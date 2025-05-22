



import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardFooter,
  CFormLabel,
  CButton,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
// import CKEditor from 'react-ckeditor-component'
import { toast } from '../../redux/toast/toast.action'
//import api
import { getUsersEmail, sendNewsLetter } from '../../api/common'
import { useDispatch } from 'react-redux'

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../template.css"
import draftToHtml from 'draftjs-to-html';

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
  const history = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [Cdata, setContent] = useState('')
  const [emailOptions, setEmailOptions] = useState([])
  const [selectEmail, setselectEmail] = useState([])
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

  const fetchUsersEmail = async () => {
    try {
      const { status, result } = await getUsersEmail();
      console.log(status, result, "statusesultsuccessresult")
      let arrayEmail = []
      if (status) {
        result.map((item, i) => {
          const label = item.email
          const value = item.email
          const obj = { label: label, value: value }
          arrayEmail.push(obj)
        })
      }
      setEmailOptions(arrayEmail)
    } catch (err) {
      console.log(err, 'error')
    }
  }
  const handleEditorchange = (editorState) => {
    // var newContent = editorState.editor.getData()
    // setContent(newContent)
    setContent(editorState);
  }

  const selectEmailChange = (data) => {
    setselectEmail(data)
  }
  const handleSubmmit = async (e) => {
    try {
      let data = {
        message: draftToHtml(convertToRaw(Cdata.getCurrentContent())),
        selectEmail: selectEmail,
      }
      const { success, message, errors } = await sendNewsLetter(data)
      if (success) {
        setError({})
        setselectEmail([])
        setContent('')
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
      } else {
        if (errors) {
          setError(errors)
        } else {
          toast(
            {
              message: message,
              type: 'error',
            },
            dispatch,
          )
        }
      }
    } catch (err) {
      console.log('....err', err)
    }
  }
  useEffect(() => {
    fetchUsersEmail()
  }, [])

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Subject</CFormLabel>
                <MultiSelect
                  className="react-multi-select-dropdown"
                  options={emailOptions}
                  value={selectEmail}
                  onChange={selectEmailChange}
                  labelledBy="Select"
                />{' '}
                <span className="text-danger">{error && error.selectEmail}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Message Content</CFormLabel>
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
                    change: handleEditorchange,
                  }}
                /> */}
                <span className="text-danger">{error && error.content}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={handleSubmmit}>
              Submit
            </CButton>
          </CCardFooter>{' '}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Update