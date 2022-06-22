const ServiceEntityToServiceCard = (service) => {
  console.log(service);
  return {
    serviceId: service?.id,
    clinicName: service?.clinic?.name,
    clinicId: service?.clinic?.id,
    serviceName: service?.name,
    servicePrice: service?.price,
    serviceImage: service?.imageUrl,
  };
};

export default ServiceEntityToServiceCard;
