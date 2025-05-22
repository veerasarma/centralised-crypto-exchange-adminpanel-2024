import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CForm,
  CCardFooter,
  CButton,
  CInputGroupText,
  CInputGroup,
  CSpinner,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilLowVision, cilText } from "@coreui/icons";

//import api
import { changePassword } from "../../api/user";

//import action
import { toast } from "../../redux/toast/toast.action";
import { logout } from "../../redux/auth/auth.action";

const initialFormValue = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const initialPassValue = {
  old: false,
  new: false,
  confirm: false,
};

const ProfileDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  //state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validErr, setValidErr] = useState({});
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(initialPassValue);
  const { oldPassword, newPassword, confirmPassword } = formValue;

  //function
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } });
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: "" } };
      setValidErr(formDataerr);
    }
  };
  const handleSubmit = async () => {
    setLoader(true);
    let data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    let { success, message, errors } = await changePassword(data);
    if (success) {
      setLoader(false);
      setValidErr({});
      toast(
        {
          message: message,
          type: "success",
        },
        dispatch
      );
      //history('/dashboard')
      localStorage.removeItem("admin_token");
      logout({}, dispatch);
      history("/login");
    } else {
      if (errors) {
        setLoader(false);
        setValidErr(errors);
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    }
  };
  const handleShowPass = (val) => {
    if (val == "old") {
      setShowPass({
        ...initialPassValue,
        ...{ old: showPass.old == false ? true : false },
      });
    } else if (val == "new") {
      setShowPass({
        ...showPass,
        ...{ new: showPass.new == false ? true : false },
      });
    } else if (val == "confirm") {
      setShowPass({
        ...showPass,
        ...{ confirm: showPass.confirm == false ? true : false },
      });
    }
  };
  return (
    <CRow>
      <CCol xs={12} sm={12} md={6}>
        <CCard>
          <CCardBody>
            <CForm className="form1">
              <div className="mb-3 ">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Old Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} style={{ color: "white" }}  />
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.old ? "text" : "password"}
                    name="oldPassword"
                    value={oldPassword}
                    placeholder="Old Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {/* <CIcon icon={cilLowVision} onClick={() => handleShowPass('old')} /> */}
                    {showPass.old ? (
                      <CIcon
                        icon={cilText} style={{ color: "white" }} 
                        onClick={() => handleShowPass("old")}
                      />
                    ) : (
                      <CIcon
                        icon={cilLowVision} style={{ color: "white" }} 
                        onClick={() => handleShowPass("old")}
                      />
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.oldPassword}
                </span>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter New Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked}  style={{ color: "white" }}  />
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.new ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {/* <CIcon icon={cilLowVision} onClick={() => handleShowPass('new')} /> */}
                    {showPass.new ? (
                      <CIcon
                        icon={cilText} style={{ color: "white" }} 
                        onClick={() => handleShowPass("new")}
                      />
                    ) : (
                      <CIcon
                        icon={cilLowVision} style={{ color: "white" }} 
                        onClick={() => handleShowPass("new")}
                      />
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.newPassword}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Enter Confirm Password
                </CFormLabel>
                <CInputGroup className="mb-3 align_ment bddr">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} style={{ color: "white" }}  />
                  </CInputGroupText>
                  <CFormInput
                    type={showPass.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <CInputGroupText>
                    {/* <CIcon icon={cilLowVision} onClick={() => handleShowPass('confirm')} /> */}
                    {showPass.confirm ? (
                      <CIcon
                        icon={cilText} style={{ color: "white" }} 
                        onClick={() => handleShowPass("confirm")}
                      />
                    ) : (
                      <CIcon
                        icon={cilLowVision} style={{ color: "white" }} 
                        onClick={() => handleShowPass("confirm")}
                      />
                    )}
                  </CInputGroupText>
                </CInputGroup>
                <span className="text-danger">
                  {validErr && validErr.confirmPassword}
                </span>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader && (
              <CButton disabled>
                <CSpinner
                  component="span"
                  size="sm"
                  variant="grow"
                  aria-hidden="true"
                />
                Loading...
              </CButton>
            )}
            {!loader && (
              <CButton className="submit-btn" onClick={handleSubmit}>
                Change Password
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProfileDetails;
