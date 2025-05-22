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
import { botFindById, newBot, editBot, getPairList } from '../../api/spot/pair'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import { toast } from '../../redux/toast/toast.action'
import isEmpty from 'src/lib/isEmpty'
let TypeOption = [
    {
        label: 'Buy',
        value: 'buy',
    },
    {
        label: 'Sell',
        value: 'sell',
    },
]
const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'deactive', label: 'DeActive' },
]
const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? 'null' : null,
        }
    },
}
const initialFormValue = {
    'pairId': '',
    'side': [],
    'buyStartPricePerc': '0',
    'buyEndPricePerc': '0',
    'sellStartPricePerc': '0',
    'sellEndPricePerc': '0',
    'startQuantity': '0',
    'endQuantity': '',
    'count': '',
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
    const { pairId, side, buyStartPricePerc, buyEndPricePerc, sellStartPricePerc, sellEndPricePerc, startQuantity, endQuantity, count, status } = formValue

    const fetchPairList = async () => {
        let { success, result } = await getPairList()
        if (success) {
            setPairData(result.data)
        }
    }
    const handleSelect = (selectedOption) => {
        if (selectedOption?.value) {
            setFormValue({
                ...formValue,
                side: [selectedOption.value]
            })

        } else {
            setFormValue({ ...formValue, side: '' })
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
        let { success, result } = await botFindById(decryptData)
        if (success) {
            setFormValue(result.data)
        }
    }
    const handleEdit = async () => {
        let decryptData = decryptString(id, true)
        let data = {
            id: decryptData,
            pairId,
            side,
            buyStartPricePerc,
            buyEndPricePerc,
            sellStartPricePerc,
            sellEndPricePerc,
            startQuantity,
            endQuantity,
            count,
            status
        }
        setLoader(true)
        let { success, message, errors } = await editBot(data)
        if (success) {
            setLoader(false)
            toast(
                {
                    message: message,
                    type: 'success',
                },
                dispatch,
            )
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
    const handleSubmit = async () => {
        let data = {
            pairId,
            side,
            buyStartPricePerc,
            buyEndPricePerc,
            sellStartPricePerc,
            sellEndPricePerc,
            startQuantity,
            endQuantity,
            count
        }
        setLoader(true)
        let { success, message, errors } = await newBot(data)
        if (success) {
            setLoader(false)
            toast(
                {
                    message: message,
                    type: 'success',
                },
                dispatch,
            )
            history('/trade-bot')
        } else {
            setLoader(false)
            if (errors) {
                setValidErr(errors)
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
                    <CCardHeader>TradeBot Add/Edit</CCardHeader>
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
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">Type</CFormLabel> &nbsp;&nbsp;
                                        <Select
                                            styles={colourStyles}
                                            value={
                                                TypeOption && TypeOption.length > 0
                                                    ? TypeOption.filter((el) => {
                                                        if (!isEmpty(side) && side.includes(el.value)) {
                                                            return el
                                                        }
                                                    })
                                                    : []
                                            }
                                            // isMulti
                                            name="colors"
                                            options={TypeOption}
                                            onChange={handleSelect}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                        <span className="text-danger">{validErr && validErr.side}</span>
                                    </div>
                                </CCol>
                                {
                                    side.includes('buy') &&
                                    <>
                                        <CCol xs={12} sm={12} md={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                                    Buy Start Price (%)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    size="sm"
                                                    aria-label="Quote Currency Decimal"
                                                    value={buyStartPricePerc}
                                                    name="buyStartPricePerc"
                                                    onChange={handleChange}
                                                />
                                                <span className="text-danger">{validErr && validErr.buyStartPricePerc}</span>
                                            </div>
                                        </CCol>
                                        <CCol xs={12} sm={12} md={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                                    Buy End Price (%)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    size="sm"
                                                    aria-label="Quote Currency Decimal"
                                                    value={buyEndPricePerc}
                                                    name="buyEndPricePerc"
                                                    onChange={handleChange}
                                                />
                                                <span className="text-danger">{validErr && validErr.buyEndPricePerc}</span>
                                            </div>
                                        </CCol>
                                    </>

                                }
                                {
                                    side.includes('sell') &&
                                    <>
                                        <CCol xs={12} sm={12} md={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                                    Sell Start Price (%)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    size="sm"
                                                    aria-label="Quote Currency Decimal"
                                                    value={sellStartPricePerc}
                                                    name="sellStartPricePerc"
                                                    onChange={handleChange}
                                                />
                                                <span className="text-danger">{validErr && validErr.sellStartPricePerc}</span>
                                            </div>
                                        </CCol>
                                        <CCol xs={12} sm={12} md={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlTextarea1">
                                                    Sell End Price (%)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    size="sm"
                                                    aria-label="Quote Currency Decimal"
                                                    value={sellEndPricePerc}
                                                    name="sellEndPricePerc"
                                                    onChange={handleChange}
                                                />
                                                <span className="text-danger">{validErr && validErr.sellEndPricePerc}</span>
                                            </div>
                                        </CCol>
                                    </>
                                }
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Quantity Range Start</CFormLabel>
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
                                </CCol>
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Quantity Range End</CFormLabel>
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
                                </CCol>
                                <CCol xs={12} sm={12} md={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlTextarea1">Order Count</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            size="sm"
                                            aria-label="sm input example"
                                            value={count}
                                            name="count"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{validErr && validErr.count}</span>
                                    </div>
                                </CCol>
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
                                <button className="btn btn-secondary" onClick={() => history('/trade-bot')}>
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
