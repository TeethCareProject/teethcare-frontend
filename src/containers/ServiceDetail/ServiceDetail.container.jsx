import React, { useState, useEffect } from "react";

import { notification } from "antd";

import { getServiceById } from "../../services/teeth-apis/ServiceController";
import ServiceDetailComponent from "../../components/customized-components/ServiceDetail/ServiceDetail.component";
import RoutePath from "../../routers/Path";
import { useParams, useHistory, generatePath } from "react-router-dom";

const ServiceDetailContainer = ({ bookingHandler }) => {
  const { serviceId } = useParams();
  const history = useHistory();
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

  const returnHandler = () => {
    history.push(
      generatePath(RoutePath.CLINIC_DETAIL_PAGE, {
        clinicId: service?.clinic?.id,
      })
    );
  };

  useEffect(() => {
    fetchingService();
  }, []);

  return (
    <ServiceDetailComponent
      bookingHandler={bookingHandler}
      service={service}
      returnHandler={returnHandler}
    />
  );
};

export default ServiceDetailContainer;
