import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormTextarea,
  CForm,
  CCardFooter,
  CButton,
  CSpinner,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilCursor } from '@coreui/icons'
//import action
import { findById, replyContact } from '../../api/contactUs'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'

let initialValue = {
  name: '',
  email: '',
  message: '',
  reply: '',
}

const UserReply = () => {
  const [formValue, setFormValue] = useState(initialValue)
  const [validErr, setValidErr] = useState({})
  const [loader, setLoader] = useState(false)
  const history = useNavigate()
  let { id } = useParams()
  let dispatch = useDispatch()
  let { name, email, message, reply } = formValue

  const fetchPair = async () => {
    let decryptData = decryptString(id, true)
    let { success, result } = await findById(decryptData)
    if (success) {
      setFormValue(result)
    }
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
    if (value) {
      setValidErr({})
    }
  }
  const handleSubmit = async () => {
    let decryptData = decryptString(id, true)

    let data = {
      _id: decryptData,
      reply,
    }
    setLoader(true)
    let { success, message, errors } = await replyContact(data)
    if (success) {
      setLoader(false)
      toast(
        {
          message: message,
          type: 'success',
        },
        dispatch,
      )
      history('/contact-us')
    } else {
      if (errors) {
        setLoader(false)
        setValidErr(errors)
      }
    }
  }
  useEffect(() => {
    if (id) {
      fetchPair()
    }
  }, [])
  return (
    <CRow>
      <CCol xs={12} sm={12} md={8}>
        <CCard>
          <CCardBody>
            <CForm>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Name</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{name}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Email</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{email}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">User Message</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">{message}</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Admin Reply</CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormTextarea
                    aria-label="With textarea"
                    name="reply"
                    value={reply}
                    onChange={handleChange}
                  ></CFormTextarea>
                  <span className="text-danger">{validErr && validErr.reply}</span>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader ? (
              <CButton className="submit-btn" disabled>
                <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                Loading...
              </CButton>
            ) : (
              <CButton className="submit-btn" onClick={handleSubmit}>
                <CIcon icon={cilCursor}></CIcon>
                Send
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
UserReply.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default UserReply
