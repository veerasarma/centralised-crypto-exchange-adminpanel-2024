import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CNav, CCard, CNavItem, CNavLink, CTabContent, CTabPane, CCardText } from '@coreui/react'
import { decryptString } from '../../lib/cryptoJS'

// import component
import OrderHistory from './orderHisrory'
import TradeHistory from './tradeHistory'
import { useParams } from 'react-router-dom'
import MainPane from './MainPane'
import { IncCntObjId } from 'src/lib/generalFun'

const CoinAdd = () => {
  // State
  const [activeKey, setActiveKey] = useState('orderhistory')
  const params = useParams()
  return (
    <>
      <CCard className="pane-param">
        <CCardText>User ID: {IncCntObjId(decryptString(params.userid, true))}</CCardText>
      </CCard>
      <CNav variant="tabs" role="tablist" className="tabContentMain">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'orderhistory'}
            onClick={() => setActiveKey('orderhistory')}
          >
            Order History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'tradehistory'}
            onClick={() => setActiveKey('tradehistory')}
          >
            Trade History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'deposithistory'}
            onClick={() => setActiveKey('deposithistory')}
          >
            Deposit History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'withdrawhistory'}
            onClick={() => setActiveKey('withdrawhistory')}
          >
            Withdraw History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'passbookhistory'}
            onClick={() => setActiveKey('passbookhistory')}
          >
            Passbook History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 'adminprofit'}
            onClick={() => setActiveKey('adminprofit')}
          >
            Profit History
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
          <MainPane current={activeKey} />
        </CTabPane>
        {/* <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <OrderHistory />
        </CTabPane>

        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <TradeHistory />
        </CTabPane> */}
      </CTabContent>
    </>
  )
}

CoinAdd.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinAdd
