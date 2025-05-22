import React, { useMemo, useState, Fragment } from "react";
import { CCard, CCardBody, CFormLabel, CHeader } from "@coreui/react";
import { useParams } from "react-router-dom";
import ServerSideTable from "../../components/Table/ServerSide";
import PropTypes from "prop-types";
import DropDown from "../../components/Table/dropdown";
import { useDispatch } from "react-redux";

//import searchDateFillter
import SerachDateFillter from "../../views/searchDateFillter/searchDateFillter";
import { orderXLS, orderCSV, orderPDF } from "./downloader";

//import lib
import { capitalize } from "src/lib/string";
import { momentFormat } from "../../lib/date";
import { decryptString } from "../../lib/cryptoJS";
import { truncateDecimals } from "../../lib/roundOf";
//import api
import { getpassbookList } from "src/api/passbook";
import { DateColumnFilter } from "../../components/Table/ServerSide/columnFillter";
//import action
import { toast } from "../../redux/toast/toast.action";
import { PassbookTypeFilter } from "src/components/Table/ServerSide/filters";
import { toFixed, toFixedNoRound, longNumbers } from "src/lib/roundOf";

const List = () => {
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
        Header: "User Id",
        accessor: "userCodeId",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Reference Id",
        accessor: "tableId",
        // Filter: DefaultColumnFilter,
      },
      {
        Header: "Currency",
        accessor: "coin",
        // Filter: DefaultColumnFilter,
      },

      //   {
      //     Header: 'Category',
      //     accessor: 'category',
      //     // Filter: DefaultColumnFilter,
      //   },
      {
        Header: "BeforeBalance",
        accessor: "beforeBalance",
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            // original && truncateDecimals(original.beforeBalance, 8)
            original && original.beforeBalance
          ); /* .toFixed(8) */
        },
      },
      {
        Header: "AfterBalance",
        accessor: "afterBalance",
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            // original && truncateDecimals(original.afterBalance, 8)
            original && original.afterBalance
          ); /* .toFixed(8) */
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        // Filter: DefaultColumnFilter,
        Cell: ({ state, row: { original } }) => {
          return (
            // original && truncateDecimals(original.amount, 8)
            original && original.amount
          ); /* .toFixed(8) */
        },
      },

      {
        Header: "Type",
        accessor: "type",
        Filter: PassbookTypeFilter,
        Cell: ({ state, row: { original } }) => {
          return <>{capitalize(original.type)}</>;
        },
      },
    ],

    []
  );
  const dispatch = useDispatch();
  //db.getCollection('passbook').updateMany({"type":"p2p_trade_newAdd"},{$set:{userId:ObjectId("61a46a48655f2419bc904fda")}})
  //state
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);
  const [dateObj, setdateObj] = useState({ startDate: "", endDate: "" });
  const [filterState, setFilterState] = useState({});
  const [downloadDisable, setdownloadDisable] = useState(false);
  const [type, setType] = useState("pdf");
  const params = useParams();
  //function
  const fetchFaqData = async ({
    pageIndex,
    pageSize,
    filters,
    sortBy,
    type,
  }) => {
    try {
      console.log("...fetchFaqData", filters);
      setFilterState({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
        filters: filters,
        type: type,
      });

      //  array of Object into object
      const fillterObj = {};
      const sortObj = {};
      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) =>
          Object.assign(sortObj, { [id]: desc === false ? 1 : -1 })
        );
      filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, {
          // id === 'beforeBalance' || 'amount' || 'afterBalance' || 'userCodeId'
          //   ? 'fn_' + id
          //   :

          [id == "createdAt"
            ? "fd_" + id
            : id === "beforeBalance" || id === "amount" || id === "afterBalance"
              ? "fn_" + id
              : id === "coin"
                ? "fs_" + id
                : id === "sefd_"
                  ? id + "createdAt"
                  : id == "tableIdd"
                    ? id == "userCodeId"
                    : "fs_" + id
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
        type,
        userId: decryptString(params.id, true),
      };
      const { success, result, errors } = await getpassbookList(reqData);
      console.log({ success, result, errors });
      if (success) {
        setData(result.data);
        setCount(result.count);
        setdownloadDisable(false);
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
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const docType = (type) => {
    setType(type);
    handleDoc(type);
  };
  const handleDoc = async (type) => {
    try {
      let docType = {
        export: type,
        page: parseInt(filterState.pageIndex),
        limit: parseInt(filterState.pageSize),
        fillter: filterState.fillterObj,
        sortObj: filterState.sortObj,
        userId: decryptString(params.id, true),
      };
      console.log("...handleDoc", docType);
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
          },
        };
        // docType["Download"]="download_option"
        let { result, data } = await getpassbookList(docType);
        if (type && type === "pdf") {
          orderPDF(result.result.pdfData);
        } else if (type && type === "csv") {
          console.log("...csv", data, result);
          orderCSV(data);
        } else if (type && type === "xls") {
          orderXLS(data);
        }
      } else {
        let { result, data } = await getpassbookList(docType);
        if (type && type === "pdf") {
          orderPDF(result.result.pdfData);
        } else if (type && type === "csv") {
          orderCSV(data);
        } else if (type && type === "xls") {
          orderXLS(data);
        }
      }
    } catch (err) {
      console.log("...err", err);
    }
  };
  return (
    <CCard className="mb-4">
      <CHeader>
        <SerachDateFillter
          fetchData={fetchFaqData}
          setdateObj={setdateObj}
          filterState={filterState}
        />
        {!downloadDisable && (
          <DropDown docType={docType} handleDoc={handleDoc} />
        )}
      </CHeader>
      <CCardBody>
        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchFaqData}
          loading={loading}
          pageCount={count}
          filters={filters}
          // setFilters={setFilters}
          filterState={filterState}
        />
      </CCardBody>
    </CCard>
  );
};

List.propTypes = {
  row: PropTypes.any,
  state: PropTypes.any,
};

export default List;
