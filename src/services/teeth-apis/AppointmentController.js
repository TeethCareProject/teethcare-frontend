import { CallAPI } from "../teeth-apis/axiosBase";
import { APPOINTMENT_END_POINT } from "../end-points/AppointmentEndPoints";

export const getAllAppointments = (options) =>
  CallAPI(`${APPOINTMENT_END_POINT}`, "GET", {}, options);

export const getAppointmentById = (appointmentId) =>
  CallAPI(`${APPOINTMENT_END_POINT}/${appointmentId}`, "GET");

export const createAppointments = (appointmentData) =>
  CallAPI(`${APPOINTMENT_END_POINT}`, "POST", appointmentData);
