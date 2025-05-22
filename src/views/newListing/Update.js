import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CCard, CTabContent, CTabPane, CNav, CNavLink, CNavItem, CButton } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { cilArrowLeft, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import Component
import Crypto from './Crypto'

// import Action
import { getSingleList } from '../../api/Coin/coin'

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
    const { status, result } = await getSingleList(decryptData)
    if (status) {
      setData(result)
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
        </CNav>
        <Crypto record={data && data} />
      </CCard>
    </>
  )
}

CoinUpdate.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinUpdate
