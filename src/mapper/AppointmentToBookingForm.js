import { convertDateToMilliseconds } from "../utils/convert.utils";

const AppointmentToBookingForm = (values) => {
  return {
    appointmentId: values.appointmentId,
    description: values.description,
    desiredCheckingTime: convertDateToMilliseconds(values.desiredCheckingTime),
  };
};

export default AppointmentToBookingForm;
