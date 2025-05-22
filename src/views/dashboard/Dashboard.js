import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilCopy,
  cilUser,
  cilUserFemale,
  cilArrowThickToBottom,
  cilDollar,
  cilContact,
  cilArrowThickFromBottom,
  cilUserFollow,
  cilChartLine,
  cilTag,
} from '@coreui/icons'

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

//  import lib
import { momentFormat } from '../../lib/date'

//import action
import {
  getDashChart,
  getUserData,
  getAdminBal,
  getNotification,
  getWalletNotify,
  getTradeNotify,
} from '../../api/Dashboard/dashboard'
import { toast } from '../../redux/toast/toast.action'
const Dashboard = () => {
  const dispatch = useDispatch()

  //state
  const [dashPrice, setPrice] = useState([])
  const [dashLabel, setLabel] = useState([])
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [adminBal, setAdminBal] = useState([])
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState('Year')
  const [notify, setNotify] = useState({})
  const [walletNotify, setWalletNotify] = useState({})
  const [tradeNotify, setTradeNotify] = useState({})

  useEffect(() => {
    let filter = {
      filter: 'Year',
    }
    fetchChart(filter)
    fetchUserData()
    fetchAdminBal()
    fetchWalletNotify()
    fetchNotification()
    fetchTradeNotify()
  }, [])

  // function
  const fetchChart = async (filter) => {
    const { status, result } = await getDashChart(filter)
    if (status) {
      let dashData = [],
        dashAmount = []
      result &&
        result.length > 0 &&
        result.map((data) => {
          dashData.push(data._id)
          dashAmount.push(data.fee)
        })
      setLabel(dashData)
      setPrice(dashAmount)
      setData(result)
    }
  }
  const fetchAdminBal = async () => {
    const { status, result } = await getAdminBal()
    if (status) {
      setAdminBal(result)
    }
  }
  const fetchUserData = async () => {
    const { status, result } = await getUserData()
    if (status) {
      setUserData(result)
    }
  }

  const fetchNotification = async () => {
    try {
      const { status, result } = await getNotification()
      if (status) {
        setNotify(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWalletNotify = async () => {
    try {
      const { status, result } = await getWalletNotify()
      console.log(result)
      if (status) {
        setWalletNotify(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTradeNotify = async () => {
    try {
      const { status, result } = await getTradeNotify()
      console.log(result)
      if (status) {
        setTradeNotify(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (mode) => {
    setMode(mode)
    let filter = {
      filter: mode,
    }
    fetchChart(filter)
  }
  const Copied = () => {
    toast({ type: 'success', message: 'Copied Successfully' }, dispatch)
  }
  const handlePDF = async () => {
    try {
      let resultArr = []
      data &&
        data.length > 0 &&
        data.map((item) => {
          resultArr.push([item._id, item.fee])
        })
      const unit = 'pt'
      const size = 'A4' // Use A1, A2, A3 or A4
      const orientation = 'landscape' // portrait or landscape

      const marginLeft = 40
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(13)

      const title = 'Chart History'
      const headers = [['coin', 'Volume']]

      let content = {
        startY: 50,
        head: headers,
        body: resultArr,
      }

      doc.text(title, marginLeft, 40)
      doc.autoTable(content)
      doc.save('chart.pdf')
    } catch (err) { }
  }
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <CRow>
        {/* <CCol md={6}>
          <div className="newCard">
            <CRow>
              <CCol sm={6}>
                <CCardHeader className="px-0">Admin Profit Chart</CCardHeader>
              </CCol>
              <CCol sm={6} className="d-none d-md-block">
                <CButton color="primary" className="float-end my-0">
                  <CIcon onClick={() => handlePDF()} icon={cilCloudDownload} />
                </CButton>
                <CButtonGroup className="float-end me-3">
                  {['Day', 'Month', 'Year'].map((value) => (
                    <CButton
                      color="outline-secondary"
                      onClick={() => handleChange(value)}
                      key={value}
                      className="mx-0 my-0"
                      active={value === mode}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
              <CCol sm={12}>
                <CChart
                  type="bar"
                  data={{
                    labels: dashLabel,
                    datasets: [
                      {
                        label: 'Admin Profit',
                        backgroundColor: '#f2ca49',
                        data: dashPrice,
                        barPercentage: 0.3,
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCol>
            </CRow>
          </div>
        </CCol> */}
        <CCol md={6}>
          <WidgetsDropdown />
        </CCol>
        <CCol md={6}>
          <div className="newCard">
            <CCardHeader className="px-0">Admin Notification</CCardHeader>
            <ul className="dashNotify">
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilContact} className="me-2" />
                </a>
                <a href="#">
                  <span>KYC Verification</span> Need to approve {notify.kyc} Users
                </a>
              </li>
              {/* <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilDollar} className="me-2" />
                </a>
                <a href="#">
                  <span>Fee Collected</span> Last 24 hours ${notify.fees} USD
                </a>
              </li> */}
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilArrowThickToBottom} className="me-2" />
                </a>
                <a href="#">
                  <span>Total Deposit</span> Last 24 hours ${walletNotify.deposit} USD
                </a>
              </li>
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilArrowThickFromBottom} className="me-2" />
                </a>
                <a href="#">
                  <span>Total Withdraw</span> Last 24 hours ${walletNotify.withdraw} USD
                </a>
              </li>
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilUserFollow} className="me-2" />
                </a>
                <a href="#">
                  <span>New Registration</span> {notify.register} completed today
                </a>
              </li>
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilChartLine} className="me-2" />
                </a>
                <a href="#">
                  <span>Trade Completed</span> Last 24 hours {tradeNotify.trade} trade completed
                </a>
              </li>
              <li>
                <a href="#" className="dashNotifyIcon">
                  {' '}
                  <CIcon icon={cilTag} className="me-2" />
                </a>
                <a href="#">
                  <span>Pending Tickets</span> Need to close {notify.ticket} pending tickets
                </a>
              </li>
            </ul>
          </div>
        </CCol>
      </CRow>

      {/* <CRow>
        <CCol md={9}>
          <CCard className="mb-4">
            <CCardHeader>Admin Balance List</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Coin</CTableHeaderCell>
                    <CTableHeaderCell>Balance</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {adminBal &&
                    adminBal.length > 0 &&
                    adminBal.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>{item.coin}</CTableDataCell>
                        <CTableDataCell>{item.bal}</CTableDataCell>
                        <CTableDataCell>
                          {item.address}
                          {''}{' '}
                          <CopyToClipboard text={item.address} onCopy={() => setCopied(true)}>
                            <CIcon onClick={() => Copied()} icon={cilCopy} />
                          </CopyToClipboard>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        
        </CCol>
        <CCol md={3}>
          <div className="newCard"></div>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
