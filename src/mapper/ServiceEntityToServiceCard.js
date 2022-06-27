const ServiceEntityToServiceCard = (service) => {
  return {
    serviceId: service?.id,
    clinicName: service?.clinic?.name,
    clinicId: service?.clinic?.id,
    serviceName: service?.name,
    servicePrice: service?.price,
    serviceImage: service?.imageUrl,
    clinicShift1: {
      startTime: Math.ceil(service?.clinic?.startTimeShift1 / 1000 / 60 / 60),
      endTime: Math.ceil(service?.clinic?.endTimeShift1 / 1000 / 60 / 60),
    },
    clinicShift2: {
      startTime: Math.ceil(service?.clinic?.startTimeShift2 / 1000 / 60 / 60),
      endTime: Math.ceil(service?.clinic?.endTimeShift2 / 1000 / 60 / 60),
    },
  };
};

export default ServiceEntityToServiceCard;
