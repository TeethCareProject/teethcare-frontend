const RequestUpdateFormToRequestUpdateData = (values) => {
  return {
    bookingId: values.bookingId,
    dentistId: values.dentistId,
    note: values.note,
    services: values.serviceIds.map((service) => service.id),
  };
};

export default RequestUpdateFormToRequestUpdateData;
