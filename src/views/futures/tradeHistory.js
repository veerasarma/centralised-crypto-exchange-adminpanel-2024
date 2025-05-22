import React, { useState, useMemo, Fragment } from "react";
import { CCard, CCardBody, CFormLabel, CHeader, CBadge } from "@coreui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
//import compoent
import ServerSideTable from "../../components/Table/ServerSide";
import { tradeXLS, tradeCSV, tradePDF } from "./downloader";
import DropDown from "../../components/Table/dropdown";
//import action
import { tradeHistory, tradeHistoryDoc } from "../../api/futures/history";
import { toast } from "../../redux/toast/toast.action";

//import lib
import { capitalize } from "../../lib/string";
import { momentFormat } from "../../lib/date";
import { DateColumnFilter } from "../../components/Table/ServerSide/columnFillter";
//import searchDateFillter
import SerachDateFillter from "../../views/searchDateFillter/searchDateFillter";
import { SideFilter } from "src/components/Table/ServerSide/filters";
const History = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "orderDate",
        Filter: DateColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            <Fragment>
              <CFormLabel>{momentFormat(original.orderDate)}</CFormLabel>
            </Fragment>
          );
        },
      },
      {
        Header: "User Id",
        accessor: "userCode",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Contracts",
        accessor: "pair",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Side",
        accessor: "buyorsell",
        Filter: SideFilter,
        Cell: ({ state, row: { original } }) => {
          let color = original.buyorsell === 'buy' ? 'success' : 'danger'
          let type = original.buyorsell === 'buy' ? 'Long' : 'Short'
          return (
            <CBadge color={color} shape="rounded-pill">
              {type}
            </CBadge>
          )
        },
      },
      {
        Header: "Price",
        accessor: "price",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Volume",
        accessor: "volume",
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

    filters && filters.length > 0 && filters.forEach(({ id, value }) =>
      Object.assign(fillterObj, {
        [id === "price" || id === "quantity" || id === "volume"
          ? "fn_" + id
          : id === "orderDate"
            ? "fd_" + id
            : id === "sefd_"
              ? id + "orderDate"
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

    console.log(fillterObj, "-fillterObj")
    let reqData = {
      page: parseInt(pageIndex),
      limit: parseInt(pageSize),
      fillter: fillterObj,
      sortObj: sortObj,
      type: type,
    };

    let { success, result, errors } = await tradeHistory(reqData);
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
        sefd_orderDate: {
          startDate: dateObj.startDate,
          endDate: dateObj.endDate,
        },
      };
      let { result, data } = await tradeHistoryDoc(docType);
      if (type && type === "pdf") {
        tradePDF(result.data);
      } else if (type && type === "csv") {
        tradeCSV(data);
      } else if (type && type === "xls") {
        tradeXLS(data);
      }
    } else {
      let { result, data } = await tradeHistoryDoc(docType);
      if (type && type === "pdf") {
        tradePDF(result.data);
      } else if (type && type === "csv") {
        tradeCSV(data);
      } else if (type && type === "xls") {
        tradeXLS(data);
      }
    }
  };
  const handleDoc = async () => {
    let docType = {
      doc: type,
    };
    let { result, data } = await tradeHistoryDoc(docType);
    if (type && type === "pdf") {
      tradePDF(result.data);
    } else if (type && type === "csv") {
      tradeCSV(data);
    } else if (type && type === "xls") {
      tradeXLS(data);
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
