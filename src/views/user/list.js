import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DropDown from "../../components/Table/dropdown";
import { orderXLS, orderCSV, orderPDF } from "./downloader";

import {
  CCard,
  CCardBody,
  CFormLabel,
  CBadge,
  CTooltip,
  CInputGroupText,
  CHeader,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilBan,
  cilLockLocked,
  cilLockUnlocked,
  cilSend,
  cilMoney,
  cilClock,
  cilBook,
  cilXCircle,
  cilCheckCircle,
} from "@coreui/icons";
import PropTypes from "prop-types";

//import compoent
import ServerSideTable from "../../components/Table/ServerSide";

//import api
import {
  getAllUserApi,
  resendMailApi,
  disable2FaApi,
  userLockStatus,
  userActivate,
  ignoreTradeFee,
} from "../../api/user";

//import lib
import { isEmpty } from "../../lib/validate";
import { momentFormat } from "../../lib/date";
import { capitalize } from "../../lib/string";
import { encryptString } from "../../lib/cryptoJS";

import {
  DateColumnFilter,
  SelectColumnFilter,
  StatusColumnFilter,
  UserSatusFillter,
} from "../../components/Table/ServerSide/columnFillter";

//import action
import { toast } from "../../redux/toast/toast.action";

//import searchDateFillter
import SerachDateFillter from "../../views/searchDateFillter/searchDateFillter";
import { Button } from "@coreui/coreui";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        Header: "Create Date",
        accessor: "createdAt",
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.createdAt)}</CFormLabel>
            </Fragment>
          );
        },
      },
      {
        Header: "User Id",
        accessor: "userId",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Email Status",
        accessor: "emailStatus",
        Filter: UserSatusFillter,
        Cell: ({ state, row: { original } }) => {
          if (original.emailStatus == "unverified") {
            return (
              <CBadge color="danger" shape="rounded-pill">
                {capitalize(original.emailStatus)}
              </CBadge>
            );
          } else {
            return (
              <CBadge color="success" shape="rounded-pill">
                {capitalize(original.emailStatus)}
              </CBadge>
            );
          }
        },
      },
      {
        Header: "Phone Status",
        accessor: "phoneStatus",
        Filter: UserSatusFillter,

        Cell: ({ state, row: { original } }) => {
          if (original.phoneStatus == "unverified") {
            return (
              <CBadge color="danger" shape="rounded-pill">
                {capitalize(original.phoneStatus)}
              </CBadge>
            );
          } else {
            return (
              <CBadge color="success" shape="rounded-pill">
                {capitalize(original.phoneStatus)}
              </CBadge>
            );
          }
        },
      },
      {
        Header: "Phone Number",
        accessor: "phoneNo",
      },

      {
        Header: "Google2Fa",
        accessor: "google2Fa.secret",
        Filter: SelectColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let reqData = {
            id: original._id,
          };
          if (original.google2Fa && !isEmpty(original.google2Fa.secret)) {
            return (
              <Fragment>
                <CBadge color="success" shape="rounded-pill">
                  {"Enabled"}
                </CBadge>{" "}
                <CTooltip
                  content="click here to disable if user enable 2FA"
                  placement="top"
                >
                  <a href="#">
                    <CIcon
                      icon={cilBan}
                      onClick={() => disable2FA(reqData, state)}
                    ></CIcon>
                  </a>
                </CTooltip>
              </Fragment>
            );
          } else {
            return (
              <CBadge color="info" shape="rounded-pill">
                {"Disabled"}
              </CBadge>
            );
          }
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: UserSatusFillter,
        Cell: ({ state, row: { original } }) => {
          // let status = original && original.status == 'unverified' ? 'Unverified' : 'Verified'
          let status;
          let reqData = {
            _id: original._id,
            email: original.email ? original.email : "",
            phoneNo: original.phoneNo ? original.phoneNo : "",
            phoneCode: original.phoneCode ? original.phoneCode : "",
          };

          original && original.status == "unverified"
            ? (status = (
              <Fragment>
                {!isEmpty(original.email) ? (
                  <>

                    <CBadge color="danger" shape="rounded-pill">
                      {capitalize(original && original.status)}{" "}
                    </CBadge>{' '}
                    <CTooltip
                      content="Click here to send email to unverified user"
                      placement="top"
                    >
                      <a href="#">
                        <CIcon
                          icon={cilSend}
                          onClick={() => activateMailSend(reqData, state)}
                        ></CIcon>
                      </a>
                    </CTooltip>
                  </>
                ) : (
                  <CTooltip
                    content="Click here to Activate unverified user"
                    placement="top"
                  >
                    <a href="#">
                      <CIcon
                        icon={cilLockLocked}
                        onClick={() => activateUser(reqData, state)}
                      ></CIcon>
                    </a>
                  </CTooltip>
                )}
              </Fragment>
            ))
            : (status = (
              <CBadge color="success" shape="rounded-pill">
                {capitalize(original && original.status)}{" "}
              </CBadge>
            ));
          return status;
        },
      },

      {
        Header: "User Asset ",
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true);
          return (
            <CTooltip
              content="Click here to view user's Asset details"
              placement="top"
            >
              <a href="#">
                <CIcon
                  icon={cilMoney}
                  onClick={() => navigate("/userAsset/" + encryptData)}
                ></CIcon>
              </a>
            </CTooltip>
          );
        },
      },
      {
        Header: "Pass Book ",
        Cell: ({ state, row: { original } }) => {
          let encryptData = encryptString(original._id, true);
          return (
            <CTooltip
              content="Click here to view user's Passbook details"
              placement="top"
            >
              <a href="#">
                <CIcon
                  icon={cilBook}
                  onClick={() => navigate("/passbook-list/" + encryptData)}
                ></CIcon>
              </a>
            </CTooltip>
          );
        },
      },
      {
        Header: "Action",
        accessor: "userLocked",
        Filter: false,
        Cell: ({ state, row: { original } }) => {
          let reqData = {
            id: original._id,
          };

          if (original.userLocked == "false") {
            let encryptData = encryptString(original._id, true);
            return (
              <div className="d-flex">
                <a href={true}>
                  <CInputGroupText>
                    <CTooltip content="Locked User's Account" placement="top">
                      <CIcon
                        icon={cilLockUnlocked}
                        onClick={() => handleLocked(reqData, state)}
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a>
                {/* &nbsp;
                <a href={true}>
                  <CInputGroupText>
                    <CTooltip content={"Fee Management"} placement="top">
                      <CIcon
                        icon={cilCheckCircle}
                        onClick={() =>
                          navigate("/fee-management/" + encryptData)
                        }
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a> */}
                &nbsp;
                <a href={true}>
                  <CInputGroupText>
                    <CTooltip content={"Login History"} placement="top">
                      <CIcon
                        icon={cilBook}
                        onClick={() =>
                          navigate("/login-history/" + encryptData)
                        }
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a>
                {/* <a href="#" className="ms-2">
                  <CInputGroupText>
                    <CTooltip content={original.isTradeFee == 'not_ignore' ? "Active Ignore Fee" : "Deactive Ignore Fee"} placement="top">
                      <CIcon
                        icon={original.isTradeFee == 'not_ignore' ? cilXCircle : cilCheckCircle}
                        onClick={() => handleTredeFee(reqData, state)}
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a> */}
                {/* <a href="#" className="ms-2">
                  <CInputGroupText>
                    <CTooltip content="View user's order history" placement="top">
                      <CIcon
                        icon={cilClock}
                        onClick={() => navigate(`/userHistory/${encryptString(reqData.id, true)}`)}
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a> */}
              </div>
            );
          } else {
            return (
              <div className="d-flex">
                <a href="#">
                  <CInputGroupText>
                    <CTooltip content="UnLocked User's Account" placement="top">
                      <CIcon
                        icon={cilLockLocked}
                        onClick={() => handleLocked(reqData, state)}
                      ></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a>

                {/* <a href="#" className="ms-2">
                  <CInputGroupText
                    onClick={() => navigate(`/userHistory/${encryptString(reqData.id, true)}`)}
                  >
                    <CTooltip content="View user's order history" placement="top">
                      <CIcon icon={cilClock}></CIcon>
                    </CTooltip>
                  </CInputGroupText>
                </a> */}
              </div>
            );
          }
        },
      },
    ],
    []
  );
  //state

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);
  const [test, setTest] = useState(false);
  const [downloadDisable, setdownloadDisable] = useState(false);
  const [dateObj, setdateObj] = useState({ startDate: "", endDate: "" });
  const [filterState, setFilterState] = useState({});
  const [type, setType] = useState("pdf");

  //fuunction

  const fetchListData = async ({
    pageIndex,
    pageSize,
    filters,
    sortBy,
    type,
  }) => {
    try {
      console.log("fetchListData", pageIndex, pageSize);
      setFilterState({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        filters: filters,
        type: type,
      });
      setLoading(true);
      //  array of Object into object
      const fillterObj = {};
      const sortObj = {};

      sortBy &&
        sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) =>
          Object.assign(sortObj, { [id]: desc == false ? 1 : -1 })
        );

      filters &&
        filters.length > 0 &&
        filters.forEach(({ id, value }) =>
          Object.assign(fillterObj, {
            [id == "createdAt"
              ? "fd_" + id
              : id === "sefd_"
                ? id + "createdAt"
                : id === "_id"
                  ? "fid_id"
                    ? id == "userId"
                    : "fs_" + id
                  : "fs_" + id]: value,
          })
        );
      setFilterState((state) => ({
        ...state,
        ["fillterObj"]: fillterObj,
        ["sortObj"]: sortObj,
      }));

      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
        type,
      };
      const { success, result, errors } = await getAllUserApi(reqData);
      setLoading(false);
      if (success) {
        setLoading(false);
        setData(result.data);
        setCount(result.count);
      } else {
        toast(
          {
            message: errors.date,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };
  const activateMailSend = async (reqData, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1;
      let pageSize = parseInt(state.pageSize);

      const { success, message } = await resendMailApi(reqData);
      if (success) {
        setTest(true);
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        fetchListData({ pageIndex, pageSize });
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };
  const handleTredeFee = async (reqData, state) => {
    try {
      // console.log('----state', state)
      let pageIndex = parseInt(state.pageIndex) + 1;
      let pageSize = parseInt(state.pageSize);
      const { success, message } = await ignoreTradeFee(reqData);
      if (success) {
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        fetchListData({ pageIndex, pageSize });
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };
  const activateUser = async (reqData, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1;
      let pageSize = parseInt(state.pageSize);

      const { success, message } = await userActivate(reqData);
      if (success) {
        setTest(true);
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        fetchListData({ pageIndex, pageSize });
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };
  const disable2FA = async (reqData, state) => {
    try {
      let pageIndex = parseInt(state.pageIndex) + 1;
      let pageSize = parseInt(state.pageSize);
      let filter,
        sortObj = {};
      const { status, message, error, errors } = await disable2FaApi(reqData);
      console.log(status, "success123");
      if (status) {
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        fetchListData({ pageIndex, pageSize, filter, sortObj });
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };
  const handleLocked = async (reqData, state) => {
    try {
      console.log("----state", state);
      let pageIndex = parseInt(state.pageIndex) + 1;
      let pageSize = parseInt(state.pageSize);
      const { success, message } = await userLockStatus(reqData);
      if (success) {
        toast(
          {
            message: message,
            type: "success",
          },
          dispatch
        );
        fetchListData({ pageIndex, pageSize });
      } else {
        toast(
          {
            message: message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (err) { }
  };

  const docType = (type) => {
    setType(type);
    handleDoc(type);
  };
  const handleDoc = async (type) => {
    let docType = {
      export: type,
      page: parseInt(filterState.pageIndex),
      limit: parseInt(filterState.pageSize),
      fillter: filterState.fillterObj,
      sortObj: filterState.sortObj,
    };

    if (
      Object.keys(dateObj).length > 0 &&
      dateObj.startDate != "" &&
      dateObj.endDate != ""
    ) {
      docType["fillter"] = {
        ...filterState.fillterObj,
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
          page: parseInt(filterState.pageIndex),
          limit: parseInt(filterState.pageSize),
          fillter: filterState.fillterObj,
          sortObj: filterState.sortObj,
        },
      };
      // docType["Download"]="download_option"
      let { result, data } = await getAllUserApi(docType);
      console.log("...data", data);
      if (type && type === "pdf") {
        orderPDF(result.pdfData);
      } else if (type && type === "csv") {
        orderCSV(data);
      } else if (type && type === "xls") {
        orderXLS(data);
      }
    } else {
      let { result, data } = await getAllUserApi(docType);
      if (type && type === "pdf") {
        orderPDF(result.pdfData);
      } else if (type && type === "csv") {
        orderCSV(data);
      } else if (type && type === "xls") {
        orderXLS(data);
      }
    }
  };
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          fetchData={fetchListData}
          setdateObj={setdateObj}
        />
        {!downloadDisable && (
          <DropDown docType={docType} handleDoc={handleDoc} />
        )}
      </CHeader>
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchListData}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
          // setFilterState={filterState}
          filterState={filterState}
        />
      </CCardBody>
    </CCard>
  );
};

UserList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default UserList;
