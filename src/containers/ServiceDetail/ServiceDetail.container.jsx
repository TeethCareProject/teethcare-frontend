import React, { useState, useEffect } from "react";

import { notification } from "antd";

import { getServiceById } from "../../services/teeth-apis/ServiceController";

import ServiceDetailComponent from "../../components/customized-components/ServiceDetail/ServiceDetail.component";
import { useParams } from "react-router-dom";

const ServiceDetailContainer = ({ bookingHandler }) => {
  const { serviceId } = useParams();

  const [service, setService] = useState({});

  const fetchingService = async () => {
    try {
      const { data } = await getServiceById(serviceId);
      setService(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchingService();
  }, []);

  return (
    <ServiceDetailComponent bookingHandler={bookingHandler} service={service} />
  );
};

export default ServiceDetailContainer;
