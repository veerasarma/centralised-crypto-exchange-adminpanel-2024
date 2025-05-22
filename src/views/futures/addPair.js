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
} from "@coreui/react";
import PropTypes from "prop-types";
//import action
import { addPair, editPair, findById, getCurrency } from "../../api/futures/pair";

//import lib
import { decryptString } from "src/lib/cryptoJS";
import { toast } from "../../redux/toast/toast.action";
const initialFormValue = {
  baseCoinId: " ",
  baseFloatDigit: "",
  quoteCoinId: " ",
  quoteFloatDigit: "",
  minPricePercentage: "",
  maxPricePercentage: "",
  minQuantity: "",
  maxQuantity: "",
  makerFee: "",
  takerFee: "",
  leverage: "",
  markupPercentage: "",
  maintenanceMargin: "",
  markPrice: "",
  status: "active", //active ,deactive
  botstatus: "binance",
  type: "bot",
};
const bot = [
  { value: "binance", label: "binance" },
  { value: "off", label: "Off" },
];
const tradeType = [{ value: "bot", label: "Bot" }];
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
  const {
    markupPercentage,
    makerFee,
    takerFee,
    leverage,
    minPricePercentage,
    maxPricePercentage,
    maxQuantity,
    minQuantity,
    baseCoinId,
    baseFloatDigit,
    quoteCoinId,
    quoteFloatDigit,
    maintenanceMargin,
    markPrice,
    status,
    botstatus,
    type,
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
      setFormValue(result);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, ...{ [name]: value } });
    if (value) {
      let formDataerr = { ...validErr, ...{ [name]: "" } };
      setValidErr(formDataerr);
    }
    setLoader(false);
  };
  const handleSubmit = async () => {
    try {
      let data = {
        markupPercentage,
        makerFee,
        takerFee,
        leverage,
        minPricePercentage,
        maxPricePercentage,
        maxQuantity,
        minQuantity,
        baseCoinId,
        baseFloatDigit,
        quoteCoinId,
        quoteFloatDigit,
        maintenanceMargin,
        markPrice,
        botstatus,
        type,
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
        history("/Future-pair");
      } else {
        if (errors) {
          setLoader(false);
          setValidErr(errors);
        }
      }
    } catch (err) {
      setLoader(false);
    }

  };
  const handleEdit = async () => {
    let decryptData = decryptString(id, true);
    let data = {
      pairId: decryptData,
      baseCoinId,
      baseFloatDigit,
      quoteCoinId,
      quoteFloatDigit,
      minPricePercentage,
      maxPricePercentage,
      minQuantity,
      maxQuantity,
      makerFee,
      takerFee,
      leverage,
      markupPercentage,
      markPrice,
      maintenanceMargin,
      status,
      botstatus,
      type,
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
      history("/Future-pair");
    } else {
      if (errors) {
        setLoader(false);
        setValidErr(errors);
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
      <CCol xs={12} sm={12} md={6}>
        <CCard>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Base Currency
                </CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name="baseCoinId"
                  value={baseCoinId}
                  onChange={handleChange}
                >
                  <option>Select Base Currency</option>
                  {currency &&
                    currency.length > 0 &&
                    currency.map((item, key) => {
                      if (item.type == 'crypto') {
                        return (
                          <option key={key} value={item._id}>
                            {item.coin}
                          </option>
                        );
                      }
                    })}
                </CFormSelect>
                <span className="text-danger">
                  {validErr && validErr.baseCoinId}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Base Currency Decimal
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  name="baseFloatDigit"
                  value={baseFloatDigit}
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.baseFloatDigit}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Quote Currency
                </CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name={"quoteCoinId"}
                  value={quoteCoinId}
                  onChange={handleChange}
                >
                  <option>Select Quote Currency</option>
                  {currency &&
                    currency.length > 0 &&
                    currency.map((item, key) => {
                      if (item.coin == "USDT") {
                        return (
                          <option key={key} value={item._id}>
                            {item.coin}
                          </option>
                        );
                      }
                    })}
                </CFormSelect>
                <span className="text-danger">
                  {validErr && validErr.quoteCoinId}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Quote Currency Decimal
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="Quote Currency Decimal"
                  value={quoteFloatDigit}
                  name="quoteFloatDigit"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.quoteFloatDigit}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Maker Fee(%)
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={makerFee}
                  name="makerFee"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.makerFee}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Taker Fee(%)
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={takerFee}
                  name="takerFee"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.takerFee}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Leverage
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={leverage}
                  name="leverage"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.leverage}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Minimum Price(%)
                </CFormLabel>
                <CFormInput
                  type="number"
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Maximum Price(%)
                </CFormLabel>
                <CFormInput
                  type="number"
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Minimum Quantity
                </CFormLabel>
                <CFormInput
                  type="number"
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Maximum Quantity
                </CFormLabel>
                <CFormInput
                  type="number"
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  MarkPrice
                </CFormLabel>
                <CFormInput
                  type="number"
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
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">
                  Maintenance Margin
                </CFormLabel>
                <CFormInput
                  type="number"
                  size="sm"
                  aria-label="sm input example"
                  value={maintenanceMargin}
                  name="maintenanceMargin"
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {validErr && validErr.maintenanceMargin}
                </span>
              </div>
              {botstatus != "" && (
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    Markup percentage
                  </CFormLabel>
                  <CFormInput
                    type="number"
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
              )}

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Bot status
                </CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name="botstatus"
                  value={botstatus}
                  onChange={handleChange}
                >
                  {bot &&
                    bot.length > 0 &&
                    bot.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </CFormSelect>
                <span className="text-danger">
                  {validErr && validErr.botstatus}
                </span>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Trade type
                </CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name="type"
                  value={type}
                  onChange={handleChange}
                >
                  {tradeType &&
                    tradeType.length > 0 &&
                    tradeType.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </CFormSelect>
                <span className="text-danger">{validErr && validErr.type}</span>
              </div>
              {id && id.length > 0 && (
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
              )}
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
                <CButton
                  className="back-btn"
                  onClick={() => history("/Future-pair")}
                >
                  {" "}
                  Go Back
                </CButton>
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
