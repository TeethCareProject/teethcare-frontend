const RequestUpdateFormToRequestUpdateData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId,
    note: values.note,
  };
};

export default RequestUpdateFormToRequestUpdateData;
