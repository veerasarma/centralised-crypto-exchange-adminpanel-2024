import React, { useState, useMemo, Fragment } from "react";
import { CCard, CCardBody, CFormLabel, CHeader } from "@coreui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
//import compoent
import ServerSideTable from "../../components/Table/ServerSide";
import { fundingXLS, fundingCSV, fundingPDF } from "./downloader";
import DropDown from "../../components/Table/dropdown";
//import action
import { fundingHistory, fundingHistoryDoc } from "../../api/inverse/history";
import { toast } from "../../redux/toast/toast.action";

//import lib
import { capitalize } from "../../lib/string";
import { momentFormat } from "../../lib/date";
import { DateColumnFilter } from "../../components/Table/ServerSide/columnFillter";
//import searchDateFillter
import SerachDateFillter from "../../views/searchDateFillter/searchDateFillter";
import { convert } from "src/lib/convert";
const History = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
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
        Header: "Reference Id",
        accessor: "_id",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Pair",
        accessor: "pairName",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "User code",
        accessor: "userCode",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Leverage",
        accessor: "leverage",
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return original && capitalize(original.leverage);
        },
      },
      {
        Header: "Price",
        accessor: "price",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Executed",
        accessor: "filledQuantity",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Funding Rate",
        accessor: "fundingRate",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Fee Paid",
        accessor: "feePaid",
        Cell: ({ state, row: { original } }) => {
          return original && convert(original.feePaid);
        },
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Mark Price",
        accessor: "markPrice",
        Cell: ({ state, row: { original } }) => {
          return original && original.markPrice;
        },
      },

      {
        Header: "Direction",
        accessor: "direction",
        // Filter: DefaultColumnFilter,
      },

      {
        Header: "Type",
        accessor: "type",
        // Filter: DefaultColumnFilter,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  //status
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [type, setType] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = React.useState([]);
  const [filterState, setFilterState] = useState({});
  const [downloadDisable, setdownloadDisable] = useState(false);
  const [dateObj, setdateObj] = useState({ startDate: "", endDate: "" });
  //function
  const fetchData = async ({ pageIndex, pageSize, filters, sortBy, type }) => {
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
    sortBy.length > 0 &&
      sortBy.forEach(({ id, desc }) =>
        Object.assign(sortObj, { [id]: desc === false ? 1 : -1 })
      );

    filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === "Fees" ||
          id === "price" ||
          id === "filledQuantity" ||
          id === "orderValue"
          ? "fn_" + id
          : id === "createdAt"
            ? "fd_" + id
            : id === "sefd_"
              ? id + "createdAt"
              : id === "_id"
                ? "fid" + id
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
      type: type,
    };

    let { success, result, errors } = await fundingHistory(reqData);
    setLoading(false);
    if (success) {
      setCount(result.count);
      setData(result.data);
    } else {
      setdownloadDisable(true);
      toast(
        {
          message: errors.date,
          type: "error",
        },
        dispatch
      );
    }
  };
  const docType = async (type) => {
    setType(type);
    let docType = {
      doc: type,
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
        sefd_createdAt: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      };
      let { result, data } = await fundingHistoryDoc(docType);
      if (type && type === "pdf") {
        fundingPDF(result.data);
      } else if (type && type === "csv") {
        fundingCSV(data);
      } else if (type && type === "xls") {
        fundingXLS(data);
      }
    } else {
      let { result, data } = await fundingHistoryDoc(docType);
      if (type && type === "pdf") {
        fundingPDF(result.data);
      } else if (type && type === "csv") {
        fundingCSV(data);
      } else if (type && type === "xls") {
        fundingXLS(data);
      }
    }
  };
  const handleDoc = async () => {
    let docType = {
      doc: type,
    };
    let { result, data } = await fundingHistoryDoc(docType);
    if (type && type === "pdf") {
      fundingPDF(result.data);
    } else if (type && type === "csv") {
      fundingCSV(data);
    } else if (type && type === "xls") {
      fundingXLS(data);
    }
  };
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          filterState={filterState}
          fetchData={fetchData}
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
          fetchData={fetchData}
          pageCount={count}
          filters={filters}
          loading={loading}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};
History.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default History;
