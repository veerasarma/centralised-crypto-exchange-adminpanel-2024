import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CRow,
  CCol,
  CFormInput,
  CButton,
  CButtonGroup,
  CInputGroupText,
  CInputGroup,
  CLink,
  CCard,
  CCardBody,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCursor } from '@coreui/icons'
import socketClient from 'socket.io-client'
// import config
import config from '../../config'
import PropTypes from 'prop-types'
//lib
import { momentFormat } from '../../lib/date'
import isEmpty from '../../lib/isEmpty'
//api
import { getDispute, disputeResolve, adminConversation } from '../../api/p2p/pair'
import { TimeAgo } from '@n1ru4l/react-time-ago'
import { useParams } from 'react-router-dom'
import { decryptString } from 'src/lib/cryptoJS'
//import action
import { toast } from '../../redux/toast/toast.action'
const initialFormValue = {
  message: '',
  attachment: '',
}
const P2pTradeview = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [chat, setChat] = useState([])
  const [formValue, setFormValue] = useState(initialFormValue)
  const chatsEndRef = React.createRef()
  const socket = socketClient(config.P2P_SERVICE.URL)
  const params = useParams()
  // console.log(params, 'params')
  let { message, attachment } = formValue
  const decryptData = decryptString(params.id, true)
  const fetchDispute = async () => {
    let decryptData = decryptString(params.id, true)
    let { success, result } = await getDispute(decryptData)
    if (success) {
      console.log(result, '---re')
      setData(result.detail)
      setChat(result.chat)
    }
  }
  const handleResolve = async (side) => {
    if (window.confirm('Are you sure?')) {
      try {
        let reqData = {
          orderId: data.orderId,
          side,
        }
        const { status, result, message } = await disputeResolve(reqData)
        if (status == 'success') {
          toast(
            {
              message: message,
              type: 'success',
            },
            dispatch,
          )
          fetchDispute()
          setData(result.detail)
          setChat(result.chat)
        } else {
          if (message)
            toast(
              {
                message: message,
                type: 'success',
              },
              dispatch,
            )
          console.log('else')
        }
      } catch (err) { }
    }
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormValue({ ...formValue, ...{ [name]: value } })
  }
  const handleFile = (e) => {
    e.preventDefault()
    const { name, files } = e.target
    setFormValue({ ...formValue, [name]: files[0] })
  }
  const scrollToBottom = () => {
    chatsEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let reqData = {
        orderId: data._id,
        message: formValue.message,
        attachment: formValue.attachment,
      }

      const formData = new FormData()
      formData.append('orderId', reqData.orderId)
      formData.append('message', reqData.message)
      formData.append('attachment', reqData.attachment)

      const { status, message, result, } = await adminConversation(formData)
      if (status == 'success') {
        toast(
          {
            message: message,
            type: 'success',
          },
          dispatch,
        )
        setFormValue(initialFormValue)
        setChat(result.chat)
        scrollToBottom()
      } else {
        if (message)
          toast(
            {
              message: message,
              type: 'success',
            },
            dispatch,
          )
      }
    } catch (err) { }
  }
  useEffect(() => {
    fetchDispute()
  }, [params.id])
  useEffect(() => {
    if (!isEmpty(data)) {

      socket.on(`p2pAdminChat-${data._id}`, (chatData) => {
        setChat(function (prevState) {
          let newChat = [...prevState.chat, ...chatData.chat]
          return {
            newChat,
          }
        })
      })
      socket.on(`p2pAdminChat-${data._id}`, (chatData) => {

      })
      socket.on("disconnect", (reason) => {
        console.log("reasonreasonreasonreasonreason", reason);
      });
      scrollToBottom()
    }

  }, [data])
  return (
    <CRow className="mb-12">

      <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Post By</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.sellUniqueId}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Trade By</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.buyUniqueId}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Post Type</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.side}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Currency Pair</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.firstCoin + '/' + data.secondCoin}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Pay Amount</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.payValue + data.secondCoin}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1"> Receive Amount</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.receiveValue + data.firstCoin}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Order Id</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.orderId}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Created At</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={momentFormat(data.createdAt)}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Disputed At</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={momentFormat(data.disputeDate)}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol sm={6}>
                <CInputGroupText id="basic-addon1">Disputed Status</CInputGroupText>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={data.disputeStatus}
                  className="dispute_detail"
                />
              </CCol>
            </CInputGroup>
          </CCardBody>
          <CCardFooter>
            {data.disputeStatus == 'open' && (
              <CRow>
                <CButtonGroup role="group" aria-label="Basic example" className="dispute_detail">

                  <CCol sm={6}>
                    <CButton color="primary" onClick={() => handleResolve('buy')}>
                      Resolve to Buyer
                    </CButton>
                  </CCol>
                  <CCol sm={6}>
                    <CButton color="primary" onClick={() => handleResolve('sell')}>
                      Resolve to Seller
                    </CButton>
                  </CCol>

                </CButtonGroup>
              </CRow>

            )}
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol sm={6}>
        <CCard>
          <CCardBody>

            <div className="chat_message_section ">
              <div class="container bootstrap snippets bootdeys">
                <div class="panel" id="chat">
                  <div class="panel-heading">
                    <h3 class="panel-title">
                      <i class="icon wb-chat-text" aria-hidden="true"></i> Chat
                    </h3>
                  </div>
                  <div class="panel-body">
                    <div class="chats">
                      {
                        chat &&
                        chat.length > 0 &&
                        chat.map((item, i) => {
                          return (
                            <>
                              {
                                item.admin &&
                                <div class="chat">
                                  <div class="chat-avatar">
                                    <a class="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="right" title="" data-original-title="June Lane">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." />
                                      <i></i>
                                    </a>
                                  </div>
                                  <div class="chat-body">

                                    <div class="chat-content">
                                      <b>Admin</b>
                                      <br />
                                      {!isEmpty(item.attachment) ? (
                                        <CLink target={'_blank'} href={config.P2P_SERVICE.URL + '/p2p/' + item.attachment}>
                                          <CButton color="primary" variant="outline" size="sm">
                                            <CIcon icon={cilCursor}></CIcon>
                                          </CButton>
                                        </CLink>
                                      ) : <pre>{item.message}</pre>
                                      }
                                      <time class="chat-time" datetime="2015-07-01T11:37">{momentFormat(item.createdAt)}</time>
                                    </div>

                                  </div>


                                </div>

                              }
                              {
                                !item.admin && item.senderId == data.buyUserId &&
                                <div class="chat chat-left">
                                  <div class="chat-avatar">
                                    <a class="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="left" title="" data-original-title="Edward Fletcher">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="..." />
                                      <i></i>
                                    </a>
                                  </div>
                                  <div class="chat-body">
                                    <div class="chat-content">
                                      <b>Sent By Buyer</b>
                                      <br />
                                      <pre>{item.message}</pre>
                                      <time class="chat-time" datetime="2015-07-01T11:39">{momentFormat(item.createdAt)}</time>
                                    </div>
                                    {!isEmpty(item.attachment) && (
                                      <CLink target={'_blank'} href={config.P2P_SERVICE.URL + '/p2p/' + item.attachment}>
                                        <CButton color="info" variant="outline" size="sm">
                                          <CIcon icon={cilCursor}></CIcon>
                                        </CButton>
                                      </CLink>
                                    )}
                                  </div>
                                </div>
                              }
                              {
                                !item.admin && item.senderId == data.sellUserId &&
                                <div class="chat chat-left">
                                  <div class="chat-avatar">
                                    <a class="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="left" title="" data-original-title="Edward Fletcher">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." />
                                      <i></i>
                                    </a>
                                  </div>
                                  <div class="chat-body">
                                    <div class="chat-content">
                                      <b>Sent By Seller</b>
                                      <br />
                                      <pre>{item.message}</pre>
                                      <time class="chat-time" datetime="2015-07-01T11:39">{momentFormat(item.createdAt)}</time>
                                    </div>
                                    {!isEmpty(item.attachment) && (
                                      <CLink target={'_blank'} href={config.P2P_SERVICE.URL + '/p2p/' + item.attachment}>
                                        <CButton color="info" variant="outline" size="sm">
                                          <CIcon icon={cilCursor}></CIcon>
                                        </CButton>
                                      </CLink>
                                    )}
                                  </div>
                                </div>
                              }
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div ref={chatsEndRef} />
              </div>

            </div>

          </CCardBody>
          <CCardFooter>

            {
              data.status === 'dispute' && (
                <CRow>
                  <CCol sm={12}>
                    <CRow>
                      <CCol sm={9}>
                        <CFormInput
                          aria-label="Username"
                          name="message"
                          aria-describedby="basic-addon1"
                          value={formValue.message}
                          onChange={handleChange}
                          className="dispute_detail"
                        />
                      </CCol>
                      <CCol sm={3}>
                        <CButton color="secondary" size="sm" onClick={handleSubmit}>
                          <CIcon icon={cilCursor}></CIcon>
                        </CButton>
                      </CCol>
                      <CCol sm={9}>
                        <CFormInput
                          type="file"
                          id="image"
                          name="attachment"
                          onChange={handleFile}
                          className="dispute_detail"
                        />
                      </CCol>
                      <CCol sm={3}>
                        <CButton color="secondary" size="sm" onClick={handleSubmit}>
                          <CIcon icon={cilCursor}></CIcon>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              )
            }
          </CCardFooter>
        </CCard>
      </CCol>

    </CRow >
  )
}
P2pTradeview.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}
export default P2pTradeview
