import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CForm,
  CCardFooter,
  CButton,
  CSpinner,
  CFormInput,
  CLink,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import { cilImage, cilCopy } from "@coreui/icons";
import PropTypes from "prop-types";
//import action
import {
  depositId,
  approveFiatDeposit,
  rejectFiatDeposit,
} from "../../api/Transfer/transfer";
//import lib
import { decryptString } from "src/lib/cryptoJS";
import { toast } from "../../redux/toast/toast.action";
import { capitalize } from "../../lib/string";
let initialValue = {
  amount: "",
  image: "",
  status: "",
  txid: "",
  paymentType: "",
  fromAddress: "",
  toAddress: "",
  coin: "",
  tokenType: "",
};

const FiatDeposit = () => {
  const [formValue, setFormValue] = useState(initialValue);
  const [loader, setLoader] = useState(false);
  const [validErr, setValidErr] = useState({});
  const [Amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const history = useNavigate();
  let { id } = useParams();
  let dispatch = useDispatch();
  let {
    amount,
    image,
    status,
    txid,
    paymentType,
    fromAddress,
    toAddress,
    coin,
    tokenType,
  } = formValue;

  const fetchPair = async () => {
    let decryptData = decryptString(id, true);
    let { success, result } = await depositId(decryptData);
    if (success) {
      let data = {
        amount: result.amount,
        image: result.image,
        status: result.status,
        txid: result.txid,
        paymentType: result.paymentType,
        fromAddress: result.fromAddress,
        toAddress: result.toAddress,
        coin: result.coin,
        tokenType: result?.currencyId?.tokenType,
      };
      setFormValue(data);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAmount(value);
    if (value) {
      setValidErr({});
    }
  };
  const handleReasonChange = (e) => {
    let { name, value } = e.target;
    setReason(value);
    if (value) {
      setValidErr({});
    }
  };
  const fiatApprove = async () => {
    let decryptData = decryptString(id, true);
    setLoader(true);
    let reqData = {
      transactionId: decryptData,
      amount: Amount,
    };
    let { success, message, errors } = await approveFiatDeposit(reqData);
    setLoader(false);
    if (success) {
      toast(
        {
          message: message,
          type: "success",
        },
        dispatch
      );
      history("/deposit-list");
    } else {
      if (errors) {
        setValidErr(errors);
        setLoader(false);
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

  const fiatReject = async () => {
    let decryptData = decryptString(id, true);
    setLoader(true);
    let reqData = {
      decryptData,
      reason,
    };
    let { success, message, errors } = await rejectFiatDeposit(reqData);
    setLoader(false);
    if (success) {
      setLoader(false);
      toast(
        {
          message: message,
          type: "success",
        },
        dispatch
      );
      history("/deposit-list");
    } else {
      if (errors) {
        setValidErr(errors);
        setLoader(false);
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
  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast(
      {
        message: "Copied",
        type: "success",
      },
      dispatch
    );
  };

  function formatHexString(hexString, startLen = 8, endLen = 8) {
    if (hexString.length <= startLen + endLen) {
      return hexString;
    }
    return hexString.substring(0, startLen) + '....' + hexString.substring(hexString.length - endLen);
  }

  useEffect(() => {
    if (id) {
      fetchPair();
    }
  }, []);
  return (
    <CRow>
      <CCol xs={12} sm={12} md={8}>
        <CCard>
          <CCardBody>
            {coin && coin && (
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Currency
                  </CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    {coin}
                  </CFormLabel>
                </CCol>
              </CRow>
            )}
            <br />
            {tokenType && tokenType && (
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Token Type
                  </CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    {tokenType.toUpperCase()}
                  </CFormLabel>
                </CCol>
              </CRow>
            )}
            <br />
            <CForm>
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Deposit Amount
                  </CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    {amount}
                  </CFormLabel>
                </CCol>
              </CRow>
              <br />
              {txid && txid && (
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Transaction ID
                    </CFormLabel>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      {/* {txid.slice(0, 5)}...{" "} */}
                      {formatHexString(txid)}
                      <CIcon
                        icon={cilCopy}
                        onClick={() => copyToClipboard(txid)}
                      ></CIcon>{" "}
                    </CFormLabel>
                  </CCol>
                </CRow>
              )}
              <br />
              {toAddress && toAddress && (
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      To address
                    </CFormLabel>
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      {toAddress}
                    </CFormLabel>
                  </CCol>
                </CRow>
              )}
              <br />

              {image && image && (
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Document
                    </CFormLabel>
                  </CCol>
                  <CCol xs>
                    <CLink target={"_blank"} href={image}>
                      <CButton color="info" variant="outline" size="sm">
                        <CIcon icon={cilImage}></CIcon>
                      </CButton>
                    </CLink>
                  </CCol>
                </CRow>
              )}
              <br />
              {status === "pending" && (
                <>
                  <CRow className="g-3">
                    <CCol xs>
                      <CFormLabel htmlFor="exampleFormControlTextarea1">
                        Amount
                      </CFormLabel>
                    </CCol>
                    <CCol xs>
                      <CFormInput
                        type="number"
                        id="exampleFormControlInput1"
                        aria-describedby="exampleFormControlInputHelpInline"
                        onChange={handleChange}
                      />
                      <span className="text-danger">
                        {validErr && validErr.amount}
                      </span>
                    </CCol>
                  </CRow>
                  <br />
                </>
              )}
              {status === "pending" && paymentType === "fiat_deposit" && (
                <CRow className="g-3">
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Reason
                    </CFormLabel>
                  </CCol>
                  <CCol xs>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      aria-describedby="exampleFormControlInputHelpInline"
                      onChange={handleReasonChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.reason}
                    </span>
                  </CCol>
                </CRow>
              )}
              <br />
              <CRow className="g-3">
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Status
                  </CFormLabel>
                </CCol>
                <CCol xs>
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    {capitalize(status)}
                  </CFormLabel>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          {status === "pending" ? (
            <CCardFooter>
              {loader ? (
                <CButton
                  color="success"
                  variant="outline"
                  disabled
                  style={{ float: "right" }}
                >
                  <CSpinner
                    component="span"
                    size="sm"
                    variant="grow"
                    aria-hidden="true"
                  />
                  Loading...
                </CButton>
              ) : (
                <>
                  <div style={{ float: "right" }}>
                    <CButton
                      color="success"
                      variant="outline"
                      onClick={fiatApprove}
                    >
                      Accept
                    </CButton>
                    &nbsp; &nbsp;
                  </div>{" "}
                  <div style={{ float: "right" }}>
                    <CButton
                      color="danger"
                      variant="outline"
                      onClick={fiatReject}
                    >
                      Reject
                    </CButton>
                    &nbsp; &nbsp;
                  </div>
                </>
              )}
            </CCardFooter>
          ) : null}
        </CCard>
      </CCol>
    </CRow>
  );
};
FiatDeposit.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default FiatDeposit;
