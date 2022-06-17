import { convertDateToMilliseconds } from "../utils/convert.utils";

const UpdateBookingFormValueToUpdateBookingData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId.id,
    examinationTime: convertDateToMilliseconds(values.examinationTime),
    note: values.note,
    serviceIds: values.serviceIds.map((service) => service.id),
  };
};

export default UpdateBookingFormValueToUpdateBookingData;
