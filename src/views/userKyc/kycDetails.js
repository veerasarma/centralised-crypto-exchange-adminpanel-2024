import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CNav,
  CCard,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CHeader,
  CButton,
  CCol,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilPencil } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
// import component
import ProfileForm from './profileForm'
import IdProoofForm from './idProoofForm'
import AddressProofForm from './addressProofForm'

//import api
import { getUserKycDetails } from '../../api/user'

//import lib
import { decryptString } from '../../lib/cryptoJS'

const KycDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  // State
  const [activeKey, setActiveKey] = useState(1)
  const [record, setRecord] = useState({})

  const fetchUserKycDetails = async () => {
    try {
      let decryptData = decryptString(params.id, true)
      let data = {
        id: decryptData,
      }
      const { success, result } = await getUserKycDetails(data)
      if (success) {
        setRecord(result)
      }
    } catch (err) { }
  }
  useEffect(() => {
    fetchUserKycDetails()
  }, [params])
  return (
    <>
      <CCard className="mb-4">
        {/* <CNavLink href="/userKycList" style={{ color: 'blue' }}>
            Go Back
          </CNavLink> */}
        <CCol lg={4}>
          <CButton className="margin_right" onClick={() => navigate('/userKycList')}>
            {' '}
            Go Back
          </CButton>
        </CCol>

        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Profile
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Id Proof
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              active={activeKey === 3}
              onClick={() => setActiveKey(3)}
            >
              Address Proof
            </CNavLink>
          </CNavItem> */}
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
            <ProfileForm record={record && record} fetchUserKycDetails={fetchUserKycDetails} />
          </CTabPane>

          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
            <IdProoofForm record={record && record} fetchUserKycDetails={fetchUserKycDetails} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
            <AddressProofForm record={record && record} fetchUserKycDetails={fetchUserKycDetails} />
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  )
}

KycDetails.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
}

export default KycDetails
