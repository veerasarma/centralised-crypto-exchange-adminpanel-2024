import axios from "../../config/axios";
import { handleResp } from "../../config/axios";
import config from "../../config";

export const orderHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualOrderHistory`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const orderHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualOrderHistory-doc`,
      params: data,
    });
    if (data.doc === "csv" || data.doc === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};
export const tradeHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualTradeHistory`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const tradeHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualTradeHistory-doc`,
      params: data,
    });
    if (data.doc === "csv" || data.doc === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const getLiquidationList = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `/adminapi/perpetualTradeHistory`,
      params: data,
    });
    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const fundingHistory = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualfundingHistory`,
      params: data,
    });

    return handleResp(respData, "success");
  } catch (err) {
    return handleResp(err, "error");
  }
};

export const fundingHistoryDoc = async (data) => {
  try {
    let respData = await axios({
      baseURL: config.INVERSE_SERVICE.URL,
      method: "get",
      url: `/api/admin/perpetualfundingHistory-doc`,
      params: data,
    });

    if (data.doc === "csv" || data.doc === "xls") {
      return handleResp(respData, "success", true);
    } else {
      return handleResp(respData, "success");
    }
  } catch (err) {
    return handleResp(err, "error");
  }
};
