import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CNav, CCard, CNavItem, CNavLink, CTabContent, CTabPane, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { cilArrowLeft, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import component
import Crypto from './Crypto'
import Token from './Token'
import Fiat from './Fiat'

const CoinAdd = () => {
  // State
  const [activeKey, setActiveKey] = useState(1)
  const navigate = useNavigate()
  return (
    <>
      <CNav variant="tabs" role="tablist" className="tabContentMain">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
          <CButton
            className="add-btn"
            onClick={() => navigate('/coin-list')}
            style={{ 'margin-right': '10px' }}
          >
            <CIcon icon={cilArrowLeft}></CIcon> Back
          </CButton>
        </div>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Crypto
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Token
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Fiat
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <Crypto />
        </CTabPane>

        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <Token />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
          <Fiat />
        </CTabPane>
      </CTabContent>
    </>
  )
}

CoinAdd.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinAdd
