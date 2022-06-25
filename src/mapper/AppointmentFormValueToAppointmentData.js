import { convertDateToMilliseconds } from "../utils/convert.utils";

const AppointmentFormValueToAppointmentData = (values) => {
  return {
    preBookingId: values.preBookingId,
    appointmentDate: convertDateToMilliseconds(values.appointmentDate),
    expirationAppointmentDate:
      convertDateToMilliseconds(values.appointmentDate) + 7 * 24 * 3600 * 1000,
    note: values.note,
  };
};

export default AppointmentFormValueToAppointmentData;
