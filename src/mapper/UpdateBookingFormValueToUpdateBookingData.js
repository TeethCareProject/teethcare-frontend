import { convertDateToMilliseconds } from "../utils/convert.utils";

const UpdateBookingFormValueToUpdateBookingData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId,
    examinationTime: convertDateToMilliseconds(values.examinationTime),
    note: values.note,
    serviceIds: null,
  };
};

export default UpdateBookingFormValueToUpdateBookingData;
