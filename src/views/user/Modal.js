import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { CButton, CFormInput } from '@coreui/react'
import { toast } from '../../redux/toast/toast.action'
import { useDispatch } from 'react-redux'
import { updateUserAsset } from 'src/api/user'

const RModal = ({ show, onHide, user, type, assetId, UserData }) => {
  const [formValue, setFormValue] = useState({
    userId: user,
    assetId: assetId,
    type: type.toLowerCase(),
    amount: '',
  })
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  console.log(formValue)
  const changeHandler = (e) => {
    setFormValue({ ...formValue, amount: e.target.value })
  }

  const submitHandler = async () => {
    try {
      if (Number(formValue.amount) === 0) {
        return setError('Amount cannot be zero')
      }

      if (formValue.amount < 0) {
        return setError('Amount cannot be negative')
      }
      const reqData = {
        userId: formValue.userId,
        assetId: formValue.assetId,
        amount: formValue.amount,
        type: formValue.type,
      }
      const { success, message } = await updateUserAsset(reqData)
      console.log(success,message,'messagemessage')
      if (success) {
        toast(
          {
            message,
            type: 'success',
          },
          dispatch,
        )
        onHide()
      }
      if (success==false) {
        toast(
          {
            message,
            type: 'error',
          },
          dispatch,
        )
        onHide()
      }
    } catch (error) {
      toast(
        {
          message: 'Error on update',
          type: 'error',
        },
        dispatch,
      )
    }
  }
console.log(user, type,"1111111111112222")
  return (
    <Modal
      contentClassName="bg-opaque text-light"
      centered
      show={show}
      onHide={onHide}
      style={{ background: 'transparent' }}
    >
      <div className="asset-modal">
        <div className="asset-modal-type">
          {type} for User : {UserData && UserData.email ? UserData.email : UserData.phoneNo} <br/> UserId : {UserData && UserData.userId}
        </div>
        <div>
          <CFormInput
            type="number"
            step={0.005}
            onChange={changeHandler}
            value={formValue.amount}
          />
          {error && <span className="text-danger">{error}</span>}
        </div>
        <div className="d-flex justify-content-end">
          <CButton className="attach-btn" variant="ghost" onClick={() => submitHandler()}>
            Update
          </CButton>
        </div>
      </div>
    </Modal>
  )
}

RModal.propTypes = PropTypes.any
export default RModal
