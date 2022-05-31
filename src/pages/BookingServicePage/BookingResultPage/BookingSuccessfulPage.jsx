import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import RoutePath from "../../../routers/Path";

const BookingSuccessfulPage = () => {
  const history = useHistory();

  return (
    <Result
      status="success"
      title="Successfully Serive Booking!"
      subTitle="Booking number: 2017182818828182881 is booked successfully! Please come to your booking history to check booking status or come back to homepage to book a new service!"
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

export default BookingSuccessfulPage;
