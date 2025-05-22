import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardFooter,
    CFormLabel,
    CFormInput,
    CImage,
    CButton,
    CCol,
    CRow,
    CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { updateBanner } from 'src/api/sitesetting'
//import config
import config from '../../config/index'
const intialFormValue = {
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',
}
let imageType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'pdf', 'PDF']
const SocialMedia = (props) => {
    const { record } = props
    //state
    const [formValue, setFormValue] = useState(intialFormValue)
    const [error, setError] = useState({})
    const [imageShow1, setImageShow1] = useState('')
    const [imageShow2, setImageShow2] = useState('')
    const [imageShow3, setImageShow3] = useState('')
    const [imageShow4, setImageShow4] = useState('')
    const dispatch = useDispatch()
    const history = useNavigate()
    const { imageOne, imageTwo, imageThree, imageFour, } =
        formValue

    //function
    const handleChange = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        let formData = { ...formValue, ...{ [id]: value } }
        setFormValue(formData)
        let formDataerr = { ...error, ...{ [id]: '' } }
        setError(formDataerr)
    }

    const handleFile = (e) => {
        e.preventDefault()
        const { name, files } = e.target
        if (!imageType.includes(files[0].type.split('/')[1])) {
            return toast(
                {
                    message: 'Invalid format',
                    type: 'error',
                },
                dispatch,
            )
        }
        let formData = { ...formValue, ...{ [name]: files[0] } }
        setFormValue(formData)
        if (name == 'imageOne') {
            setImageShow1(URL.createObjectURL(files[0]))
        } else if (name == 'imageTwo') {
            setImageShow2(URL.createObjectURL(files[0]))
        } else if (name == 'imageThree') {
            setImageShow3(URL.createObjectURL(files[0]))
        } else if (name == 'imageFour') {
            setImageShow4(URL.createObjectURL(files[0]))
        }
    }

    const Submit = async (e) => {
        try {
            const formData = new FormData()
            formData.append('imageOne', imageOne)
            formData.append('imageTwo', imageTwo)
            formData.append('imageThree', imageThree)
            formData.append('imageFour', imageFour)
            const { success, errors, message } = await updateBanner(formData)
            if (success) {
                setFormValue(intialFormValue)
                setImageShow1('')
                setImageShow2('')
                setImageShow3('')
                setImageShow4('')
                toast(
                    {
                        message: message,
                        type: 'success',
                    },
                    dispatch,
                )
                setError({})
            } else if (errors) {
                setError(errors)
            }
        } catch (err) {
            console.log(err, 'error')
        }
    }

    // useEffect(() => {
    //     if (record && record !== undefined && record !== '') {
    //         let data = {
    //             imageOne: record.bannerImg1,
    //             imageTwo: record.bannerImg2,
    //             imageThree: record.bannerImg3,
    //             imageFour: record.bannerImg4,
    //         }
    //         setFormValue(data)
    //     }
    // }, [record])
    return (
        <>
            <CCard>
                <CCardBody>
                    <CForm className="row g-3">
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Image 1
                            </CFormLabel>

                            {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
                            <div className="input-group btn-file-group">
                                <span className="input-group-btn">
                                    <label className="btn btn-secondary btn-file">
                                        <div className="input required">
                                            <input type="file" name="imageOne" onChange={handleFile} />
                                        </div>{' '}
                                        <span className="browse-btn">Browse</span>
                                    </label>
                                </span>
                                <span className="file-input-label"></span>
                            </div>
                            <span className="text-danger">{error.imageOne}</span>
                            {imageShow1 && (
                                <CImage className="logoPreview" rounded src={imageShow1} width={80} height={80} />
                            )}
                            {imageOne && !imageOne.name && (
                                <CImage
                                    className="logoPreview"
                                    rounded
                                    src={config.API_URL + '/settings/' + imageOne}
                                />
                            )}
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Image 2
                            </CFormLabel>

                            {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
                            <div className="input-group btn-file-group">
                                <span className="input-group-btn">
                                    <label className="btn btn-secondary btn-file">
                                        <div className="input required">
                                            <input type="file" name="imageTwo" onChange={handleFile} />
                                        </div>{' '}
                                        <span className="browse-btn">Browse</span>
                                    </label>
                                </span>
                                <span className="file-input-label"></span>
                            </div>
                            <span className="text-danger">{error.imageTwo}</span>
                            {imageShow2 && (
                                <CImage className="logoPreview" rounded src={imageShow2} width={80} height={80} />
                            )}
                            {imageTwo && !imageTwo.name && (
                                <CImage
                                    className="logoPreview"
                                    rounded
                                    src={config.API_URL + '/settings/' + imageTwo}
                                />
                            )}
                        </CCol>




                        <CCol md={6}>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Image 3
                            </CFormLabel>

                            {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
                            <div className="input-group btn-file-group">
                                <span className="input-group-btn">
                                    <label className="btn btn-secondary btn-file">
                                        <div className="input required">
                                            <input type="file" name="imageThree" onChange={handleFile} />
                                        </div>{' '}
                                        <span className="browse-btn">Browse</span>
                                    </label>
                                </span>
                                <span className="file-input-label"></span>
                            </div>
                            <span className="text-danger">{error.imageThree}</span>
                            {imageShow3 && (
                                <CImage className="logoPreview" rounded src={imageShow3} width={80} height={80} />
                            )}
                            {imageThree && !imageThree.name && (
                                <CImage
                                    className="logoPreview"
                                    rounded
                                    src={config.API_URL + '/settings/' + imageThree}
                                />
                            )}
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Image 4
                            </CFormLabel>

                            {/* <CFormInput type="file" id="emailLogo" onChange={handleFile} /> */}
                            <div className="input-group btn-file-group">
                                <span className="input-group-btn">
                                    <label className="btn btn-secondary btn-file">
                                        <div className="input required">
                                            <input type="file" name="imageFour" onChange={handleFile} />
                                        </div>{' '}
                                        <span className="browse-btn">Browse</span>
                                    </label>
                                </span>
                                <span className="file-input-label"></span>
                            </div>
                            <span className="text-danger">{error.imageFour}</span>
                            {imageShow4 && (
                                <CImage className="logoPreview" rounded src={imageShow4} width={80} height={80} />
                            )}
                            {imageFour && !imageFour.name && (
                                <CImage
                                    className="logoPreview"
                                    rounded
                                    src={config.API_URL + '/settings/' + imageFour}
                                />
                            )}
                        </CCol>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <CButton className="btn btn-primary m-0 mt-3" onClick={Submit}>
                        Submit
                    </CButton>
                </CCardFooter>
            </CCard>
        </>
    )
}

SocialMedia.propTypes = {
    record: PropTypes.any,
}

export default SocialMedia
