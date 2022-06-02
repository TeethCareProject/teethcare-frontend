import React from "react";
import { useParams } from "react-router-dom";
import ServiceDetailContainer from "../../containers/ServiceDetailContainer/ServiceDetail.container";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  return <ServiceDetailContainer serviceId={serviceId} />;
};

export default ServiceDetailPage;
