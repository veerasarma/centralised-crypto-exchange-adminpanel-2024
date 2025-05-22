import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CNav, CCard, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

//import api
import { getSiteSetting } from 'src/api/sitesetting'

// import component
import SocialMedia from './SocialMedia'
import MarketTrend from './MarketTrend'
import Dashboard from './UserDashboard'
import MailIntegration from './MailIntegration'
import Banners from './Banners'
const Settings = () => {
  // State
  const [activeKey, setActiveKey] = useState(1)
  const [data, setdata] = useState()

  const fetchSetting = async () => {
    try {
      const { success, result } = await getSiteSetting()
      if (success) {
        setdata(result)
      } else {
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  useEffect(() => {
    fetchSetting()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Social Media
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Banner Images
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Market Trend
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 3}
              onClick={() => setActiveKey(3)}
            >
              User Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 4}
              onClick={() => setActiveKey(4)}
            >
              Mail Integration
            </CNavLink>
          </CNavItem> */}
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
            <SocialMedia record={data && data} />
          </CTabPane>

          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
            <Banners record={data && data} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
            <Dashboard record={data && data} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 4}>
            <MailIntegration record={data && data} />
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  )
}

Settings.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default Settings
