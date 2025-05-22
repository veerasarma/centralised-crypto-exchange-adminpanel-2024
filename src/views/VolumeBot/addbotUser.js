import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    CCard,
    CCardBody,
    CRow,
    CFormLabel,
    CCol,
    CFormInput,
    CFormSelect,
    CForm,
    CCardFooter,
    CButton,
    CSpinner,
    CCardHeader,
} from '@coreui/react'
import Select from 'react-select'
import PropTypes from 'prop-types'
//import action
import { botFindById, addBotUser, editBot, getBotUser } from '../../api/spot/pair'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'



const initialFormValue = {
    'firstName': '',
    'lastName': '',
    'email': '',
}

const AddPair = () => {
    const [formValue, setFormValue] = useState(initialFormValue)
    const [validErr, setValidErr] = useState({})
    const [loader, setLoader] = useState(false)
    const history = useNavigate()
    let { id } = useParams()
    let dispatch = useDispatch()
    const { firstName, lastName, email } = formValue

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, ...{ [name]: value } })
        if (value) {
            let formDataerr = { ...validErr, ...{ [name]: '' } }
            setValidErr(formDataerr)
            setLoader(false)
        }
    }

    const fetchBotUser = async () => {
        let { success, result } = await getBotUser({ id: 'volume_bot' })
        if (success) {
            setFormValue(result)
        }
    }
    const handleSubmit = async () => {
        let data = {
            firstName,
            lastName,
            email,
            'type': 'volume_bot'
        }
        setLoader(true)
        let { success, message, errors } = await addBotUser(data)
        if (success) {
            setLoader(false)
            toast(
                {
                    message: message,
                    type: 'success',
                },
                dispatch,
            )
            history('/volume-bot')
        } else {
            setLoader(false)
            if (errors) {
                setValidErr(errors)
            }
        }
    }

    useEffect(() => {
        fetchBotUser()
    }, [])

    return (
        <CRow>
            <CCol xs={12} sm={12} md={12}>
                <CCard>
                    <CCardHeader>Bot User</CCardHeader>
                    <CCardBody>
                        <CForm>
                            <CRow>

                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">First Name</CFormLabel>
                                        <CFormInput
                                            type="test"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={firstName}
                                            name="firstName"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.firstName}</span>
                                    </div>
                                </CCol>
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Last Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.lastName}</span>
                                    </div>
                                </CCol>
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Email</CFormLabel>
                                        <CFormInput
                                            type="email"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.email}</span>
                                    </div>
                                </CCol>

                            </CRow>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        {/* {loader ? (
                            <CButton className="submit-btn" disabled>
                                <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                                Loading...
                            </CButton>
                        ) : (
                            <>
                                {id && id.length > 0 ? (
                                    <CButton className="submit-btn"
                                        onClick={handleEdit}
                                    >
                                        Submit
                                    </CButton>
                                ) : ( */}
                        <CButton className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </CButton>
                        {/* )} */}
                        <button className="btn btn-secondary" onClick={() => history('/trade-bot')}>
                            {' '}
                            Go Back
                        </button>
                        {/* </>
                        )} */}
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}
AddPair.propTypes = {
    row: PropTypes.any,
    state: PropTypes.any,
}

export default AddPair
