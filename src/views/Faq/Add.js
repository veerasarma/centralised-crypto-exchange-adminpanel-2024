import React, { useEffect, useState } from 'react'
import {
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CButton,
  CCardFooter,
} from '@coreui/react'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//import api
import { getFaqCategory, AddFaq } from '../../api/faqCategory'

const intialFormValue = {
  categoryId: '',
  question: '',
  answer: '',
  status: '',
}

const Add = () => {
  //state
  const [formValue, setFormValue] = useState(intialFormValue)
  const [error, setError] = useState({})
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const history = useNavigate()

  const { categoryId, question, answer, status } = formValue

  //function
  const handleChange = (e) => {
    e.preventDefault()
    let { id, value } = e.target
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    if (value) {
      let formDataerr = { ...error, ...{ [id]: '' } }
      setError(formDataerr)
    }
  }

  const Submit = async (e) => {
    try {
      let reqData = {
        categoryId,
        question,
        answer,
        status,
      }
      const { success, error, message } = await AddFaq(reqData)
      if (success) {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setFormValue(intialFormValue)
        setError({})
        history('/faqlist')
      } else {
        // console.log(error, 'error')
        setError(error)
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchCategoryDropDown = async () => {
    try {
      const { success, result } = await getFaqCategory()
      if (success) {
        setData(result)
      }
    } catch (err) { }
  }

  useEffect(() => {
    fetchCategoryDropDown()
  }, [])

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Category Name</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="categoryId"
                  value={categoryId}
                  onChange={handleChange}
                >
                  <option value={""}> Select Category</option>
                  {data &&
                    data.length > 0 &&
                    data.map((item, key) => {
                      return (
                        <option key={key} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                </CFormSelect>
                <span className="text-danger">{error && error.categoryId}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Question</CFormLabel>
                <CFormTextarea
                  id="question"
                  value={question}
                  onChange={handleChange}
                  rows="3"

                // text="Must be 8-20 words long."
                ></CFormTextarea>
                <span className="text-danger">{error && error.question}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Answer</CFormLabel>
                <CFormTextarea
                  id="answer"
                  value={answer}
                  onChange={handleChange}
                  rows="3"

                // text="Must be 8-20 words long."
                ></CFormTextarea>
                <span className="text-danger">{error && error.answer}</span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  id="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option>Select status</option>
                  <option value={'active'}>Active</option>
                  <option value={'deactive'}>Deactive</option>
                </CFormSelect>
                <span className="text-danger">{error && error.status}</span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={Submit}>
              Submit
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Add
