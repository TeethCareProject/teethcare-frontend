import React, { useState, useEffect } from "react";

import { notification } from "antd";

import { getServiceById } from "../../services/teeth-apis/ServiceController";

import ServiceDetailComponent from "../../components/customized-components/ServiceDetailComponent/ServiceDetail.component";
import { useParams } from "react-router-dom";

const ServiceDetailContainer = () => {
  const { serviceId } = useParams();
  console.log(serviceId);

  const [service, setService] = useState({});

  const getService = async () => {
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
    getService();
  }, []);

  return <ServiceDetailComponent service={service} />;
};

export default ServiceDetailContainer;
