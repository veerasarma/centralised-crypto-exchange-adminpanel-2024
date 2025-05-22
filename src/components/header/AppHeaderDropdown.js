import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilAccountLogout,
  cilSettings,
  cilTask,
  cilUser,
  cilLockUnlocked,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/userImage.png'

//import localStorage
import { setAuthToken } from '../../lib/localStorage'

//import action
import { logout } from '../../redux/auth/auth.action'

//import lib
import { toast } from '../../redux/toast/toast.action'

const AppHeaderDropdown = () => {
  let { role } = useSelector((state) => state.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //function
  const logoutUser = (e) => {
    e.preventDefault()

    localStorage.removeItem('admin_token')
    logout({}, dispatch)
    navigate('/login')
    toast(
      {
        message: 'logout successfully',
        type: 'success',
      },
      dispatch,
    )
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light bg-light1 fw-semibold py-2">Settings</CDropdownHeader>
        <Link to={'/profile'}>
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Profile Settings
          </CDropdownItem>
        </Link>
        <Link to={'/2fa-settings'}>
          <CDropdownItem>
            <CIcon icon={cilLockUnlocked} className="me-2" />
            2FA Settings
          </CDropdownItem>
        </Link>
        <Link to={'/loginHistory'}>
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Login History
          </CDropdownItem>
        </Link>
        {
          role == 'superadmin' &&
          <Link to={'/subAdmin-loginHistory'}>
            <CDropdownItem>
              <CIcon icon={cilUser} className="me-2" />
              SubAdmin Login History
            </CDropdownItem>
          </Link>
        }
        <Link to={'/changePassword'}>
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Change Password
          </CDropdownItem>
        </Link>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          <i className="cil-key"></i> Site Settings
        </CDropdownItem> */}

        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Logout
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logoutUser}>
          <a>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </a>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
