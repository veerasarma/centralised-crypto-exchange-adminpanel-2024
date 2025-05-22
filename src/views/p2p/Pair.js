import React, { useState, useMemo } from "react";
import { CCard, CCardBody, CButton, CCardHeader, CBadge } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilPencil } from "@coreui/icons";
//import compoent
import ServerSideTable from "../../components/Table/ServerSide";
import { StatusColumnFilter } from "../../components/Table/ServerSide/columnFillter";
//import action
import { getPair } from "../../api/p2p/pair";
//import lib
import { capitalize } from "../../lib/string";
import { encryptString } from "src/lib/cryptoJS";
const Pairs = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Base Currency",
        accessor: "firstCoin",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Quote Currency",
        accessor: "secondCoin",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Fee(%)",
        accessor: "feePct",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: StatusColumnFilter,
        Cell: ({ state, row: { original } }) => {
          let color = original.status === "active" ? "success" : "danger";
          return (
            <CBadge color={color} shape="rounded-pill">
              {capitalize(original.status)}
            </CBadge>
          );
        },
      },
      {
        Header: "Action",
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          console.log("ORIGINAL", original)
          let encryptData = encryptString(original._id, true);
          return (
            <CButton
              color="secondary"
              size="sm"
              onClick={() => history("/edit-p2p-pair/" + encryptData)}
            >
              {" "}
              <CIcon icon={cilPencil}></CIcon>
            </CButton>
          );
        },
      },
    ],
    []
  );
  //status
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [filters, setFilters] = React.useState([]);
  const history = useNavigate();
  const fetchPairs = async ({ pageIndex, pageSize, filters, sortBy }) => {
    //  array of Object into object
    setLoading(true);
    const fillterObj = {};
    const sortObj = {};
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) =>
        Object.assign(sortObj, { [id]: desc === false ? 1 : -1 })
      );
    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === "feePct" ? "fn_" + id : "fs_" + id]: value,
      })
    );
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
    };

    let { success, result } = await getPair(reqData);
    if (success) {
      setLoading(false);
      // console.log(result, 'resulty')
      setCount(result.count);
      setData(result.data);
    }
    if (!success) {
      setLoading(false);
      setCount(0);
      setData([]);
    }
  };
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CButton className="add-btn" onClick={() => history("/add-p2p-pair")}>
          <CIcon icon={cilPlus}></CIcon>Add Pairs
        </CButton>
      </CCardHeader>

      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          loading={loading}
          fetchData={fetchPairs}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};
Pairs.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default Pairs;
