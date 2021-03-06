import { REPORT_END_POINT } from "../end-points/ReportEndPoints";
import { CallAPI } from "./axiosBase";

export const getAllReports = (options) =>
  CallAPI(`${REPORT_END_POINT}`, "GET", {}, options);

export const getReportById = (reportId) =>
  CallAPI(`${REPORT_END_POINT}/${reportId}`, "GET");

export const reportFeedback = (feedbackId, detail) =>
  CallAPI(`${REPORT_END_POINT}`, "POST", { feedbackId, detail });

export const evaluateReport = (reportId, status) =>
  CallAPI(`${REPORT_END_POINT}/${reportId}`, "PUT", { status });
