import React, { useState, useEffect } from "react";

import { notification } from "antd";

import { getServiceById } from "../../services/teeth-apis/ServiceController";

import ServiceDetailComponent from "../../components/customized-components/ServiceDetailComponent/ServiceDetail.component";

const ServiceDetailContainer = ({ serviceId }) => {
  const [service, setService] = useState({});

  const getService = async () => {
    try {
      const { data } = await getServiceById(serviceId);
      setService(data);
      console.log(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while filter, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <div>
      <ServiceDetailComponent service={service} />
    </div>
  );
};

export default ServiceDetailContainer;
