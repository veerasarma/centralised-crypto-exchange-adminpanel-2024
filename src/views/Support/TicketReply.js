import React, { useEffect, useRef, useState } from 'react'
import {
  CFormTextarea,
  CButton,
  CForm,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CCardFooter,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//import config
import config from '../../config'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
import isEmpty from 'src/lib/isEmpty'
import { momentFormat } from 'src/lib/date'
import { toastAlert } from 'src/lib/toastAlert'

//import api
import { CloseTicket, getMessage, replymsg } from '../../api/support'
import { toast } from 'src/redux/toast/toast.action'
import { useDispatch } from 'react-redux'

const initialFormValue = {
  reply: '',
  "image": "",
}
let imageType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'pdf', 'PDF']

const Reply = () => {

  // state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [data, setData] = useState()
  const [error, setError] = useState({})
  const { reply, image } = formValue
  const [userName, setUserName] = useState('')
  const [subloader, setSubLoader] = useState(false)
  const [closeloader, setCloseLoader] = useState(false)


  //hooks
  const history = useNavigate()
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const params = useParams()

  //function
  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
    if (value) {
      setError({})
    }
  }

  const handleFileInput = (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    if (!imageType.includes(e.target.files[0].type.split('/')[1])) {
      return toast(
        {
          message: 'Image can only be in JPEG / PNG /Jpg /PDF formats',
          type: 'error',
        },
        dispatch,
      )
    }
    if (file.size >= 1000000) {
      return toast(
        {
          message: "Upload image cannot more then 1MB!",
          type: 'error',
        },
        dispatch,
      )
    }
    setFormValue({ ...formValue, image: file })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let reqData = {
        ticketId: data.records._id,
        receiverId: data.records.userId,
        message: reply,
      }
      setSubLoader(true)
      const formData = new FormData();
      formData.append("ticketId", data.records._id);
      formData.append("receiverId", data.records.userId);
      formData.append("message", reply);
      formData.append("image", image);
      const { success, error, message, result } = await replymsg(formData)
      console.log(message, "messagemessage")
      if (success) {
        setSubLoader(false)

        history('/support')
        fetchTicktMessage()
        toast(
          {
            message: 'Message replied successfully',
            type: 'success',
          },
          dispatch,
        )
        setFormValue({ formValue: initialFormValue, msgConversation: result.reply })
        setError({})
      } else {
        setSubLoader(false)
        if (error) {
          setError(error)
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
      console.log(err, 'error')
    }
  }


  const handleClose = async (e) => {
    e.preventDefault()
    try {
      setCloseLoader(true)
      let reqData = {
        id: data.records._id,
      }
      const { success, message, error, result } = await CloseTicket(reqData)
      // console.log(success, 'success')
      if (success) {
        setCloseLoader(false)
        history('/support')
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
      } else {
        setCloseLoader(false)
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  const fetchTicktMessage = async () => {
    try {
      let decryptData = decryptString(params.id, true)
      const { success, result } = await getMessage(decryptData)
      // console.log(result, 'result')
      if (success) {
        setUserName(result.userName)
        setData({ records: result, msgConversation: result.reply })
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }



  useEffect(() => {
    fetchTicktMessage()
  }, [])

  // console.log(data,'-------data')

  return (
    <CCard>
      <CCardHeader>Support Ticket </CCardHeader>
      {/* Chat Box*/}
      <CCardBody>
        <CForm>
          <div className="px-4 py-5 chat-box">
            {!isEmpty(data) &&
              data.msgConversation &&
              data.msgConversation.length > 0 &&
              data.msgConversation.map((item, key) => {
                if (item.senderId == data?.records?.adminId) {
                  return (
                    <div className="media w-50 ml-auto mb-3" key={key}>
                      <div className="media-body">
                        <p className='text-white'> Admin</p>
                        <div className="bg-primary rounded py-2 px-3 mb-2">
                          <p className="text-small mb-0 text-white">{item.message}</p>
                          {item && item.image && (
                            <p className="text-small mb-0">
                              <a
                                href={config.API_URL + '/images/support/' + item.image}
                                target="_blank"
                              >
                                {item.image} View file
                              </a>
                            </p>
                          )}
                        </div>
                        <p className="small  text-white">
                          {' '}
                          {momentFormat(item.createdAt, 'DD-MM-YYYY  hh:mm A')}
                        </p>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="media w-50 mb-3" key={key}>
                      <img
                        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                      <div className="media-body ml-3">
                        <p className='text-white'>{userName}</p>
                        <div className="bg-dark rounded py-2 px-3 mb-2">
                          <p className="text-small text-white mb-0">{item.message}</p>
                          {item && item.image && (
                            <p className="text-small mb-0">
                              <a
                                href={config.API_URL + '/images/support/' + item.image}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.image} View file
                              </a>
                            </p>
                          )}
                        </div>
                        <p className="small  text-white">
                          {momentFormat(item.createdAt, 'DD-MM-YYYY  hh:mm A')}
                        </p>
                      </div>
                    </div>
                  )
                }
              })}
          </div>

          {/* Typing area */}

          {
            data && data.records && data.records.status == 'open' &&
            <CForm>
              <div className="mb-6">
                <CFormTextarea
                  className="form-control mb-3"
                  name="reply"
                  value={reply}
                  onChange={handleChange}
                  rows="3"
                ></CFormTextarea>
                <span className="text-danger">{error && error.message}</span>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="text-danger">{error && error.image}</span>

                    <input
                      type={'file'}
                      name={'image'}
                      onChange={handleFileInput}
                      // className={'hidden-filer'}
                      accept="image/jpeg,image/png"
                    />
                    <div className="reply-preview"> <span className="text-warning">
                      Note: MAX 1MB (only .jpeg, .png, .jpg, .pdf)
                    </span>
                    </div>

                    {image &&
                      <CButton
                        className="attach-btn ms-0"
                        onClick={() => setFormValue({ ...formValue, ... { ["image"]: '' } })}
                      >
                        Remove Attachment
                      </CButton>
                    }

                    <div className="reply-preview">
                      {image && <img width={'100%'} src={URL.createObjectURL(image)} alt="preview" />}
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {subloader && (
                      <CButton disabled>
                        <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                        Loading...
                      </CButton>
                    )}
                    {!subloader && (
                      <CButton color="info" onClick={handleSubmit} size="sm">
                        <CIcon icon={cilSend}></CIcon>
                      </CButton>
                    )}
                    {closeloader && (
                      <CButton disabled>
                        <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                        Loading...
                      </CButton>
                    )}
                    {!closeloader && (
                      <CButton color="success" onClick={handleClose} size="sm">
                        Close Ticket
                      </CButton>
                    )}
                    <CButton color="primary" onClick={() => history('/support')}>
                      {' '}
                      Go Back
                    </CButton>
                  </div>
                </div>
              </div>
            </CForm>
          }
        </CForm>
      </CCardBody>
      {data && data.records && data.records.status != 'open' &&
        <CCardFooter>
          <CButton color="primary" onClick={() => history('/support')}>
            {' '}
            Go Back
          </CButton>
        </CCardFooter>
      }
    </CCard>
  )
}

export default Reply
