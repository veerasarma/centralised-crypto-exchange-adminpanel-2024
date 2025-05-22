import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import {
    CCard,
    CCardBody,
    CRow,
    CFormLabel,
    CCol,
    CForm,
    CCardFooter,
    CButton,
    CFormTextarea,
    CFormInput
} from '@coreui/react'
import PropTypes from 'prop-types'
//import action
import {
    announcement,
} from '../../api/user'
import { toast } from '../../redux/toast/toast.action'

//import config
const initialFormValue = {
    content: '',
    endDateTime: '',
}

const Announcement = () => {
    const [validErr, setValidErr] = useState({});
    const [formValue, setFormValue] = useState(initialFormValue);
    const dispatch = useDispatch();
    let {
        content,
        endDateTime,
    } = formValue

    const handleChange = (e) => {
        let { id, value } = e.target
        setFormValue({ ...formValue, ...{ 'content': value } })
        setValidErr({})
    }
    const handleSubmit = async () => {
        let { success, message, errors } = await announcement(formValue)
        if (success) {
            toast(
                {
                    message: message,
                    type: 'success',
                },
                dispatch,
            )
            setValidErr({})
            setFormValue(initialFormValue)
        }
        if (errors) {
            setValidErr(errors)
        }
    }
    return (
        <CRow>
            <CCol xs={12} sm={12} md={6}>
                <CCard>
                    <CCardBody>
                        <CForm>

                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Content</CFormLabel>
                                <CFormInput onChange={handleChange} value={content}></CFormInput>
                                <span className="text-danger">{validErr && validErr.content}</span>
                            </div>

                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">End Date</CFormLabel>

                                <DatePicker
                                    selected={endDateTime}
                                    onChange={(date) => {
                                        let newDate = new Date(date)
                                        newDate.setMilliseconds(0)
                                        let formData = {
                                            ...formValue,
                                            endDateTime: newDate.getTime(),
                                        }
                                        setFormValue(formData)
                                        setValidErr({})
                                    }}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                                <span className="text-danger">{validErr && validErr.endDate}</span>
                            </div>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CButton className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow >
    )
}
Announcement.propTypes = {
    row: PropTypes.any,
    state: PropTypes.any,
}

export default Announcement
