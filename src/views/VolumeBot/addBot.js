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
import PropTypes from 'prop-types'
//import action
import { volBotFindById, newVolBot, editVolBot, getPairList } from '../../api/spot/pair'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'deactive', label: 'DeActive' },
]

const initialFormValue = {
    'pairId': '',
    'startQuantity': '0',
    'endQuantity': '',
    'startPricePerc': '0',
    'endPricePerc': '0',
    'status': 'active'
}

const AddPair = () => {
    const [pairData, setPairData] = useState([])
    const [formValue, setFormValue] = useState(initialFormValue)
    const [validErr, setValidErr] = useState({})
    const [loader, setLoader] = useState(false)
    const history = useNavigate()
    let { id } = useParams()
    let dispatch = useDispatch()
    const { pairId, startQuantity, endQuantity, status, startPricePerc, endPricePerc } = formValue

    const fetchPairList = async () => {
        let { success, result } = await getPairList()
        if (success) {
            setPairData(result.data)
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, ...{ [name]: value } })
        if (value) {
            let formDataerr = { ...validErr, ...{ [name]: '' } }
            setValidErr(formDataerr)
            setLoader(false)
        }
    }
    const fetchBot = async () => {
        let decryptData = decryptString(id, true)
        let { success, result } = await volBotFindById(decryptData)
        if (success) {
            setFormValue(result.data)
        }
    }
    const handleEdit = async () => {
        let decryptData = decryptString(id, true)
        let data = {
            id: decryptData,
            pairId,
            startQuantity,
            endQuantity,
            endPricePerc,
            startPricePerc,
            status
        }
        setLoader(true)
        let { success, message, errors } = await editVolBot(data)
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
    const handleSubmit = async () => {
        let data = {
            pairId,
            startQuantity,
            endQuantity,
            endPricePerc,
            startPricePerc,
        }
        setLoader(true)
        let { success, message, errors } = await newVolBot(data)
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
            if (message) {
                toast(
                    {
                        message: message,
                        type: 'error',
                    },
                    dispatch,
                )
            }
        }
    }

    useEffect(() => {
        if (id) {
            fetchBot()
        }
        fetchPairList()
    }, [])

    return (
        <CRow>
            <CCol xs={12} sm={12} md={12}>
                <CCard>
                    <CCardHeader>VolumeBot Add/Edit</CCardHeader>
                    <CCardBody>
                        <CForm>
                            <CRow>
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">Select Pair</CFormLabel>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            name="pairId"
                                            value={pairId}
                                            onChange={handleChange}
                                        >
                                            <option>Select Base Currency</option>
                                            {pairData &&
                                                pairData.length > 0 &&
                                                pairData.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item._id}>
                                                            {item.firstCurrencySymbol}/{item.secondCurrencySymbol}
                                                        </option>
                                                    )
                                                })}
                                        </CFormSelect>
                                        <span className="text-danger">{validErr && validErr.pairId}</span>
                                    </div>
                                </CCol>

                                {/* <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Sell Quantity Range Start</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={startQuantity}
                                            name="startQuantity"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.startQuantity}</span>
                                    </div>
                                </CCol> */}

                                {/* <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Sell Quantity Range End</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={endQuantity}
                                            name="endQuantity"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.endQuantity}</span>
                                    </div>
                                </CCol> */}
                                {/* <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Buy Start OrderValue Percentage</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={startPricePerc}
                                            name="startPricePerc"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.startPricePerc}</span>
                                    </div>
                                </CCol> */}
                                {/* <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Buy End OrderValue Percentage</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={endPricePerc}
                                            name="endPricePerc"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.endPricePerc}</span>
                                    </div>
                                </CCol> */}
                                {id && id.length > 0 && (
                                    <CCol xs={12} sm={12} md={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                name={'status'}
                                                value={status}
                                                onChange={handleChange}
                                            >
                                                <option>Status</option>
                                                {statusOptions &&
                                                    statusOptions.length > 0 &&
                                                    statusOptions.map((item, key) => {
                                                        return (
                                                            <option key={key} value={item.value}>
                                                                {item.label}
                                                            </option>
                                                        )
                                                    })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                )}
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
                            <>
                                {id && id.length > 0 ? (
                                    <CButton className="submit-btn"
                                        onClick={handleEdit}
                                    >
                                        Submit
                                    </CButton>
                                ) : (
                                    <CButton className="submit-btn" onClick={handleSubmit}>
                                        Submit
                                    </CButton>
                                )}
                                <button className="btn btn-secondary" onClick={() => history('/volume-bot')}>
                                    {' '}
                                    Go Back
                                </button>
                            </>
                        )}
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
