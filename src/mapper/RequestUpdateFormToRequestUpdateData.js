const RequestUpdateFormToRequestUpdateData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId,
    note: values.note,
    serviceIds: values.serviceIds.map((service) => service.id),
  };
};

export default RequestUpdateFormToRequestUpdateData;
