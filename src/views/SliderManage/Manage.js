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
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
//import api
import { DeleteSliderManage, GetSliderManage, UpdateSliderManage } from 'src/api/sitesetting'
//import config
import config from '../../config/index'
const intialFormValue = {
  sliderImage: '',
}

const SocialMedia = (/* props */) => {
  // const { record } = props

  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [imageShow, setImageShow] = useState('')
  const [sliderShow, setSliderShow] = useState([])
  const dispatch = useDispatch()
  const history = useNavigate()
  const { sliderImage } =
    formValue

  const handleFile = (e) => {
    e.preventDefault()
    const { name, files } = e.target
    console.log(name, files, 'filess588')
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
    setImageShow(URL.createObjectURL(files[0]))
  }

  const Submit = async (e) => {
    try {
      console.log(sliderImage, "sliderImagesliderImagesliderImagesliderImage")

      const formData = new FormData()
      formData.append('sliderImage', sliderImage)

      const { success, errors, message } = await UpdateSliderManage(formData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        setImageShow('')
        fetchSlider()
      } else if (errors) {
        setError(errors)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchSlider = async () => {
    try {
      const { success, result } = await GetSliderManage()
      console.log(success, result, "succes1111111111111111111")
      if (success) {
        setSliderShow(result)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const handleDelete = async (data) => {
    try {
      if (window.confirm('Are you sure?'))
      console.log(data, "datadatadatadata")

      const { success, errors, message } = await DeleteSliderManage(data)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setError({})
        fetchSlider()
      } else if (errors) {
        setError(errors)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    fetchSlider()
  }, [])

  return (
    <>
      <CCol /* xs={6} sm={6} md={6} */>
        <CCard>
          <CCardBody>
            <CForm>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Slider Image(JPG, JPEG, PNG)
                </CFormLabel>

                <div className="input-group btn-file-group">
                  <span className="input-group-btn">
                    <label className="btn btn-secondary btn-file">
                      <div className="input required">
                        <input type="file" name="sliderImage" onChange={handleFile} />
                      </div>{' '}
                      <span className="browse-btn">Browse</span>
                    </label>
                  </span>
                  <span className="file-input-label"></span>
                </div>
                <span className="text-danger">{error.sliderImage}</span>
                {imageShow && (
                  <CImage className="logoPreview" rounded src={imageShow} width={80} height={80} />
                )}
              </CCol>

            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>
        </CCard>
        <br />
      </CCol>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            {/* {imageShow && (
              <CImage className="logoPreview" rounded src={imageShow} width={80} height={80} />
            )} */}
            {sliderShow && sliderShow.length > 0 && sliderShow.map((item, key) => {
              console.log(item,"eeeeeeeddddd")
              return (
                <>
                  <CImage
                    className="logoPreview"
                    rounded
                    src={config.USER_SERVICE.URL + '/images/slider/' + item.image}
                    width={80} height={80}
                  />       
                  <CButton className="submit-btn" onClick={()=>handleDelete(item)}>
                    <CIcon icon={cilTrash} size="xs" />
                  </CButton>

                </>
              )
            })}
          </CCardBody>

        </CCard>
      </CCol>
    </>
  )
}

SocialMedia.propTypes = {
  record: PropTypes.any,
}

export default SocialMedia
