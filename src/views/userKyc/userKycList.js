import React, { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CButton,
  CFormLabel,
  CBadge,
  CFormInput,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import PropTypes from "prop-types";

//import compoent
import ServerSideTable from "../../components/Table/ServerSide";

//import api
import { forceRejectionKYC, getAllUserKycApi } from "../../api/user";

//import lib
import { momentFormat } from "../../lib/date";
import { encryptString } from "../../lib/cryptoJS";

import {
  DateColumnFilter,
  StatusColumnFilter,
} from "../../components/Table/ServerSide/columnFillter";
import { toast } from "src/redux/toast/toast.action";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { isEmpty } from "src/lib/validate";
import { capitalize } from "src/lib/string";
const UserList = () => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Create Date",
        accessor: "updatedAt",
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>
                {original.updatedAt
                  ? momentFormat(original.updatedAt)
                  : momentFormat(original.createdAt)}
              </CFormLabel>
            </Fragment>
          );
        },
      },

      {
        Header: "Email",
        accessor: "email",

        Cell: ({ state, row: { original } }) => {
          if (!isEmpty(original?.email)) {
            return original.email;
          }
          return "-";
        },
      },
      {
        Header: "Phone Code",
        accessor: "phoneCode",
        Cell: ({ state, row: { original } }) => {
          if (!isEmpty(original?.phoneCode)) {
            return original.phoneCode;
          }
          return "-";
        },
      },
      {
        Header: "Phone No",
        accessor: "phoneNo",
        Cell: ({ state, row: { original } }) => {
          if (!isEmpty(original?.phoneNo)) {
            return original.phoneNo;
          }
          return "-";
        },
      },
      // {
      //   Header: 'Level',
      //   accessor: 'level',
      //   Filter: StatusColumnFilter,
      // },
      {
        Header: "Status",
        accessor: "kycStatus",
        Filter: StatusColumnFilter,

        Cell: ({ state, row: { original } }) => {
          let level = original.idProof.status;

          if (original.idProof.status == "approved") {
            return (
              <CBadge color="success" shape="rounded-pill">
                Approved
              </CBadge>
            );
          } else if (original.idProof.status == "rejected") {
            return (
              <CBadge color="danger" shape="rounded-pill">
                Rejected
              </CBadge>
            );
          } else {
            return (
              <CBadge color="info" shape="rounded-pill">
                {capitalize(level)}
              </CBadge>
            );
          }
        },
      },

      // {
      //   Header: 'Action',
      //   accessor: 'ACTION',
      //   Filter: true,
      //   Cell: ({ state, row: { original } }) => {
      //     let encryptData = encryptString(original.userId, true)
      //     return (
      //       <>
      //         <CButton
      //           color="secondary"
      //           size="sm"
      //           onClick={() => navigate('/kycDetails/' + encryptData)}
      //         >
      //           {' '}
      //           <CIcon icon={cilPencil}></CIcon>
      //         </CButton>
      //         <CButton
      //           style={{ marginLeft: '25px', color: 'white' }}
      //           color={original.idProof.status === 'approved' ? 'danger' : 'dark'}
      //           size="sm"
      //           disabled={original.idProof.status === 'approved' ? false : true}
      //           onClick={() => {
      //             setShow(true)
      //             setIdReject(original.userId)
      //           }}
      //         >
      //           Force Reject
      //         </CButton>
      //       </>
      //     )
      //   },
      // },
    ],
    []
  );

  //state

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);
  const [show, setShow] = useState(false);
  const [idReject, setIdReject] = useState("");
  const [reason, setReason] = useState("");
  const [keys, setKeys] = useState(Math.random());
  const dispatch = useDispatch();

  //fuunction

  const handleModalClose = () => setShow(false) && setIdReject("");

  const fetchListData = async ({ pageIndex, pageSize, filters, sortBy }) => {
    try {
      setLoading(true);
      //  array of Object into object
      const fillterObj = {};
      const sortObj = {};

      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) =>
          Object.assign(sortObj, { [id]: desc == false ? 1 : -1 })
        );

      filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, {
          [id == "updatedAt" ? "fd_" + id : "fs_" + id]: value,
        })
      );

      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      };
      console.log("...fitterobj", fillterObj);
      const { success, result } = await getAllUserKycApi(reqData);
      if (success) {
        setLoading(false);

        console.log("...result", result);
        setData(result.data);
        setCount(result.count);
      }
    } catch (err) {}
  };

  const forceReject = async (userId) => {
    try {
      const reqData = {
        userId,
        reason,
      };
      console.log("Reason", reason);
      const { success, result, message } = await forceRejectionKYC(reqData);
      if (success) {
        toast(
          {
            message,
            type: "success",
          },
          dispatch
        );
        setShow(false);
        setKeys(Math.random());
      } else {
        toast(
          {
            message,
            type: "error",
          },
          dispatch
        );
      }
    } catch (error) {}
  };

  return (
    <CCard className="mb-4">
      <CCardBody>
        <ServerSideTable
          key={keys}
          columns={columns}
          data={data}
          fetchData={fetchListData}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
      <Modal
        contentClassName="bg-opaque text-light"
        style={{ background: "transparent" }}
        show={show}
        onHide={handleModalClose}
        centered
      >
        <div className="asset-modal">
          <div className="asset-modal-type">Reason</div>
          <div>
            <CFormInput
              type="text"
              onChange={(e) => setReason(e.target.value)}
              value={reason}
            />
          </div>
          <div className="d-flex justify-content-end">
            <CButton
              className="attach-btn"
              variant="ghost"
              onClick={() => forceReject(idReject)}
            >
              Update
            </CButton>
          </div>
        </div>
      </Modal>
    </CCard>
  );
};

UserList.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default UserList;
