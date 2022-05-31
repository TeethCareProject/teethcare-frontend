import { Button, Typography } from "antd";
import React from "react";
import { generatePath } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import RoutePath from "../../routers/Path";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const history = useHistory();

  return (
    <div className="page">
      <Typography.Title>{`Service ${serviceId}`}</Typography.Title>
      <Button
        type="primary"
        onClick={() => {
          history.push(
            generatePath(RoutePath.BOOKING_PAGE, { serviceId: serviceId })
          );
        }}
      >
        book this service
      </Button>
    </div>
  );
};

export default ServiceDetailPage;
