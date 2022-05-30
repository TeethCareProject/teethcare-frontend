import { CallAPI } from "./axiosBase";

export const getAllReports = () => CallAPI("/reports", "GET");

export const getReportById = (reportId) =>
  CallAPI("/reports/" + reportId, "GET");
