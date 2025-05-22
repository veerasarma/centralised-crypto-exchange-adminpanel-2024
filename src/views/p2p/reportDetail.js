import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CHeaderText,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getsingleReport, updatesingleReport } from "src/api/p2p/history";
import { FormControl, Spinner } from "react-bootstrap";
import { momentFormat } from "src/lib/date";
import { toast } from "src/redux/toast/toast.action";
import { useDispatch } from "react-redux";

const ReportDetail = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [sumbitLoader, setSubmitLoader] = useState(false);
  const { reportId } = useParams();
  const dispatch = useDispatch();
  const location = useNavigate();

  const fetchReportData = async () => {
    setLoading(true);
    const { success, result } = await getsingleReport(reportId);
    if (success) {
      setData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (reportId) {
      fetchReportData();
    }
  }, [reportId]);

  const handleReport = async (type) => {
    try {
      setSubmitLoader(true);
      let { success, message } = await updatesingleReport(reportId, { type });
      if (success) {
        toast({ type: "success", message }, dispatch);
        await fetchReportData();
        return setTimeout(() => {
          location("/p2p-reports", { replace: true });
        }, 3000);
      } else {
        toast({ type: "error", message }, dispatch);
      }
      setSubmitLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data && !loading ? (
        <CCard>
          <CContainer>
            <CRow>
              <CCol sm={12} md={6}>
                <CCardHeader>Reported against</CCardHeader>
                <CCardBody>
                  <FormControl value={data.reportOnCode} disabled />
                </CCardBody>
              </CCol>
              <CCol sm={12} md={6}>
                <CCardHeader>Reported By</CCardHeader>
                <CCardBody>
                  <FormControl value={data.reportedByCode} disabled />
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12} md={6}>
                <CCardHeader>Reported On</CCardHeader>
                <CCardBody>
                  <FormControl value={momentFormat(data.createdAt)} disabled />
                </CCardBody>
              </CCol>
              <CCol sm={12} md={6}>
                <CCardHeader>Order ID</CCardHeader>
                <CCardBody>
                  <FormControl value={data.orderCode} disabled />
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12} md={6}>
                <CCardHeader>Action Taken On</CCardHeader>
                <CCardBody>
                  <FormControl
                    value={
                      data.actionTakenOn
                        ? momentFormat(data.actionTakenOn)
                        : "Not Yet Taken"
                    }
                    disabled
                  />
                </CCardBody>
              </CCol>
              <CCol sm={12} md={6}>
                <CCardHeader>Reporter Email</CCardHeader>
                <CCardBody>
                  <FormControl value={data.email} disabled />
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12}>
                <CCardHeader>Reason</CCardHeader>
                <CCardBody>
                  <FormControl value={data.reason} disabled />
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={12}>
                <CCardHeader>Description</CCardHeader>
                <CCardBody>
                  <textarea
                    className="form-control resize-vertical"
                    value={data.description}
                    rows={5}
                    disabled
                  />
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              {data.status == "open" ? (
                <CCol sm={12} class={"d-flex justify-content-end"}>
                  {sumbitLoader ? (
                    <CButton className="me-3">
                      <Spinner size="sm" />
                    </CButton>
                  ) : (
                    <>
                      <CButton onClick={() => handleReport("completed")}>
                        Mark Resolved
                      </CButton>
                      <CButton
                        onClick={() => handleReport("closed")}
                        className="me-3"
                      >
                        Mark Closed
                      </CButton>
                    </>
                  )}
                </CCol>
              ) : (
                <CCol sm={12} class={"d-flex justify-content-end"}>
                  <CButton className="me-3">
                    {data.status == "completed" ? "Resolved" : "Report Closed"}
                  </CButton>
                </CCol>
              )}
            </CRow>
          </CContainer>
        </CCard>
      ) : (
        <Spinner size="lg" />
      )}
    </div>
  );
};

export default ReportDetail;
