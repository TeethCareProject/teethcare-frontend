import React from "react";
import { generatePath } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import RoutePath from "../../routers/Path";
import MobileMenuBar from "../../containers/MobileMenuBar/MobileMenuBar.container";

import ServiceDetailContainer from "../../containers/ServiceDetail/ServiceDetail.container";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const history = useHistory();

  const bookingService = () => {
    history.push(
      generatePath(RoutePath.BOOKING_PAGE, { serviceId: serviceId })
    );
  };
  return (
    <>
      <MobileMenuBar title="Teethcare" />
      <ServiceDetailContainer bookingHandler={bookingService} />
    </>
  );
};

export default ServiceDetailPage;
