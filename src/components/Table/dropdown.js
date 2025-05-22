import React from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

let options = [
  { label: 'PDF', value: 'pdf' },
  { label: 'XLS', value: 'xls' },
  { label: 'CSV', value: 'csv' },
]

const DropDown = ({ docType, handleDoc }) => {
  const handleChange = (value) => {
    docType(value)
  }
  const handleClick = () => {
    handleDoc()
  }
  return (
    <CDropdown variant="btn-group download-btn">
      <CButton color="secondary" size="sm" onClick={handleClick}>
        Download
      </CButton>
      <CDropdownToggle color="secondary" split />
      <CDropdownMenu>
        {options.map((item, i) => (
          <CDropdownItem key={i} value={item.value} onClick={() => handleChange(item.value)}>
            {item.label}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  )
}

DropDown.propTypes = {
  docType: PropTypes.func,
  handleDoc: PropTypes.func,
}

export default DropDown
