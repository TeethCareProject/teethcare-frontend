const UpdateBookingFormValueToUpdateBookingData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId,
    examinationTime: values.examinationTime,
    note: values.note,
    serviceId: values.serviceId,
  };
};

export default UpdateBookingFormValueToUpdateBookingData;
