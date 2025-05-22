import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CCard, CTabContent, CTabPane, CNav, CNavLink, CNavItem, CButton } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { cilArrowLeft, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import Component
import Crypto from './Crypto'
import Token from './Token'
import Fiat from './Fiat'

// import Action
import { getSingleCurrency } from '../../api/Coin/coin'

//import lib
import { decryptString } from 'src/lib/cryptoJS'
const CoinUpdate = () => {
  const params = useParams()
  const navigate = useNavigate()
  // State
  const [activeKey, setActiveKey] = useState(1)
  const [data, setData] = useState({})

  useEffect(() => {
    fetchCurrency()
  }, [params])

  // function
  const fetchCurrency = async () => {
    let decryptData = decryptString(params.id, true)
    const { status, result } = await getSingleCurrency(decryptData)
    if (status) {
      setData(result)
      let activeKey
      if (result.type === 'crypto') {
        activeKey = 1
      }
      if (result.type === 'token') {
        activeKey = 2
      }
      if (result.type === 'fiat') {
        activeKey = 3
      }
      setActiveKey(activeKey)
    }
  }
  return (
    <>
      <CCard className="mb-4">
        <CNav variant="tabs" role="tablist">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <CButton
              className="add-btn"
              onClick={() => navigate('/coin-list')}
              style={{ 'margin-right': '10px' }}
            >
              <CIcon icon={cilArrowLeft}></CIcon> Back
            </CButton>
          </div>
          <CNavItem>{activeKey === 1 && <CNavLink>Crypto</CNavLink>}</CNavItem>
          <CNavItem>
            <CNavItem>{activeKey === 2 && <CNavLink>Token</CNavLink>}</CNavItem>
          </CNavItem>
          <CNavItem>
            <CNavItem>{activeKey === 3 && <CNavLink>Fiat</CNavLink>}</CNavItem>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
            <Crypto record={data && data} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
            <Token record={data && data} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
            <Fiat record={data && data} />
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  )
}

CoinUpdate.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinUpdate
