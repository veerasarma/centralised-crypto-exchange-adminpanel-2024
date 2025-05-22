import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";

//import redux
import { SET_DATE_FILLTER } from "../../redux/dateFillter/type";
import { CButton } from "@coreui/react";

const SerachDateFillter = (props) => {
  const { filterState, fetchData, setdateObj } = props;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startDateChange = (value) => {
    setStartDate(value);

    setdateObj((state) => ({
      ...state,
      ["startDate"]: value,
    }));
  };
  const endDateChange = (value) => {
    setEndDate(value);
    setdateObj((state) => ({
      ...state,
      ["endDate"]: value,
    }));
  };
  const handleDateFillter = async () => {
    try {
      let searchArray = [];
      searchArray.push({
        id: "sefd_",
        value: {
          startDate,
          endDate,
        },
      });
      let filters = searchArray;
      let pageIndex = filterState.pageIndex;
      let pageSize = filterState.pageSize;
      let sortBy = filterState.sortBy;

      dispatch({
        type: SET_DATE_FILLTER,
        dateFilter: {
          filters: filters,
          isDate: true,
        },
      });
      fetchData({ pageIndex, pageSize, filters, sortBy, type: "searchType" });
    } catch (err) {
      console.log("...errr", err);
    }
  };

  const handleClear = () => {
    setStartDate(null)
    setEndDate(null)
    setdateObj({ startDate: null, endDate: null })

    // Clear the filters and call fetchData
    const filters = []
    const { pageIndex, pageSize, sortBy } = filterState

    dispatch({
      type: SET_DATE_FILLTER,
      dateFilter: {
        filters: filters,
        isDate: true,
      },
    })

    fetchData({ pageIndex, pageSize, filters, sortBy, type: '' })
  }

  return (
    <>
      <div className="input-inline">
        <div className="from-input field-group">
          <label className="mr-2">From</label>{" "}
          <DatePicker
          selected={startDate}
          onChange={(date) => startDateChange(date)}
          dateFormat="yyyy/MM/dd"
          isClearable
          placeholderText="Select Start Date"
        />
        </div>
        <div className="to-input field-group">
          <label className="mr-2">To</label>
          <DatePicker
          selected={endDate}
          onChange={(date) => endDateChange(date)}
          dateFormat="yyyy/MM/dd"
          isClearable
          placeholderText="Select End Date"
        />
        </div>
        <div className="search-button">
          <button className="btn btn-primary" onClick={handleDateFillter}>
            Search
          </button>
          {startDate && endDate &&
          <CButton className="clear-btn" color="secondary" onClick={handleClear}>
            Clear
          </CButton>
        }
        </div>
      </div>
    </>
  );
};

SerachDateFillter.propTypes = {
  filterState: PropTypes.any,
  fetchData: PropTypes.any,
  setdateObj: PropTypes.any,
};

export default SerachDateFillter;
