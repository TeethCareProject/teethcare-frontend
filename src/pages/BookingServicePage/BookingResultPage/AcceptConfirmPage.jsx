import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import RoutePath from "../../../routers/Path";

const AcceptConfirmPage = () => {
  const history = useHistory();

  return (
    <Result
      status="success"
      title="Confirm successfully!"
      extra={[
        <Button
          type="primary"
          key="homepage"
          onClick={() => history.push(RoutePath.HOME_PAGE)}
        >
          Go to Homepage
        </Button>,
        <Button
          key="my-booking"
          onClick={() => history.push(RoutePath.DASHBOARD_PAGE)}
        >
          Go to My booking
        </Button>,
      ]}
    />
  );
};

export default AcceptConfirmPage;
