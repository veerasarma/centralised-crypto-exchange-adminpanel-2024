import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

//import action
import {
  getDashboard,
  getDashChart,
  getDepositChart,
  getTicketChart,
  getUserChart,
  getWithdrawChart,
} from '../../api/Dashboard/dashboard'

const WidgetsDropdown = () => {
  const Navigate = useNavigate()

  //state
  const [data, setData] = useState({})
  const [dashDet, setDash] = useState([])
  const [dashLabel, setLabel] = useState([])

  const [userLabel, setUserLabel] = useState([])
  const [userData, setUserData] = useState([])

  const [depositLabel, setDepositLabel] = useState([])
  const [depositData, setDepositData] = useState([])

  const [withdrawLabel, setWithdrawLabel] = useState([])
  const [withdrawData, setWithdrawData] = useState([])

  const [ticketLabel, setTicketLabel] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [ticketmax, setTicketmax] = useState([])

  useEffect(() => {
    fetchData()
    fetchChart()
  }, [])

  // function
  const fetchData = async () => {
    const { status, result } = await getDashboard()
    if (status) {
      setData(result)
    }
  }

  const fetchChart = async () => {
    const { status, result } = await getDashChart()
    if (status) {
      let dashData = []
      result &&
        result.length > 0 &&
        result.map((data) => {
          dashData.push(data.userId)
        })
      setLabel(dashData)
      setDash(result)
    }
  }

  const fetchUserChart = async () => {
    const { success, result } = await getUserChart()
    if (success) {
      setUserLabel(result.label)
      setUserData(result.data)
    }
  }
  const fetchDepositChart = async () => {
    const { success, result } = await getDepositChart()
    if (success) {
      setDepositLabel(result.label)
      setDepositData(result.data)
    }
  }
  const fetchWithdrawChart = async () => {
    const { success, result } = await getWithdrawChart()
    if (success) {
      setWithdrawLabel(result.label)
      setWithdrawData(result.data)
    }
  }
  const fetchTicketChart = async () => {
    const { success, result } = await getTicketChart()
    if (success) {
      setTicketLabel(result.label)
      setTicketData(result.data)

      var max = Math.max(...result.data)
      // console.log(max, 'pppppppppppppp')
      setTicketmax(max)
    }
  }

  useEffect(() => {
    fetchUserChart()
    fetchDepositChart()
    fetchWithdrawChart()
    fetchTicketChart()
  }, [])

  return (
    <CRow>
      <CCol sm={12} lg={12}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={data && data.user}
          title="Total User"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => Navigate('/userList')}>User List</CDropdownItem>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: userLabel,
                // userLabel.length > 0
                //   ? userLabel
                //   : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

                datasets: [
                  {
                    label: 'Users',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: "#eab486",
                    data: userData, //? userData : [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    max: 100,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={12} lg={12}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={data && data.deposit}
          title="Today Deposit"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => Navigate('/deposit-list')}>
                  Deposit List
                </CDropdownItem>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: depositLabel, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Deposits',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: "#eab486",
                    data: depositData, //[1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    max: 100,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={12} lg={12}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={data && data.withdraw}
          title="Today Withdraw"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => Navigate('/withdraw-list')}>
                  Withdraw List
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: withdrawLabel, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Withdrawals',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: withdrawData, //[78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    min: 0,
                    max: 100,
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={12} lg={12}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={data && data.ticket}
          title="Today Ticket"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => Navigate('/support')}>Ticket List</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ticketLabel /* [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],*/,
                datasets: [
                  {
                    label: 'Tickets',
                    backgroundColor: '#eab486',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: ticketData, //[78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.2,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    max: 30,
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
