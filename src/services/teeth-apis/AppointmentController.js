import { CallAPI } from "../teeth-apis/axiosBase";

import { APPOINTMENT_END_POINT } from "../end-points/AppointmentEndPoints";

export const getAllAppointments = (options) =>
  CallAPI(`${APPOINTMENT_END_POINT}`, "GET", {}, options);
