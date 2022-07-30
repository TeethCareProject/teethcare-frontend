import { convertMomentToMilliseconds } from "../utils/convert.utils";

const AppointmentFormValueToAppointmentData = (values) => {
  return {
    preBookingId: values.preBookingId,
    appointmentDate:
      convertMomentToMilliseconds(values.appointmentDate) +
      values.desiredHour * 60 * 60 * 1000,
    expirationAppointmentDate:
      convertMomentToMilliseconds(values.appointmentDate) +
      values.desiredHour * 60 * 60 * 1000 +
      7 * 24 * 3600 * 1000,
    note: values.note,
  };
};

export default AppointmentFormValueToAppointmentData;
