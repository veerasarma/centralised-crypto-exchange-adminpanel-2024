import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CNav, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { cilArrowLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import component
import Crypto from './Crypto'


const CoinAdd = () => {
  // State
  const navigate = useNavigate()
  return (
    <>
      <CNav variant="tabs" role="tablist" className="tabContentMain">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
          <CButton
            className="add-btn"
            onClick={() => navigate('/new-list')}
            style={{ 'margin-right': '10px' }}
          >
            <CIcon icon={cilArrowLeft}></CIcon> Back
          </CButton>
        </div>
      </CNav>
      <Crypto />
    </>
  )
}

CoinAdd.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default CoinAdd
