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
  CSpinner,
  CCardHeader,
} from "@coreui/react";
import PropTypes from "prop-types";
//import action
import { getCurrency, addPair, editPair, findById } from "../../api/spot/pair";

//import lib
import { decryptString } from "src/lib/cryptoJS";
import { toast } from "../../redux/toast/toast.action";
import { isEmpty } from "src/lib/validate";
const initialFormValue = {
  firstCurrencyId: " ",
  firstFloatDigit: "",
  secondCurrencyId: " ",
  secondFloatDigit: "",
  minPricePercentage: "",
  maxPricePercentage: "",
  minQuantity: "",
  maxQuantity: "",
  minOrderValue: "",
  maxOrderValue: "",
  maker_rebate: "",
  taker_fees: "",
  markupPercentage: "",
  markPrice: "",
  botstatus: "off",
  marketPercent: "",
  sellDailyLimit: "",
  status: "active", //active ,deactive
};
const bot = [
  { value: "binance", label: "Binance" },
  // { value: 'wazirx', label: 'Wazirx' },``
];
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "deactive", label: "DeActive" },
];
const AddPair = () => {
  const [currency, setCurrency] = useState([]);
  const [validErr, setValidErr] = useState({});
  const [loader, setLoader] = useState(false);
  const [formValue, setFormValue] = useState(initialFormValue);
  const history = useNavigate();
  let { id } = useParams();
  let dispatch = useDispatch();
  let {
    firstCurrencyId,
    firstFloatDigit,
    secondCurrencyId,
    secondFloatDigit,
    minPricePercentage,
    maxPricePercentage,
    minQuantity,
    maxQuantity,
    minOrderValue,
    maxOrderValue,
    maker_rebate,
    taker_fees,
    markupPercentage,
    markPrice,
    botstatus,
    status,
    marketPercent,
    sellDailyLimit,
  } = formValue;
  const fetchCurrency = async () => {
    let { success, result } = await getCurrency();
    if (success) {
      // setCurrency(result)
      var currencyArr = []; //filter same value push into as  one value
      result.filter(function (item) {
        var i = currencyArr.findIndex((x) => x.coin == item.coin);
        if (i <= -1) {
          currencyArr.push(item);
        }
        return null;
      });
      setCurrency(currencyArr);
    }
  };
  const fetchPair = async () => {
    let decryptData = decryptString(id, true);
    let { success, result } = await findById(decryptData);
    if (success) {
      console.log(result, "resultresultresult");
      setFormValue(result);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } });
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: "" } };
      setValidErr(formDataerr);
      setLoader(false);
    }
  };
  const handleSubmit = async () => {
    let data = {
      firstCurrencyId,
      firstFloatDigit,
      secondCurrencyId,
      secondFloatDigit,
      minPricePercentage,
      maxPricePercentage,
      minQuantity,
      maxQuantity,
      minOrderValue,
      maxOrderValue,
      maker_rebate,
      taker_fees,
      markupPercentage,
      markPrice,
      botstatus,
      marketPercent,
      sellDailyLimit,
    };
    setLoader(true);
    let { success, message, errors } = await addPair(data);
    if (success) {
      setLoader(false);
      toast(
        {
          message: message,
          type: "success",
        },
        dispatch
      );
      history("/spot-pair");
    } else {
      if (errors) {
        setLoader(false);
        setValidErr(errors);
      }
    }
  };
  const handleEdit = async () => {
    let decryptData = decryptString(id, true);
    let data = {
      pairId: decryptData,
      firstCurrencyId,
      firstFloatDigit,
      secondCurrencyId,
      secondFloatDigit,
      minPricePercentage,
      maxPricePercentage,
      minQuantity,
      maxQuantity,
      minOrderValue,
      maxOrderValue,
      maker_rebate,
      taker_fees,
      markupPercentage,
      markPrice,
      botstatus,
      status,
      marketPercent,
      sellDailyLimit,
    };
    setLoader(true);
    let { success, message, errors } = await editPair(data);
    if (success) {
      setLoader(false);
      toast(
        {
          message: message,
          type: "success",
        },
        dispatch
      );
      history("/spot-pair");
    } else {
      if (errors) {
        setLoader(false);
        setValidErr(errors);
      }
      if (message) {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    if (id) {
      fetchPair();
    }
    fetchCurrency();
  }, []);
  return (
    <CRow>
      <CCol xs={12} sm={12} md={12}>
        <CCard>
          <CCardHeader>Spot Add/Edit Pair</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Base Currency
                    </CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="firstCurrencyId"
                      value={firstCurrencyId}
                      onChange={handleChange}
                    >
                      <option>Select Base Currency</option>
                      {currency &&
                        currency.length > 0 &&
                        currency.map((item, key) => {
                          return (
                            <option key={key} value={item._id}>
                              {item.coin}
                            </option>
                          );
                        })}
                    </CFormSelect>
                    <span className="text-danger">
                      {validErr && validErr.firstCurrencyId}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Base Currency Decimal
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      name="firstFloatDigit"
                      value={firstFloatDigit}
                      onChange={handleChange}
                      disabled={!isEmpty(id)}
                    />
                    <span className="text-danger">
                      {validErr && validErr.firstFloatDigit}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Quote Currency
                    </CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name={"secondCurrencyId"}
                      value={secondCurrencyId}
                      onChange={handleChange}
                    >
                      <option>Select Quote Currency</option>
                      {currency &&
                        currency.length > 0 &&
                        currency.map((item, key) => {
                          return (
                            <option key={key} value={item._id}>
                              {item.coin}
                            </option>
                          );
                        })}
                    </CFormSelect>
                    <span className="text-danger">
                      {validErr && validErr.secondCurrencyId}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Quote Currency Decimal
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="Quote Currency Decimal"
                      value={secondFloatDigit}
                      name="secondFloatDigit"
                      onChange={handleChange}
                      disabled={!isEmpty(id)}
                    />
                    <span className="text-danger">
                      {validErr && validErr.secondFloatDigit}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Maker Fee(%)
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={maker_rebate}
                      name="maker_rebate"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.maker_rebate}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Taker Fee(%)
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={taker_fees}
                      name="taker_fees"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.taker_fees}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Minimum Price(%)
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={minPricePercentage}
                      name="minPricePercentage"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.minPricePercentage}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Maximum Price(%)
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={maxPricePercentage}
                      name="maxPricePercentage"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.maxPricePercentage}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Minimum Quantity
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={minQuantity}
                      name="minQuantity"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.minQuantity}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Maximum Quantity
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={maxQuantity}
                      name="maxQuantity"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.maxQuantity}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Minimum OrderValue
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={minOrderValue}
                      name="minOrderValue"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.minOrderValue}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Maximum OrderValue
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={maxOrderValue}
                      name="maxOrderValue"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.maxOrderValue}
                    </span>
                  </div>
                </CCol>
                <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      MarkPrice
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={markPrice}
                      name="markPrice"
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {validErr && validErr.markPrice}
                    </span>
                  </div>
                </CCol>

                {/* <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Market Price Percentage(%)</CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={marketPercent}
                      name="marketPercent"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.marketPercent}</span>
                  </div>
                </CCol> */}

                {botstatus != "off" && (
                  <CCol xs={12} sm={12} md={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">
                        Markup(%)
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        size="sm"
                        aria-label="sm input example"
                        value={markupPercentage}
                        name="markupPercentage"
                        onChange={handleChange}
                      />
                      <span className="text-danger">
                        {validErr && validErr.markupPercentage}
                      </span>
                    </div>
                  </CCol>
                )}

                {/* <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Maximum sell quantity (per day)</CFormLabel>
                    <CFormInput
                      type="text"
                      size="sm"
                      aria-label="sm input example"
                      value={sellDailyLimit}
                      name="sellDailyLimit"
                      onChange={handleChange}
                    />
                    <span className="text-danger">{validErr && validErr.sellDailyLimit}</span>
                  </div>
                </CCol> */}

                {/* <CCol xs={12} sm={12} md={6}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Liqudity Integration</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name={'botstatus'}
                      value={botstatus}
                      onChange={handleChange}
                    >
                      <option value="off">Off</option>
                      {bot &&
                        bot.length > 0 &&
                        bot.map((item, key) => {
                          return (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          )
                        })}
                    </CFormSelect>
                    <span className="text-danger">{validErr && validErr.botstatus}</span>
                  </div>
                </CCol> */}
                {id && id.length > 0 && (
                  <CCol xs={12} sm={12} md={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Status
                      </CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        name={"status"}
                        value={status}
                        onChange={handleChange}
                      >
                        <option>Status</option>
                        {statusOptions &&
                          statusOptions.length > 0 &&
                          statusOptions.map((item, key) => {
                            return (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                      </CFormSelect>
                    </div>
                  </CCol>
                )}
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loader ? (
              <CButton className="submit-btn" disabled>
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
                {id && id.length > 0 ? (
                  <CButton className="submit-btn" onClick={handleEdit}>
                    Submit
                  </CButton>
                ) : (
                  <CButton className="submit-btn" onClick={handleSubmit}>
                    Submit
                  </CButton>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => history("/spot-pair")}
                >
                  {" "}
                  Go Back
                </button>
              </>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};
AddPair.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default AddPair;
