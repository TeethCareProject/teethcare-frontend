import { REPORT_END_POINT } from "../end-points/ReportEndPoints";
import { CallAPI } from "./axiosBase";

export const getAllReports = () => CallAPI(`${REPORT_END_POINT}`, "GET");

export const getReportById = (reportId) =>
  CallAPI(`${REPORT_END_POINT}/${reportId}`, "GET");
