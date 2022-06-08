import { REPORT_END_POINT } from "../end-points/ReportEndPoints";
import { CallAPI } from "./axiosBase";

export const getAllReports = (options) =>
  CallAPI(`${REPORT_END_POINT}`, "GET", {}, options);

export const getReportById = (reportId) =>
  CallAPI(`${REPORT_END_POINT}/${reportId}`, "GET");
